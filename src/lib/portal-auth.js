const PORTAL_SESSION_KEY = "loam-portal-session"

export const ADMIN_PORTAL_ROLES = ["superadmin", "admission_officer", "bursary_officer", "lecturer", "hod"]

export function isAdminPortalRole(role) {
  return ADMIN_PORTAL_ROLES.includes(role)
}

function getStudentPortalBasePath() {
  if (typeof window === "undefined") return ""

  const host = window.location.hostname
  return host === "localhost" || host === "127.0.0.1" ? "/portal" : ""
}

function parseStoredSession(storage) {
  const raw = storage.getItem(PORTAL_SESSION_KEY)
  if (!raw) return null

  try {
    const session = JSON.parse(raw)

    if (!session || typeof session !== "object") {
      storage.removeItem(PORTAL_SESSION_KEY)
      return null
    }

    return {
      role: typeof session.role === "string" ? session.role : "",
      email: typeof session.email === "string" ? session.email : "",
      name: typeof session.name === "string" ? session.name : "",
      keepLoggedIn: Boolean(session.keepLoggedIn),
    }
  } catch {
    storage.removeItem(PORTAL_SESSION_KEY)
    return null
  }
}

export function getDefaultRouteForRole(role) {
  const studentPortalBasePath = getStudentPortalBasePath()

  if (isAdminPortalRole(role)) return "/admin-dashboard"
  if (role === "admission") return "/admissions"
  return `${studentPortalBasePath}/student-dashboard`
}

export function getPortalSession() {
  if (typeof window === "undefined") return null

  const sessionStorageSession = parseStoredSession(window.sessionStorage)
  if (sessionStorageSession) return sessionStorageSession

  const localStorageSession = parseStoredSession(window.localStorage)
  if (isAdminPortalRole(localStorageSession?.role)) {
    window.localStorage.removeItem(PORTAL_SESSION_KEY)
    return null
  }

  return localStorageSession
}

export function setPortalSession(session) {
  if (typeof window === "undefined") return

  const sanitizedSession = {
    role: typeof session?.role === "string" ? session.role : "",
    email: typeof session?.email === "string" ? session.email : "",
    name: typeof session?.name === "string" ? session.name : "",
    keepLoggedIn: Boolean(session?.keepLoggedIn),
  }

  if (isAdminPortalRole(sanitizedSession.role)) {
    window.localStorage.removeItem(PORTAL_SESSION_KEY)
    window.sessionStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(sanitizedSession))
    return
  }

  if (sanitizedSession.keepLoggedIn) {
    window.sessionStorage.removeItem(PORTAL_SESSION_KEY)
    window.localStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(sanitizedSession))
    return
  }

  window.localStorage.removeItem(PORTAL_SESSION_KEY)
  window.sessionStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(sanitizedSession))
}

export function clearPortalSession() {
  if (typeof window === "undefined") return
  window.sessionStorage.removeItem(PORTAL_SESSION_KEY)
  window.localStorage.removeItem(PORTAL_SESSION_KEY)
}
