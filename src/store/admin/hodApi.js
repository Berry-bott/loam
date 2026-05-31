import { API_CONFIG } from "../../config/api"
import { useAuthStore } from "./authStore"

const HOD_URL = `${API_CONFIG.baseUrl}/api/v1/hod`

let refreshRequest = null

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

async function refreshAdminSession() {
  const authState = useAuthStore.getState()
  if (!authState.refreshRouteAvailable) {
    const routeError = new Error("Refresh route unavailable.")
    routeError.code = "AUTH_REFRESH_UNAVAILABLE"
    throw routeError
  }

  if (!refreshRequest) {
    refreshRequest = authState.refreshAdminToken().finally(() => {
      refreshRequest = null
    })
  }

  return refreshRequest
}

async function executeHodFetch(path, options = {}) {
  const headers = {
    ...useAuthStore.getState().getAuthHeaders(),
    ...(options.headers || {}),
  }

  if (!options.body) {
    delete headers["Content-Type"]
  }

  return fetch(`${HOD_URL}${path}`, {
    ...options,
    headers,
  })
}

async function hodRequest(path, options = {}, hasRetried = false) {
  const response = await executeHodFetch(path, options)
  const payload = await parseJsonResponse(response)

  if (!response.ok && isUnauthorizedResponse(response, payload)) {
    if (!hasRetried) {
      try {
        await refreshAdminSession()
        return hodRequest(path, options, true)
      } catch (error) {
        if (error.code === "AUTH_REFRESH_UNAVAILABLE") {
          useAuthStore.getState().clearSession()
          throw new Error("Session expired. Please log in again.")
        }

        throw error
      }
    }

    useAuthStore.getState().clearSession()
    throw new Error("Session expired. Please log in again.")
  }

  if (!response.ok) {
    throw new Error(
      getErrorMessage(payload, "Unable to complete the HOD request right now."),
    )
  }

  return payload
}

export async function getHodLecturers() {
  return hodRequest("/lecturers", { method: "GET" })
}

export async function getHodCourses() {
  return hodRequest("/courses", { method: "GET" })
}

export async function createHodCourse(courseData) {
  return hodRequest("/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  })
}
