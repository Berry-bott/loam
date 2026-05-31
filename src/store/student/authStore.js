import { create } from "zustand"
import { persist } from "zustand/middleware"
import { API_CONFIG } from "../../config/api"
import { clearPortalSession } from "../../lib/portal-auth"

const AUTH_BASE_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}`
const STUDENT_LOGIN_URL = `${AUTH_BASE_URL}/login`
const STUDENT_REFRESH_URL = `${AUTH_BASE_URL}/refresh`
const CHANGE_PASSWORD_URL = `${AUTH_BASE_URL}/change-password`
const STUDENT_LOGOUT_URL = `${AUTH_BASE_URL}/logout`

const CLEARED_AUTH_STATE = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  hasHydrated: false,
}

function getJsonHeaders() {
  return {
    "Content-Type": "application/json",
  }
}

async function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) return null

  try {
    return await response.json()
  } catch {
    return null
  }
}

function getErrorMessage(payload, fallbackMessage) {
  return (
    payload?.message ||
    payload?.error ||
    payload?.detail ||
    fallbackMessage
  )?.trim()
}

function resolveUser(payload) {
  return payload?.data?.user || payload?.data || null
}

function resolveAccessToken(payload) {
  return (
    payload?.data?.accessToken ||
    payload?.data?.token ||
    payload?.accessToken ||
    payload?.token ||
    null
  )
}

function isUnauthorizedResponse(response, payload) {
  if (response.status === 401) return true

  const message = getErrorMessage(payload, "").toLowerCase()
  return (
    message.includes("unauthorized") ||
    message.includes("invalid or expired access token") ||
    message.includes("expired access token") ||
    message.includes("invalid access token")
  )
}

function isMissingRouteResponse(response, payload) {
  if (response.status === 404) return true

  const message = getErrorMessage(payload, "").toLowerCase()
  return message.includes("route") && message.includes("not found")
}

function normalizeStudentRole(value) {
  const normalizedValue = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")

  if (["student", "admitted_student"].includes(normalizedValue)) return "student"
  return ""
}

function resolveStudentRole(payload, user) {
  const candidates = [
    user?.role,
    user?.userRole,
    user?.accountType,
    payload?.data?.role,
    payload?.role,
  ]

  return candidates.map(normalizeStudentRole).find(Boolean) || ""
}

export const useStudentAuthStore = create(
  persist(
    (set, get) => ({
      ...CLEARED_AUTH_STATE,
      refreshRouteAvailable: true,
      markHydrated: () => set({ hasHydrated: true }),

      getAuthHeaders: () => {
        const { accessToken } = get()
        return accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {}
      },

      loginStudent: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(STUDENT_LOGIN_URL, {
            method: "POST",
            headers: getJsonHeaders(),
            credentials: "include",
            body: JSON.stringify(credentials),
          })

          const payload = await parseJsonResponse(response)
          if (!response.ok) {
            throw new Error(
              getErrorMessage(
                payload,
                "Student login failed. Please check your email and password.",
              ),
            )
          }

          const user = resolveUser(payload)
          const accessToken = resolveAccessToken(payload)
          const role = resolveStudentRole(payload, user)

          if (role !== "student") {
            throw new Error("Your account is not permitted to use the student portal.")
          }

          set({
            accessToken,
            user,
            isAuthenticated: Boolean(accessToken || user),
            isLoading: false,
            error: null,
            hasHydrated: true,
            refreshRouteAvailable: true,
          })

          return payload
        } catch (error) {
          set({
            ...CLEARED_AUTH_STATE,
            error: error.message,
            refreshRouteAvailable: get().refreshRouteAvailable,
          })
          throw error
        }
      },

      refreshStudentToken: async (options = {}) => {
        const force = Boolean(options?.force)

        if (!force && !get().refreshRouteAvailable) {
          const routeError = new Error("Refresh route unavailable.")
          routeError.code = "AUTH_REFRESH_UNAVAILABLE"
          throw routeError
        }

        set({ isLoading: true, error: null })

        try {
          const response = await fetch(STUDENT_REFRESH_URL, {
            method: "POST",
            headers: getJsonHeaders(),
            credentials: "include",
          })

          const payload = await parseJsonResponse(response)

          if (isMissingRouteResponse(response, payload)) {
            set((current) => ({
              ...current,
              isLoading: false,
              error: null,
              refreshRouteAvailable: false,
            }))

            const routeError = new Error("Refresh route unavailable.")
            routeError.code = "AUTH_REFRESH_UNAVAILABLE"
            throw routeError
          }

          if (!response.ok) {
            throw new Error(
              getErrorMessage(payload, "Unable to refresh student session."),
            )
          }

          const user = resolveUser(payload)
          const accessToken = resolveAccessToken(payload)
          const role = resolveStudentRole(payload, user)

          if (role !== "student") {
            throw new Error("Your account is not permitted to use the student portal.")
          }

          set((current) => ({
            ...current,
            accessToken: accessToken || current.accessToken,
            user: user || current.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
            hasHydrated: true,
            refreshRouteAvailable: true,
          }))

          return payload
        } catch (error) {
          if (error.code === "AUTH_REFRESH_UNAVAILABLE") {
            throw error
          }

          get().clearSession()
          throw error
        }
      },

      changePassword: async ({ oldPassword, newPassword }, hasRetried = false) => {
        if (!oldPassword?.trim()) throw new Error("Current password is required.")
        if (!newPassword?.trim()) throw new Error("New password is required.")

        set({ isLoading: true, error: null })

        try {
          const response = await fetch(CHANGE_PASSWORD_URL, {
            method: "POST",
            headers: {
              ...get().getAuthHeaders(),
              ...getJsonHeaders(),
            },
            credentials: "include",
            body: JSON.stringify({
              oldPassword: oldPassword.trim(),
              newPassword: newPassword.trim(),
            }),
          })

          const payload = await parseJsonResponse(response)

          if (!response.ok && isUnauthorizedResponse(response, payload)) {
            if (!hasRetried) {
              try {
                await get().refreshStudentToken()
                return get().changePassword({ oldPassword, newPassword }, true)
              } catch (error) {
                if (error.code === "AUTH_REFRESH_UNAVAILABLE") {
                  get().clearSession()
                  throw new Error("Session expired. Please log in again.")
                }

                throw error
              }
            }

            get().clearSession()
            throw new Error("Session expired. Please log in again.")
          }

          if (!response.ok) {
            throw new Error(
              getErrorMessage(payload, "Unable to change password right now."),
            )
          }

          set((current) => ({
            ...current,
            isLoading: false,
            error: null,
          }))

          return payload
        } catch (error) {
          set((current) => ({
            ...current,
            isLoading: false,
            error: error.message,
          }))
          throw error
        }
      },

      logoutStudent: async () => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(STUDENT_LOGOUT_URL, {
            method: "POST",
            headers: {
              ...get().getAuthHeaders(),
              ...getJsonHeaders(),
            },
            credentials: "include",
          })

          const payload = await parseJsonResponse(response)
          if (!response.ok) {
            throw new Error(
              getErrorMessage(payload, "Unable to log out student session."),
            )
          }

          get().clearSession()
          return payload
        } catch (error) {
          get().clearSession()
          throw error
        }
      },

      clearError: () => set({ error: null }),
      clearSession: () => {
        clearPortalSession()
        set({
          ...CLEARED_AUTH_STATE,
          refreshRouteAvailable: get().refreshRouteAvailable,
        })
      },
    }),
    {
      name: "student-auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        refreshRouteAvailable: state.refreshRouteAvailable,
      }),
      onRehydrateStorage: () => (state) => {
        state?.clearError?.()
        state?.markHydrated?.()
      },
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key)
          return value ? JSON.parse(value) : null
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value))
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key)
        },
      },
    },
  ),
)
