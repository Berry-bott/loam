import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { loginIdentityOptions } from "../../lib/portal-data"
import { getDefaultRouteForRole, setPortalSession } from "../../lib/portal-auth"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"

const identityContent = {
  student: {
    heading: "Institutional Access",
    copy: "Login with students credentials",
    placeholder: "e.g. academic.registry@loampoly.edu",
  },
  admin: {
    heading: "Staff Access",
    copy: "Login with staff credentials",
    placeholder: "e.g. registry.office@loampoly.edu",
  },
  // admission: {
  //   heading: "Admission Access",
  //   copy: "Track your application and continue your admission process securely.",
  //   placeholder: "e.g. applicant@loampoly.edu",
  // },
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [identity, setIdentity] = useState("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)

  const activeContent = identityContent[identity]

  const handleSubmit = (event) => {
    event.preventDefault()

    const session = {
      role: identity,
      email,
      keepLoggedIn,
      name:
        identity === "admin"
          ? "Registry Administrator"
          : identity === "admission"
            ? "Prospective Student"
            : "Adewale John",
    }

    setPortalSession(session)

    const fallbackRoute = getDefaultRouteForRole(identity)
    const redirectRoute = location.state?.from && identity !== "admission" ? location.state.from : fallbackRoute
    navigate(redirectRoute)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,_rgba(137,110,86,0.18)_1.2px,_transparent_1.2px)] [background-size:28px_28px] bg-[#f5f2ec] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[400px]">
        <div className="mb-8 text-center">
          <img
            src="/school-logo.jpeg"
            alt="Loam Poly"
            className="mx-auto mb-3 h-14 w-14 rounded-full border border-[#decfb8] object-cover shadow-sm"
          />
          <h1 className="text-[34px] font-bold uppercase tracking-tight text-[#be2a22]">LOAM POLYTECHNIC</h1>
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-[#a79a8f]">
            The Prestigious Ledger
          </p>
        </div>

        <PortalCard className="px-6 py-7 sm:px-7" accent="red">
          <div className="space-y-6">
            <div>
              <h2 className="text-[28px] font-bold tracking-tight text-[#402119]">{activeContent.heading}</h2>
              <p className="mt-2 max-w-[300px] text-[15px] leading-7 text-[#958575]">{activeContent.copy}</p>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8e7a68]">
                Select Identity
              </p>
              <div className="grid grid-cols-2 rounded-[4px] bg-[#f2eeea] p-1">
                {loginIdentityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setIdentity(option.value)}
                    className={`rounded-[3px] px-2 py-3 text-[12px] font-semibold transition-colors ${
                      identity === option.value
                        ? "bg-white text-[#7d1711] shadow-sm"
                        : "text-[#7e6d5e]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <PortalInput
                label="Institutional ID / Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={activeContent.placeholder}
                autoComplete="email"
                required
              />

              <PortalInput
                label="Password"
                rightLabel="Forgot Password?"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                autoComplete="current-password"
                required
              />

              <label className="flex items-center gap-3 text-sm text-[#78685a]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-[2px] border border-[#d9ccbc] text-[#8f120d] focus:ring-[#e8d4ac]"
                  checked={keepLoggedIn}
                  onChange={(event) => setKeepLoggedIn(event.target.checked)}
                />
                Keep me logged in on this terminal
              </label>

              <PortalButton className="w-full" size="lg" type="submit">
                Access Portal
                <ArrowRight className="h-4 w-4" />
              </PortalButton>
            </form>

            <div className="border-t border-[#f0e7dc] pt-6 text-center">
              <p className="mb-4 text-sm text-[#978677]">Prospective member of the community?</p>
              <PortalButton
                variant="outline"
                className="w-full border-[#d8c7ac] text-[#b08b2d]"
                onClick={() => navigate("/admissions")}
              >
                New Student? Start Application
              </PortalButton>
            </div>
          </div>
        </PortalCard>

        <div className="mt-5 flex items-center justify-center gap-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#aca093]">
          <span>Secure Login</span>
          <span className="h-1 w-1 rounded-full bg-[#cabcae]" />
          <span>AES-256 Bit</span>
        </div>
      </div>
    </div>
  )
}

