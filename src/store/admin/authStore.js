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