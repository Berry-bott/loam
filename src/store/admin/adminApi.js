import { API_CONFIG } from "../../config/api"
import { useAuthStore } from "./admin/authStore" 

// ─── URLs ──────────────────────────────────────────────────────────────────
const ADMIN_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.admin}`

// ─── Helpers ───────────────────────────────────────────────────────────────
function getAuthHeaders() {
  return useAuthStore.getState().getAuthHeaders()
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

async function handleResponse(response) {
  const payload = await parseJsonResponse(response)
  console.log("API Response:", payload)
  if (!response.ok) {
    const errorMessage =
      (payload?.message || payload?.error || payload?.detail)?.trim() ||
      "Something went wrong. Please try again."
    throw new Error(errorMessage)
  }
  return payload
}

// ─── Overview ──────────────────────────────────────────────────────────────
export async function getOverview() {
  const response = await fetch(`${ADMIN_URL}/overview`, {
    method: "GET",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

// ─── Staff ─────────────────────────────────────────────────────────────────
export async function createStaff({ email, role, departmentId }) {
  const response = await fetch(`${ADMIN_URL}/staff`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, role, ...(departmentId ? { departmentId } : {}) }),
  })
  return handleResponse(response)
}

export async function getAllStaff() {
  const response = await fetch(`${ADMIN_URL}/staff`, {
    method: "GET",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

export async function getStaffById(id) {
  const response = await fetch(`${ADMIN_URL}/staff/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

export async function toggleStaffStatus(id) {
  const response = await fetch(`${ADMIN_URL}/staff/${id}/toggle-status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

export async function resetStaffPassword(id) {
  const response = await fetch(`${ADMIN_URL}/staff/${id}/reset-password`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

// ─── HOD ───────────────────────────────────────────────────────────────────
export async function assignHod({ departmentId, newHodUserId }) {
  const response = await fetch(`${ADMIN_URL}/assign-hod`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ departmentId, newHodUserId }),
  })
  return handleResponse(response)
}

// ─── Departments ───────────────────────────────────────────────────────────
export async function createDepartment({ name }) {
  const response = await fetch(`${ADMIN_URL}/departments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  })
  return handleResponse(response)
}

export async function getAllDepartments() {
  const response = await fetch(`${ADMIN_URL}/departments`, {
    method: "GET",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

export async function getDepartmentById(id) {
  const response = await fetch(`${ADMIN_URL}/departments/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}