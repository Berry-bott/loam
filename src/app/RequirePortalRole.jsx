import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import {
  clearPortalSession,
  getDefaultRouteForRole,
  getPortalSession,
  setPortalSession,
} from "../lib/portal-auth"
import { useAuthStore } from "../store/admin/authStore"

export function RequirePortalRole({ allowedRoles, children }) {
  const location = useLocation()
  const session = getPortalSession()
  const { accessToken, isAuthenticated, refreshAdminToken, refreshRouteAvailable } = useAuthStore()
  const unauthorizedRoute = allowedRoles.includes("admin") ? "/superadmin" : "/auth/login"
  const needsAdminRefresh = Boolean(
    session?.role === "admin" && allowedRoles.includes("admin")
  )
  const shouldForceAdminRefresh =
    needsAdminRefresh &&
    refreshRouteAvailable &&
    location.key === "default"
  const [status, setStatus] = useState(
    shouldForceAdminRefresh || (needsAdminRefresh && !isAuthenticated && !accessToken && refreshRouteAvailable)
      ? "checking"
      : "ready"
  )

  useEffect(() => {
    let isActive = true

    if (
      !needsAdminRefresh ||
      !refreshRouteAvailable ||
      (!shouldForceAdminRefresh && (isAuthenticated || accessToken))
    ) {
      setStatus("ready")
      return () => {
        isActive = false
      }
    }

    setStatus("checking")

    refreshAdminToken({ force: shouldForceAdminRefresh })
      .then((payload) => {
        if (!isActive) return

        const refreshedUser = payload?.data?.user || payload?.data
        if (refreshedUser?.name) {
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
    isAuthenticated,
    needsAdminRefresh,
    refreshAdminToken,
    refreshRouteAvailable,
    session,
    shouldForceAdminRefresh,
  ])

  if (!session) {
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

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={getDefaultRouteForRole(session.role)} replace />
  }

  return children
}
