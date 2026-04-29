const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim()

const AUTH_ROUTE_GROUPS = {
  admin: "/api/v1/auth/admin",
}

const AUTH_ENDPOINT_PATHS = {
  adminLogin: "/api/v1/auth/login",
}

function joinUrl(baseUrl, path) {
  const normalizedBase = baseUrl.replace(/\/+$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

async function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || ""

  if (!contentType.includes("application/json")) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

function extractAccessToken(payload) {
  return (
    payload?.access_token ||
    payload?.token ||
    payload?.data?.access_token ||
    payload?.data?.token ||
    payload?.data?.accessToken ||
    payload?.accessToken ||
    ""
  )
}

export const authStore = {
  baseUrl: API_BASE_URL,
  routes: AUTH_ROUTE_GROUPS,
  endpoints: {
    adminLogin: AUTH_ENDPOINT_PATHS.adminLogin,
  },
}

export function buildApiUrl(path) {
  if (!authStore.baseUrl) {
    throw new Error("VITE_API_BASE_URL is not configured.")
  }

  return joinUrl(authStore.baseUrl, path)
}

export function getAuthorizationHeader(accessToken) {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
}

export async function loginAdmin(credentials) {
  const response = await fetch(buildApiUrl(authStore.endpoints.adminLogin), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  const payload = await parseJsonResponse(response)

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        payload?.error ||
        payload?.detail ||
        "Admin login failed. Please check the credentials and try again.",
    )
  }

  return {
    payload,
    accessToken: extractAccessToken(payload),
  }
}
