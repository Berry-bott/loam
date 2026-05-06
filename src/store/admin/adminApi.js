import { API_CONFIG } from "../../config/api"
import { useAuthStore } from "./authStore"

const ADMIN_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.admin}`

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

async function executeAdminFetch(path, options = {}) {
  const headers = {
    ...useAuthStore.getState().getAuthHeaders(),
    ...(options.headers || {}),
  }

  if (!options.body) {
    delete headers["Content-Type"]
  }

  return fetch(`${ADMIN_URL}${path}`, {
    ...options,
    headers,
  })
}

async function handleResponse(response, payload = null) {
  const resolvedPayload = payload ?? await parseJsonResponse(response)

  if (!response.ok) {
    throw new Error(
      getErrorMessage(resolvedPayload, "Something went wrong. Please try again.")
    )
  }

  return resolvedPayload
}

async function adminRequest(path, options = {}, hasRetried = false) {
  const response = await executeAdminFetch(path, options)
  const payload = await parseJsonResponse(response)

  if (!response.ok && isUnauthorizedResponse(response, payload)) {
    if (!hasRetried) {
      try {
        await refreshAdminSession()
        return adminRequest(path, options, true)
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

  return handleResponse(response, payload)
}

export async function getOverview() {
  return adminRequest("/overview", { method: "GET" })
}

export async function createStaff({ email, role, departmentId }) {
  return adminRequest("/staff", {
    method: "POST",
    body: JSON.stringify({
      email,
      role,
      ...(departmentId ? { departmentId } : {}),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function getAllStaff() {
  return adminRequest("/staff", { method: "GET" })
}

export async function getStaffById(id) {
  if (!id) throw new Error("Staff ID is required.")
  return adminRequest(`/staff/${id}`, { method: "GET" })
}

export async function toggleStaffStatus(id) {
  if (!id) throw new Error("Staff ID is required.")
  return adminRequest(`/staff/${id}/toggle-status`, {
    method: "PATCH",
  })
}

export async function resetStaffPassword(id) {
  if (!id) throw new Error("Staff ID is required.")
  return adminRequest(`/staff/${id}/reset-password`, {
    method: "PATCH",
  })
}

export async function assignHod({ departmentId, newHodUserId }) {
  if (!departmentId) throw new Error("Department ID is required.")
  if (!newHodUserId) throw new Error("HOD user ID is required.")

  return adminRequest("/assign-hod", {
    method: "POST",
    body: JSON.stringify({ departmentId, newHodUserId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function createFaculty({ name, code }) {
  if (!name?.trim()) throw new Error("Faculty name is required.")
  if (!code?.trim()) throw new Error("Faculty code is required.")

  return adminRequest("/faculties", {
    method: "POST",
    body: JSON.stringify({
      name: name.trim(),
      code: code.trim().toUpperCase(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function getAllFaculties() {
  return adminRequest("/faculties", { method: "GET" })
}

export async function createDepartment({ name, facultyId }) {
  if (!name?.trim()) throw new Error("Department name is required.")
  if (!facultyId) throw new Error("Faculty ID is required before creating a department.")

  return adminRequest("/departments", {
    method: "POST",
    body: JSON.stringify({
      name: name.trim(),
      facultyId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function getAllDepartments() {
  return adminRequest("/departments", { method: "GET" })
}

export async function getDepartmentById(id) {
  if (!id) throw new Error("Department ID is required.")
  return adminRequest(`/departments/${id}`, { method: "GET" })
}

export async function createSession({ name, startDate, endDate }) {
  if (!name?.trim()) throw new Error("Session name is required.")
  if (!startDate) throw new Error("Session start date is required.")
  if (!endDate) throw new Error("Session end date is required.")

  return adminRequest("/sessions", {
    method: "POST",
    body: JSON.stringify({
      name: name.trim(),
      startDate,
      endDate,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function getAllSessions() {
  return adminRequest("/sessions", { method: "GET" })
}

export async function createSemester({ sessionId, type, startDate, endDate }) {
  if (!sessionId) throw new Error("Session is required before creating a semester.")
  if (!type) throw new Error("Semester type is required.")
  if (!startDate) throw new Error("Semester start date is required.")
  if (!endDate) throw new Error("Semester end date is required.")

  return adminRequest("/semesters", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      type,
      startDate,
      endDate,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
