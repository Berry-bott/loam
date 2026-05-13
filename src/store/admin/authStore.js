import { create } from "zustand"
import { persist } from "zustand/middleware"
import { API_CONFIG } from "../../config/api"

const AUTH_BASE_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}`
const ADMIN_LOGIN_URL = `${AUTH_BASE_URL}/login`
const ADMIN_REFRESH_URL = `${AUTH_BASE_URL}/refresh-token`
const ADMIN_LOGOUT_URL = `${AUTH_BASE_URL}/logout`

const CLEARED_AUTH_STATE = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
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

function isMissingRouteResponse(response, payload) {
  if (response.status === 404) return true

  const message = getErrorMessage(payload, "").toLowerCase()
  return message.includes("route") && message.includes("not found")
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...CLEARED_AUTH_STATE,
      refreshRouteAvailable: true,

      getAuthHeaders: () => {
        const { accessToken } = get()
        return accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {}
      },

      clearSession: () => {
        sessionStorage.removeItem("auth-storage")
        set({
          ...CLEARED_AUTH_STATE,
          refreshRouteAvailable: get().refreshRouteAvailable,
        })
        window.location.replace("/superadminlogin")
      },

      loginAdmin: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_LOGIN_URL, {
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
                "Admin login failed. Please check your credentials and try again.",
              ),
            )
          }

          const accessToken = resolveAccessToken(payload)
          const user = resolveUser(payload)

          set({
            accessToken,
            user,
            isAuthenticated: Boolean(accessToken || user),
            isLoading: false,
            error: null,
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

      refreshAdminToken: async (options = {}) => {
        const force = Boolean(options?.force)

        if (!force && !get().refreshRouteAvailable) {
          const routeError = new Error("Refresh route unavailable.")
          routeError.code = "AUTH_REFRESH_UNAVAILABLE"
          throw routeError
        }

        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_REFRESH_URL, {
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
              getErrorMessage(payload, "Unable to refresh admin session."),
            )
          }

          set((current) => ({
            ...current,
            accessToken: resolveAccessToken(payload) || current.accessToken,
            user: resolveUser(payload) || current.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
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

      logoutAdmin: async () => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_LOGOUT_URL, {
            method: "POST",
            headers: {
              ...getJsonHeaders(),
              ...get().getAuthHeaders(),
            },
            credentials: "include",
          })

          const payload = await parseJsonResponse(response)
          if (!response.ok) {
            throw new Error(
              getErrorMessage(payload, "Unable to log out admin session."),
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
    }),
    {
      name: "auth-storage",
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
