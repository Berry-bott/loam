import { Navigate, useLocation } from "react-router-dom"
import { getDefaultRouteForRole, getPortalSession } from "../lib/portal-auth"

export function RequirePortalRole({ allowedRoles, children }) {
  const location = useLocation()
  const session = getPortalSession()

  if (!session) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={getDefaultRouteForRole(session.role)} replace />
  }

  return children
}

