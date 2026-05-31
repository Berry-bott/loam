// AdminSettingsPage.jsx
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"
import { PortalToast } from "../../components/portal/PortalToast"
import { getPortalSession } from "../../lib/portal-auth"
import { adminSettingsUsers } from "../../lib/portal-data"
import { useAuthStore } from "../../store/admin/authStore"
import {
  PageEyebrow, PageTitle, ResponsiveTable, StatusPill, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminSettingsPage() {
  const session = getPortalSession()
  const isSelfServicePasswordRole = ["admission_officer", "bursary_officer", "lecturer", "hod"].includes(session?.role)
  const { changePassword, isLoading, clearError } = useAuthStore()
  const [accessModalOpen, setAccessModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handlePasswordChange = (field, value) => {
    setPasswordForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const resetPasswordForm = () => {
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setPasswordError("")
  }

  const handleChangePassword = async () => {
    clearError()
    setPasswordError("")

    if (!passwordForm.oldPassword.trim()) {
      setPasswordError("Current password is required.")
      return
    }

    if (!passwordForm.newPassword.trim()) {
      setPasswordError("New password is required.")
      return
    }

    if (passwordForm.newPassword.trim().length < 8) {
      setPasswordError("New password must be at least 8 characters long.")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation do not match.")
      return
    }

    try {
      const payload = await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      })

      resetPasswordForm()
      setToastMessage(payload?.message || "Password changed successfully.")
    } catch (error) {
      setPasswordError(error.message || "Unable to change password right now.")
    }
  }

  const renderPasswordToggle = (isVisible, onToggle) => (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-portal-text-muted transition-colors hover:bg-portal-surface-soft hover:text-portal-brand-strong"
      aria-label={isVisible ? "Hide password" : "Show password"}
    >
      {isVisible ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  )

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="System Configurations"
          description="A supervisory layer of administrative controls, portal readiness, and institutional hierarchy for the current academic cycle."
          actions={
            <>
              <PortalButton
                variant="gold"
                onClick={() => setToastMessage("System log export queued successfully.")}
              >
                Export System Log
              </PortalButton>
              <PortalButton onClick={() => setToastMessage("General settings panel opened successfully.")}>
                General Settings
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_320px]">
          <PortalCard>
            <div className="flex items-center justify-between">
              <p className="text-[22px] font-bold text-portal-text-strong">Security & Authentication Protocols</p>
              <PortalButton size="sm" onClick={() => setAccessModalOpen(true)}>Update Access</PortalButton>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-[6px] border border-portal-border bg-portal-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">
                  Current Password Rotation
                </p>
                <p className="mt-3 text-[24px] font-bold text-shared-title">14 days</p>
              </div>
              <div className="rounded-[6px] border border-portal-border bg-portal-surface p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">
                  Multi-Factor Protocol
                </p>
                <p className="mt-3 text-[24px] font-bold text-shared-title">65%</p>
                <div className="mt-4 h-2 rounded-full bg-stone-200">
                  <div className="h-2 w-[65%] rounded-full bg-analytics-series-primary" />
                </div>
              </div>
            </div>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">
              Academic Cycle Management
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Fall 2024</p>
                <p className="mt-2 text-[22px] font-bold text-shared-title">Q3</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Next Review</p>
                <p className="mt-2 text-[22px] font-bold text-shared-title">January 15, 2026</p>
              </div>
            </div>
          </PortalCard>
        </div>

        {isSelfServicePasswordRole ? (
          <PortalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[22px] font-bold text-portal-text-strong">Change Password</p>
                <p className="mt-2 text-sm text-portal-text-muted">
                  Update your login password for this portal account.
                </p>
              </div>
              <PortalButton
                onClick={handleChangePassword}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Change Password"}
              </PortalButton>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <PortalInput
                label="Current Password"
                type={showOldPassword ? "text" : "password"}
                value={passwordForm.oldPassword}
                onChange={(event) => handlePasswordChange("oldPassword", event.target.value)}
                trailingElement={renderPasswordToggle(showOldPassword, () => setShowOldPassword((value) => !value))}
              />
              <PortalInput
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(event) => handlePasswordChange("newPassword", event.target.value)}
                trailingElement={renderPasswordToggle(showNewPassword, () => setShowNewPassword((value) => !value))}
              />
              <PortalInput
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(event) => handlePasswordChange("confirmPassword", event.target.value)}
                trailingElement={renderPasswordToggle(showConfirmPassword, () => setShowConfirmPassword((value) => !value))}
              />
            </div>

            {passwordError ? (
              <p className="mt-4 rounded-[4px] border border-admin-error-border bg-admin-error-bg px-3 py-2 text-sm text-admin-error-text">
                {passwordError}
              </p>
            ) : null}
          </PortalCard>
        ) : null}

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-portal-text-strong">Administrative User Hierarchy</p>
            <button
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-portal-brand-soft"
              onClick={() => setToastMessage("Role matrix opened successfully.")}
            >
              Role Matrix
            </button>
          </div>
          <div className="mt-4">
            <ResponsiveTable
              headers={["User", "Role", "Location", "Privileges"]}
              rows={adminSettingsUsers}
              renderRow={(row) => (
                <tr key={row[0]} className="bg-portal-surface text-sm text-portal-text">
                  <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row[0]}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row[1]}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row[2]}</td>
                  <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4">
                    <StatusPill>{row[3]}</StatusPill>
                  </td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-portal-text">{row[0]}</p>
                  <p className="text-sm text-portal-text-muted">{row[1]} · {row[2]}</p>
                  <StatusPill>{row[3]}</StatusPill>
                </div>
              )}
            />
          </div>
        </PortalCard>

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
          <PortalCard accent="gold">
            <p className="text-[22px] font-bold text-shared-title">Portal Identity</p>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <p>Brand primary: Maroon</p>
              <p>Logo status: Active</p>
              <p>Ledger mode: Institutional</p>
            </div>
          </PortalCard>
          <PortalCard className="bg-slate-800 text-white before:bg-slate-800">
            <p className="text-[24px] font-bold">Infrastructure Health</p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Monitoring indicates stable performance across core services. Storage and nightly backups are operating within standard safety margins.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">CPU</p>
                <p className="mt-2 text-[24px] font-bold">17%</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Memory</p>
                <p className="mt-2 text-[24px] font-bold">39%</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Storage</p>
                <p className="mt-2 text-[24px] font-bold">84%</p>
              </div>
            </div>
          </PortalCard>
        </div>
      </div>

      <StandardActionModal
        open={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        title="Update Access Protocol"
        description="Adjust administrative permissions and role-linked access policies."
        confirmLabel="Apply Changes"
        onConfirm={() => {
          setAccessModalOpen(false)
          setToastMessage("Access protocol update queued successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
