import { useState } from "react"
import {  UserRound, ShieldCheck } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-text-faded">{label}</p>
      <p className="mt-2 text-[15px] font-semibold text-student-value">{value}</p>
    </div>
  )
}

export default function StudentProfilePage() {
  const [activeModal, setActiveModal] = useState(null)
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
      <div className="flex justify-between">
        <span>

        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">
          Student Account
        </p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-student-title sm:text-[40px]">
          Profile Settings
        </h1>
        <p className="max-w-[760px] text-sm text-portal-text-muted sm:text-[15px]">
          Manage your personal information, and secure your account <br /> through the
          centralized institutional portal.
        </p>
        </span>
        <div className="flex relative">
          <img
            src="/student-avatar.jpeg"
            alt=""
            className="h-[150px] w-[150px] rounded-[8px] object-cover"
          />
          <span className="text-[12px] absolute top-0 right-0 bg-[#b48b26] hover:bg-[#9c721f] m-1  rounded cursor-pointer text-white border-2 border-[#b48b26]">update</span>
          <div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_280px]">
        <PortalCard>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[24px] font-bold text-portal-text-strong">Personal Information</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <InfoRow label="Full Legal Name" value="John Ebenezer Doe" />
            <InfoRow label="Matriculation ID" value="HPT/ENG/23/042" />
            <InfoRow label="University Email Address" value="j.doe@loampolytechnic.edu.ng" />
            <InfoRow label="Primary Phone Contact" value="+234 802 000 0000" />
            <div className="sm:col-span-2">
              <InfoRow
                label="Residential Address"
                value="Plot 42, Academic Boulevard, Institutional District, LOAM POLYTECHNIC Campus"
              />
            </div>
          </div>
        </PortalCard>

        <PortalCard accent="gold" className="bg-[#f3f1ed]">
          <p className="text-[24px] font-bold text-portal-text-strong">Academic Standing</p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[6px] border border-portal-border-strong bg-white px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-text-faded">
                Current Level
              </p>
              <p className="mt-2 text-[32px] font-bold text-portal-gold-chip-text">300 Level</p>
            </div>
            <InfoRow label="Faculty" value="Engineering and Applied Sciences" />
            <InfoRow label="Department" value="Mechanical Engineering" />
            <div className="rounded-[6px] border border-portal-border-strong bg-white px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-text-faded">
                Full-Time Academic
              </p>
              <p className="mt-2 text-[14px] font-semibold text-student-value">Status: Active</p>
            </div>
          </div>
        </PortalCard>
      </div>

      <PortalCard accent="gold">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-portal-gold-chip-bg text-portal-gold-chip-text">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-[24px] font-bold text-portal-text-strong">Security and Authentication</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <InfoRow label="Current Password" value="********" />
            <InfoRow label="Recovery Email" value="johndoe.personal@email.com" />
            <PortalButton variant="outline" onClick={() => setActiveModal("credentials")}>Update Credentials</PortalButton>
          </div>

          <div className="space-y-5 rounded-[6px] border border-[#ece2d4] bg-portal-surface p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-text-faded">
                  Multi-Factor Access
                </p>
                <p className="mt-2 text-[15px] font-semibold text-student-value">SMS Authentication</p>
                <p className="mt-1 text-sm text-portal-text-muted">
                  Receive a one-time passcode next time you sign in.
                </p>
              </div>
              <button
                className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${mfaEnabled ? "bg-[#1f6fd0]" : "bg-[#d1c6bb]"}`}
                onClick={() => {
                  setMfaEnabled((value) => !value)
                  setToastMessage(`SMS authentication ${mfaEnabled ? "disabled" : "enabled"} successfully.`)
                }}
              >
                <div className={`h-5 w-5 rounded-full bg-white transition-transform ${mfaEnabled ? "ml-auto" : "ml-0"}`} />
              </button>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-text-faded">
                Last Login Activity
              </p>
              <p className="mt-2 text-[15px] font-semibold text-student-value">Currently Active</p>
              <p className="mt-1 text-sm text-portal-text-muted">Lagos, Nigeria - this device</p>
            </div>
          </div>
        </div>
      </PortalCard>
      </div>

      {/* <PortalModal
        open={activeModal === "details"}
        onClose={() => setActiveModal(null)}
        title="Update Personal Details"
        description="Submit a request to revise your student record profile."
      >
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="h-11 rounded-[6px] border border-portal-border-soft px-4 text-sm outline-none" placeholder="Full legal name" />
            <input className="h-11 rounded-[6px] border border-portal-border-soft px-4 text-sm outline-none" placeholder="Primary phone" />
          </div>
          <textarea className="min-h-[120px] w-full rounded-[6px] border border-portal-border-soft px-4 py-3 text-sm outline-none" placeholder="Residential address" />
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("Profile update request submitted for registry review.")
            }}
          >
            Submit Update
          </PortalButton>
        </div>
      </PortalModal> */}

      <PortalModal
        open={activeModal === "credentials"}
        onClose={() => setActiveModal(null)}
        title="Update Credentials"
        description="Change your portal password and recovery options."
      >
        <div className="space-y-3">
          <input className="h-11 w-full rounded-[6px] border border-portal-border-soft px-4 text-sm outline-none" type="password" placeholder="Current password" />
          <input className="h-11 w-full rounded-[6px] border border-portal-border-soft px-4 text-sm outline-none" type="password" placeholder="New password" />
          <input className="h-11 w-full rounded-[6px] border border-portal-border-soft px-4 text-sm outline-none" type="email" placeholder="Recovery email" />
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("Credential update request submitted successfully.")
            }}
          >
            Save Changes
          </PortalButton>
        </div>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

