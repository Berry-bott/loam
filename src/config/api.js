const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_CONFIG = {
  baseUrl: BASE_URL,
  endpoints: {
    auth: "/api/v1/auth",
    admin: "/api/v1/admin",
  },
}
