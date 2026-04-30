// const DEFAULT_API_BASE_URL = "https://loam-polytechnic-backend.onrender.com"
// const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).trim()

// const AUTH_ROUTE_GROUPS = {
//   admin: "/api/v1/auth/admin",
// }

// const AUTH_ENDPOINT_PATHS = {
//   adminLogin: "/api/v1/auth/login",
// }

// function joinUrl(baseUrl, path) {
//   const normalizedBase = baseUrl.replace(/\/+$/, "")
//   const normalizedPath = path.startsWith("/") ? path : `/${path}`
//   return `${normalizedBase}${normalizedPath}`
// }

// async function parseJsonResponse(response) {
//   const contentType = response.headers.get("content-type") || ""

//   if (!contentType.includes("application/json")) {
//     return null
//   }

//   try {
//     return await response.json()
//   } catch {
//     return null
//   }
// }

// function extractAccessToken(payload) {
//   return (
//     payload?.access_token ||
//     payload?.token ||
//     payload?.data?.access_token ||
//     payload?.data?.token ||
//     payload?.data?.accessToken ||
//     payload?.accessToken ||
//     ""
//   )
// }

// export const authStore = {
//   baseUrl: API_BASE_URL,
//   routes: AUTH_ROUTE_GROUPS,
//   endpoints: {
//     adminLogin: AUTH_ENDPOINT_PATHS.adminLogin,
//   },
// }

// export function buildApiUrl(path) {
//   if (!authStore.baseUrl) {
//     throw new Error("API base URL is not configured.")
//   }

//   return joinUrl(authStore.baseUrl, path)
// }

// export function getAuthorizationHeader(accessToken) {
//   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
// }

// export async function loginAdmin(credentials) {
//   const response = await fetch(buildApiUrl(authStore.endpoints.adminLogin), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   })

//   const payload = await parseJsonResponse(response)

//   if (!response.ok) {
//     throw new Error(
//       payload?.message ||
//         payload?.error ||
//         payload?.detail ||
//         "Admin login failed. Please check the credentials and try again.",
//     )
//   }

//   return {
//     payload,
//     accessToken: extractAccessToken(payload),
//   }
// }







import { create } from "zustand"
import { persist } from "zustand/middleware"
import { API_CONFIG } from "../../config/api"



// ─── URLs ──────────────────────────────────────────────────────────────────
const ADMIN_LOGIN_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth}/login`



// ─── Helpers ───────────────────────────────────────────────────────────────
async function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) return null
  try {
    return await response.json()
  } catch {
    return null
  }
}

// ─── Store ─────────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ─── State ───────────────────────────────────────────────────────────
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ─── Helpers ─────────────────────────────────────────────────────────
      getAuthHeaders: () => {
        const { accessToken } = get()
        return {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        }
      },

      // ─── Actions ─────────────────────────────────────────────────────────
      loginAdmin: async (credentials) => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch(ADMIN_LOGIN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          })

          const payload = await parseJsonResponse(response)

          if (!response.ok) {
            const errorMessage =
              (payload?.message || payload?.error || payload?.detail)?.trim() ||
              "Admin login failed. Please check your credentials and try again."
            throw new Error(errorMessage)
          }

          const { accessToken, refreshToken, user } = payload.data

          set({
            accessToken,
            refreshToken,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          return payload
        } catch (error) {
          set({ isLoading: false, error: error.message, isAuthenticated: false })
          throw error
        }
      },

      logoutAdmin: () => {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          error: null,
        })
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