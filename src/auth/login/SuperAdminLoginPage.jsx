import { useState } from "react"
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { getDefaultRouteForRole, setPortalSession } from "../../lib/portal-auth"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"
import { useAuthStore } from "../../store/admin/authStore"

function normalizeAdminRole(value) {
  const normalizedValue = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")

  if (["superadmin", "super_admin"].includes(normalizedValue)) return "superadmin"
  if (["admission_officer", "admission"].includes(normalizedValue)) return "admission_officer"
  if (["bursary_officer", "bursary", "bursar"].includes(normalizedValue)) return "bursary_officer"
  if (["lecturer", "lecture"].includes(normalizedValue)) return "lecturer"
  return ""
}

function resolveAdminRole(payload, fallbackRole) {
  const candidates = [
    payload?.data?.user?.role,
    payload?.data?.user?.userRole,
    payload?.data?.user?.accountType,
    payload?.data?.role,
    payload?.data?.userType,
    payload?.role,
    payload?.userRole,
  ]

  const resolvedRole = candidates.map(normalizeAdminRole).find(Boolean)
  return resolvedRole || normalizeAdminRole(fallbackRole)
}

export default function SuperAdminLoginPage({
  fallbackRole = "superadmin",
  allowedRoles = ["superadmin"],
  title = "SUPER ADMIN",
  subtitle = "Restricted Registry Access",
  heading = "Administrative Login",
  description = "Login with your admin credentials to access dashboard.",
  submitLabel = "Access Super Admin",
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAdmin, isLoading, error, clearError } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearError()
    setLocalError("")

    const normalizedEmail = email.trim().toLowerCase()

    try {
      const payload = await loginAdmin({
        email: normalizedEmail,
        password,
      })

      const resolvedRole = resolveAdminRole(payload, "")

      if (!resolvedRole) {
        setLocalError("Unable to verify your administrative role. Please contact support.")
        return
      }

      if (!allowedRoles.includes(resolvedRole)) {
        setLocalError("Your account is not permitted to use this login route.")
        return
      }

      setPortalSession({
        role: resolvedRole,
        email: normalizedEmail,
        keepLoggedIn,
        name:
          payload?.data?.user?.name ||
          payload?.data?.name ||
          "Loam Polytechnic Admin",
      })

      const redirectRoute = location.state?.from || getDefaultRouteForRole(resolvedRole)
      navigate(redirectRoute)
    } catch {
      // Store already owns the visible error state.
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,_rgba(92,24,16,0.16)_1.2px,_transparent_1.2px)] [background-size:28px_28px] bg-secondary px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-portal-border-strong bg-white shadow-sm">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-[34px] font-bold uppercase tracking-tight text-admin-tab-active-text">
            {title}
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-stone-400">
            {subtitle}
          </p>
        </div>

        <PortalCard className="px-6 py-7 sm:px-7" accent="red">
          <div className="space-y-6">
            <div>
              <h2 className="text-[28px] font-bold tracking-tight text-portal-brand-strong">
                {heading}
              </h2>
              <p className="mt-2 max-w-[320px] text-[15px] leading-7 text-portal-text-body">
                {description}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <PortalInput
                label="Institutional Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="e.g. registry.office@loampoly.edu"
                autoComplete="email"
                disabled={isLoading}
                required
              />

              <PortalInput
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                autoComplete="current-password"
                disabled={isLoading}
                trailingElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-portal-text-muted transition-colors hover:bg-portal-surface-soft hover:text-portal-brand-strong"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                required
              />

              {localError ? (
                <p className="rounded-[4px] border border-admin-error-border bg-admin-error-bg px-3 py-2 text-sm text-admin-error-text">
                  {localError}
                </p>
              ) : null}

              {error ? (
                <p className="rounded-[4px] border border-admin-error-border bg-admin-error-bg px-3 py-2 text-sm text-admin-error-text">
                  {error}
                </p>
              ) : null}

              <label className="flex items-center gap-3 text-sm text-topbar-button-text">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-[2px] border border-portal-border-strong text-primary focus:ring-portal-border-strong"
                  checked={keepLoggedIn}
                  disabled={isLoading}
                  onChange={(event) => setKeepLoggedIn(event.target.checked)}
                />
                Keep this admin session active on this terminal
              </label>

              <PortalButton
                className="w-full"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : submitLabel}
                <ArrowRight className="h-4 w-4" />
              </PortalButton>
            </form>
          </div>
        </PortalCard>
      </div>
    </div>
  )
}

