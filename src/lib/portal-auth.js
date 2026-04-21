const PORTAL_SESSION_KEY = "loam-portal-session"

export function getDefaultRouteForRole(role) {
  if (role === "admin") return "/admin-dashboard"
  if (role === "admission") return "/admissions"
  return "/student-dashboard"
}

export function getPortalSession() {
  if (typeof window === "undefined") return null

  const raw = window.localStorage.getItem(PORTAL_SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    window.localStorage.removeItem(PORTAL_SESSION_KEY)
    return null
  }
}

export function setPortalSession(session) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(session))
}

export function clearPortalSession() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(PORTAL_SESSION_KEY)
}

