import { create } from "zustand"
import { persist } from "zustand/middleware"
import { API_CONFIG } from "../../config/api"

const AUTH_BASE_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}`
const ADMIN_LOGIN_URL = `${AUTH_BASE_URL}/login`
const ADMIN_REFRESH_URL = `${AUTH_BASE_URL}/refresh-token`
const ADMIN_LOGOUT_URL = `${AUTH_BASE_URL}/logout`

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
  return payload?.data?.accessToken || payload?.accessToken || null
}

function resolveRefreshToken(payload) {
  return payload?.data?.refreshToken || payload?.refreshToken || null
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      getAuthHeaders: () => {
        const { accessToken } = get()
        return {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        }
      },

      loginAdmin: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_LOGIN_URL, {
            method: "POST",
            headers: get().getAuthHeaders(),
            credentials: "include",
            body: JSON.stringify(credentials),
          })

          const payload = await parseJsonResponse(response)

          if (!response.ok) {
            throw new Error(
              getErrorMessage(
                payload,
                "Admin login failed. Please check your credentials and try again."
              )
            )
          }

          set({
            accessToken: resolveAccessToken(payload),
            refreshToken: resolveRefreshToken(payload),
            user: resolveUser(payload),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          return payload
        } catch (error) {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message,
          })
          throw error
        }
      },

      refreshAdminToken: async () => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_REFRESH_URL, {
            method: "POST",
            headers: get().getAuthHeaders(),
            credentials: "include",
          })

          const payload = await parseJsonResponse(response)

          if (!response.ok) {
            throw new Error(
              getErrorMessage(payload, "Unable to refresh admin session.")
            )
          }

          set((current) => ({
            ...current,
            accessToken: resolveAccessToken(payload) || current.accessToken,
            refreshToken: resolveRefreshToken(payload) || current.refreshToken,
            user: resolveUser(payload) || current.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          }))

          return payload
        } catch (error) {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message,
          })
          throw error
        }
      },

      logoutAdmin: async () => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_LOGOUT_URL, {
            method: "POST",
            headers: get().getAuthHeaders(),
            credentials: "include",
          })

          const payload = await parseJsonResponse(response)

          if (!response.ok) {
            throw new Error(
              getErrorMessage(payload, "Unable to log out admin session.")
            )
          }

          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })

          return payload
        } catch (error) {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message,
          })
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
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
)
