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
  const { isAuthenticated, refreshAdminToken } = useAuthStore()
  const needsAdminRefresh = Boolean(
    session?.role === "admin" && allowedRoles.includes("admin")
  )
  const [status, setStatus] = useState(
    needsAdminRefresh && !isAuthenticated ? "checking" : "ready"
  )

  useEffect(() => {
    let isActive = true

    if (!needsAdminRefresh || isAuthenticated) {
      setStatus("ready")
      return () => {
        isActive = false
      }
    }

    setStatus("checking")

    refreshAdminToken()
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
  }, [isAuthenticated, needsAdminRefresh, refreshAdminToken, session])

  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-sm text-muted-foreground">
        Restoring admin session...
      </div>
    )
  }

  if (status === "failed") {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={getDefaultRouteForRole(session.role)} replace />
  }

  return children
}
