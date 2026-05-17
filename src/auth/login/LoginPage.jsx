import { useState } from "react"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { getDefaultRouteForRole, setPortalSession } from "../../lib/portal-auth"
import { getAdmissionsUrl, getPortalHomeRoute } from "../../lib/portal-routing"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"

const STUDENT_LOGIN_EMAIL = "loampoly@gmail.com"
const STUDENT_LOGIN_PASSWORD = "loam123"

export default function LoginPage() {
  const navigate = useNavigate()
  const admissionsUrl = getAdmissionsUrl()
  const portalHomeRoute = getPortalHomeRoute()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)
  const [localError, setLocalError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLocalError("")
    setIsLoading(true)

    try {
      const normalizedEmail = email.trim().toLowerCase()

      if (
        normalizedEmail !== STUDENT_LOGIN_EMAIL ||
        password !== STUDENT_LOGIN_PASSWORD
      ) {
        setLocalError("Invalid student email or password.")
        return
      }

      setPortalSession({
        role: "student",
        email: normalizedEmail,
        keepLoggedIn,
        name: "Adewale John",
      })

      navigate(getDefaultRouteForRole("student"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,_rgba(137,110,86,0.18)_1.2px,_transparent_1.2px)] [background-size:28px_28px] bg-secondary px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[400px]">
        <div className="mb-8 text-center">
          <img
            src="/school-logo.jpeg"
            alt="Loam Poly"
            className="mx-auto mb-3 h-14 w-14 rounded-full border border-portal-border-strong object-cover shadow-sm"
          />
          <h1 className="text-[34px] font-bold uppercase tracking-tight text-red-700">
            LOAM POLYTECHNIC
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-stone-400">
            The Prestigious Ledger
          </p>
        </div>

        <PortalCard className="px-6 py-7 sm:px-7" accent="red">
          <div className="space-y-6">
            <div>
              <h2 className="text-[28px] font-bold tracking-tight text-portal-brand-strong">
                Student Access
              </h2>
              <p className="mt-2 max-w-[300px] text-[15px] leading-7 text-portal-text-body">
                Login with student credentials
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <PortalInput
                label="Institutional ID / Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="e.g. academic.registry@loampoly.edu"
                autoComplete="email"
                disabled={isLoading}
                required
              />

              <PortalInput
                label="Password"
                rightLabel="Forgot Password?"
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

              <label className="flex items-center gap-3 text-sm text-topbar-button-text">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-[2px] border border-portal-border-strong text-primary focus:ring-portal-border-strong"
                  checked={keepLoggedIn}
                  disabled={isLoading}
                  onChange={(event) => setKeepLoggedIn(event.target.checked)}
                />
                Keep me logged in on this terminal
              </label>

              <PortalButton
                className="w-full"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Access Portal"}
                <ArrowRight className="h-4 w-4" />
              </PortalButton>
            </form>

            <div className="border-t border-portal-border-soft pt-6 text-center">
              <p className="mb-4 text-sm text-portal-text-muted">
                Prospective member of the community?
              </p>
              <div className="space-y-3">
                <PortalButton
                  variant="outline"
                  className="w-full border-portal-border-strong text-amber-700"
                  onClick={() => {
                    window.location.href = admissionsUrl
                  }}
                >
                  New Student? Start Application
                </PortalButton>
                <Link
                  to={portalHomeRoute}
                  className="block text-center text-sm font-medium text-portal-brand-strong transition-colors hover:text-primary"
                >
                  Back to Portal
                </Link>
              </div>
            </div>
          </div>
        </PortalCard>

        <div className="mt-5 flex items-center justify-center gap-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-portal-text-soft">
          <span>Student Portal</span>
          <span className="h-1 w-1 rounded-full bg-admin-field-disabled-text" />
          <span>Setup In Progress</span>
        </div>
      </div>
    </div>
  )
}

