import { useEffect, useRef, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import {
  clearPortalSession,
  getDefaultRouteForRole,
  getPortalSession,
  isAdminPortalRole,
  setPortalSession,
} from "../lib/portal-auth"
import { getAdminLoginRoute, getStudentLoginRoute } from "../lib/portal-routing"
import { useAuthStore } from "../store/admin/authStore"
import { useStudentAuthStore } from "../store/student/authStore"

function normalizeAdminRole(value) {
  const normalizedValue = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")

  if (["superadmin", "super_admin"].includes(normalizedValue)) return "superadmin"
  if (["admission_officer", "admissions_officer", "admission", "admissions"].includes(normalizedValue)) {
    return "admission_officer"
  }
  if (["bursary_officer", "bursary", "bursar"].includes(normalizedValue)) return "bursary_officer"
  if (["lecturer", "lecture"].includes(normalizedValue)) return "lecturer"
  if (["hod", "head_of_department", "head_department"].includes(normalizedValue)) return "hod"
  return ""
}

function resolveAuthenticatedAdminRole(user) {
  const candidates = [
    user?.role,
    user?.userRole,
    user?.accountType,
    user?.userType,
  ]

  return candidates.map(normalizeAdminRole).find(Boolean) || ""
}

export function RequirePortalRole({ allowedRoles, children }) {
  const location = useLocation()
  const session = getPortalSession()
  const { accessToken, isAuthenticated, refreshAdminToken, refreshRouteAvailable, user, hasHydrated } = useAuthStore()
  const {
    accessToken: studentAccessToken,
    isAuthenticated: isStudentAuthenticated,
    refreshStudentToken,
    refreshRouteAvailable: studentRefreshRouteAvailable,
    hasHydrated: hasStudentHydrated,
  } = useStudentAuthStore()
  const authenticatedAdminRole = resolveAuthenticatedAdminRole(user)
  const unauthorizedRoute = allowedRoles.some((role) => isAdminPortalRole(role))
    ? getAdminLoginRoute()
    : getStudentLoginRoute()
  const expectsAdminRole = allowedRoles.some((role) => isAdminPortalRole(role))
  const sessionHasAdminRole = isAdminPortalRole(session?.role)
  const sessionHasStudentRole = session?.role === "student"
  const needsAdminRefresh = Boolean(sessionHasAdminRole && expectsAdminRole)
  const needsStudentRefresh = Boolean(sessionHasStudentRole && !expectsAdminRole)
  const refreshAttemptedRef = useRef(false)
  const [status, setStatus] = useState(
    !hasHydrated ||
      !hasStudentHydrated ||
      (needsAdminRefresh && !isAuthenticated && !accessToken && refreshRouteAvailable) ||
      (needsStudentRefresh && !isStudentAuthenticated && !studentAccessToken && studentRefreshRouteAvailable)
      ? "checking"
      : "ready"
  )

  useEffect(() => {
    let isActive = true

    if (!hasHydrated || !hasStudentHydrated) {
      if (status !== "checking") {
        setStatus("checking")
      }
      return () => {
        isActive = false
      }
    }

    if (!needsAdminRefresh) {
      refreshAttemptedRef.current = false
    }

    if (needsAdminRefresh && (isAuthenticated || accessToken)) {
      if (status !== "ready") {
        setStatus("ready")
      }
      return () => {
        isActive = false
      }
    }

    if (needsAdminRefresh && !refreshRouteAvailable) {
      if (status !== "failed") {
        setStatus("failed")
      }
      return () => {
        isActive = false
      }
    }

    if (needsStudentRefresh && (isStudentAuthenticated || studentAccessToken)) {
      if (status !== "ready") {
        setStatus("ready")
      }
      return () => {
        isActive = false
      }
    }

    if (needsStudentRefresh && !studentRefreshRouteAvailable) {
      if (status !== "failed") {
        setStatus("failed")
      }
      return () => {
        isActive = false
      }
    }

    if (!needsAdminRefresh && !needsStudentRefresh) {
      if (status !== "ready") {
        setStatus("ready")
      }
      return () => {
        isActive = false
      }
    }

    if (refreshAttemptedRef.current) {
      return () => {
        isActive = false
      }
    }

    refreshAttemptedRef.current = true
    setStatus("checking")

    const refreshPromise = needsAdminRefresh ? refreshAdminToken() : refreshStudentToken()

    refreshPromise
      .then((payload) => {
        if (!isActive) return

        const refreshedUser = payload?.data?.user || payload?.data
        if (refreshedUser?.name && session) {
          setPortalSession({
            ...session,
            name: refreshedUser.name,
          })
        }

        setStatus("ready")
      })
      .catch(() => {
        if (!isActive) return
        clearPortalSession()
        setStatus("failed")
      })

    return () => {
      isActive = false
    }
  }, [
    accessToken,
    hasHydrated,
    isAuthenticated,
    needsAdminRefresh,
    needsStudentRefresh,
    refreshAdminToken,
    refreshRouteAvailable,
    refreshStudentToken,
    status,
    studentAccessToken,
    studentRefreshRouteAvailable,
    hasStudentHydrated,
    isStudentAuthenticated,
    session,
  ])

  if (!session) {
    return <Navigate to={unauthorizedRoute} replace state={{ from: location.pathname }} />
  }

  if (expectsAdminRole && !sessionHasAdminRole) {
    return <Navigate to={unauthorizedRoute} replace state={{ from: location.pathname }} />
  }

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-sm text-muted-foreground">
        Restoring admin session...
      </div>
    )
  }

  if (status === "failed") {
    return <Navigate to={unauthorizedRoute} replace state={{ from: location.pathname }} />
  }

  if (expectsAdminRole) {
    if (!isAuthenticated || !accessToken || !authenticatedAdminRole) {
      return <Navigate to={unauthorizedRoute} replace state={{ from: location.pathname }} />
    }

    if (!allowedRoles.includes(authenticatedAdminRole)) {
      return <Navigate to={getDefaultRouteForRole(authenticatedAdminRole)} replace />
    }

    return children
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={getDefaultRouteForRole(session.role)} replace />
  }

  if (sessionHasStudentRole && (!isStudentAuthenticated || !studentAccessToken)) {
    return <Navigate to={unauthorizedRoute} replace state={{ from: location.pathname }} />
  }

  return children
}
