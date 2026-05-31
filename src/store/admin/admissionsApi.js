import { API_CONFIG } from "../../config/api"
import { getPortalSession } from "../../lib/portal-auth"
import { useAuthStore } from "./authStore"

const ADMISSIONS_URL = `${API_CONFIG.baseUrl}/api/v1/admissions`
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

async function executeAdmissionsFetch(path, options = {}) {
  const headers = {
    ...useAuthStore.getState().getAuthHeaders(),
    ...(options.headers || {}),
  }

  if (!options.body) {
    delete headers["Content-Type"]
  }

  const portalSession = getPortalSession()
  const baseUrl = portalSession?.role === "hod" ? HOD_URL : ADMISSIONS_URL

  return fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  })
}

async function admissionsRequest(path, options = {}, hasRetried = false) {
  const response = await executeAdmissionsFetch(path, options)
  const payload = await parseJsonResponse(response)

  if (!response.ok && isUnauthorizedResponse(response, payload)) {
    if (!hasRetried) {
      try {
        await refreshAdminSession()
        return admissionsRequest(path, options, true)
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
      getErrorMessage(payload, "Unable to complete the admissions request right now."),
    )
  }

  return payload
}

function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return
    searchParams.set(key, String(value))
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ""
}

export async function getAdmissionsApplications(params = {}) {
  return admissionsRequest(`/applications${buildQueryString(params)}`, {
    method: "GET",
  })
}

export async function getAdmissionsApplicationById(id) {
  if (!id) throw new Error("Application ID is required.")

  return admissionsRequest(`/applications/${id}`, {
    method: "GET",
  })
}

export async function decideAdmissionsApplication(id, decision) {
  if (!id) throw new Error("Application ID is required.")
  if (!decision) throw new Error("Application decision is required.")

  const portalSession = getPortalSession()
  if (portalSession?.role === "hod") {
    throw new Error("HOD application review is view-only from this page.")
  }

  const normalizedDecision = String(decision).trim().toUpperCase()

  return admissionsRequest(`/applications/${id}/decision`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      decision: normalizedDecision,
    }),
  })
}
