// AdminSettingsPage.jsx
import { useState } from "react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminSettingsUsers } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, ResponsiveTable, StatusPill, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminSettingsPage() {
  const [accessModalOpen, setAccessModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

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
              <p className="text-[22px] font-bold text-[#4f1d14]">Security & Authentication Protocols</p>
              <PortalButton size="sm" onClick={() => setAccessModalOpen(true)}>Update Access</PortalButton>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">
                  Current Password Rotation
                </p>
                <p className="mt-3 text-[24px] font-bold text-[#651d13]">14 days</p>
              </div>
              <div className="rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">
                  Multi-Factor Protocol
                </p>
                <p className="mt-3 text-[24px] font-bold text-[#651d13]">65%</p>
                <div className="mt-4 h-2 rounded-full bg-[#eee2d7]">
                  <div className="h-2 w-[65%] rounded-full bg-[#75110d]" />
                </div>
              </div>
            </div>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">
              Academic Cycle Management
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Fall 2024</p>
                <p className="mt-2 text-[22px] font-bold text-[#651d13]">Q3</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Next Review</p>
                <p className="mt-2 text-[22px] font-bold text-[#651d13]">January 15, 2026</p>
              </div>
            </div>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#4f1d14]">Administrative User Hierarchy</p>
            <button
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b1810]"
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
                <tr key={row[0]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
                  <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
                  <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
                  <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
                  <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4">
                    <StatusPill>{row[3]}</StatusPill>
                  </td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
                  <p className="text-sm text-[#8b7969]">{row[1]} · {row[2]}</p>
                  <StatusPill>{row[3]}</StatusPill>
                </div>
              )}
            />
          </div>
        </PortalCard>

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
          <PortalCard accent="gold">
            <p className="text-[22px] font-bold text-[#651d13]">Portal Identity</p>
            <div className="mt-5 space-y-3 text-sm text-[#7d6b5e]">
              <p>Brand primary: Maroon</p>
              <p>Logo status: Active</p>
              <p>Ledger mode: Institutional</p>
            </div>
          </PortalCard>
          <PortalCard className="bg-[#283f53] text-white before:bg-[#283f53]">
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