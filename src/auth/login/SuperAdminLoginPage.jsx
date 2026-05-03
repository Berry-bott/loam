import { useState } from "react"
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { getDefaultRouteForRole, setPortalSession } from "../../lib/portal-auth"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"
import { useAuthStore } from "../../store/admin/authStore"

export default function SuperAdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAdmin, isLoading, error, clearError } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearError()

    const normalizedEmail = email.trim().toLowerCase()

    try {
      const payload = await loginAdmin({
        email: normalizedEmail,
        password,
      })

      setPortalSession({
        role: "admin",
        email: normalizedEmail,
        keepLoggedIn,
        name:
          payload?.data?.user?.name ||
          payload?.data?.name ||
          "Super Administrator",
      })

      const redirectRoute = location.state?.from || getDefaultRouteForRole("admin")
      navigate(redirectRoute)
    } catch {
      // Store already owns the visible error state.
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,_rgba(92,24,16,0.16)_1.2px,_transparent_1.2px)] [background-size:28px_28px] bg-[#f4efe8] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[420px]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#decfb8] bg-white shadow-sm">
            <ShieldCheck className="h-8 w-8 text-[#8f120d]" />
          </div>
          <h1 className="text-[34px] font-bold uppercase tracking-tight text-[#7d1711]">
            SUPER ADMIN
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#a79a8f]">
            Restricted Registry Access
          </p>
        </div>

        <PortalCard className="px-6 py-7 sm:px-7" accent="red">
          <div className="space-y-6">
            <div>
              <h2 className="text-[28px] font-bold tracking-tight text-[#402119]">
                Administrative Login
              </h2>
              <p className="mt-2 max-w-[320px] text-[15px] leading-7 text-[#958575]">
                Login with your admin credentials to access dashboard. 
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8f7a68] transition-colors hover:bg-[#f5eee4] hover:text-[#61100c]"
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

              {error ? (
                <p className="rounded-[4px] border border-[#e6beb8] bg-[#fff2f0] px-3 py-2 text-sm text-[#9f1f18]">
                  {error}
                </p>
              ) : null}

              <label className="flex items-center gap-3 text-sm text-[#78685a]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-[2px] border border-[#d9ccbc] text-[#8f120d] focus:ring-[#e8d4ac]"
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
                {isLoading ? "Signing In..." : "Access Super Admin"}
                <ArrowRight className="h-4 w-4" />
              </PortalButton>
            </form>
          </div>
        </PortalCard>
      </div>
    </div>
  )
}
