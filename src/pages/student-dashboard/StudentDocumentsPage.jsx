import { useState } from "react"
import { CloudUpload, TriangleAlert } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { documentRecords, documentSummary } from "../../lib/portal-data"

const toneMap = {
  red: "text-[#9b1810]",
  gold: "text-[#b48b26]",
  neutral: "text-[#7a6b5c]",
}

export default function StudentDocumentsPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#531b14] sm:text-[36px]">
            Documents Repository
          </h1>
          <p className="text-sm text-[#8b7969]">Official academic credential management</p>
        </div>
        <PortalButton onClick={() => setActiveModal("upload")}>
          <CloudUpload className="h-4 w-4" />
          Upload New File
        </PortalButton>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {documentSummary.map((item) => (
          <PortalCard key={item.label} accent={item.tone === "gold" ? "gold" : "red"} className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a99682]">{item.label}</p>
            <p className={`mt-3 text-[38px] font-bold ${toneMap[item.tone]}`}>{item.value}</p>
          </PortalCard>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_300px]">
        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#4f1d14]">Required Academic Credentials</p>
          </div>

          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b09d88]">
                  <th className="pb-1">Document Name</th>
                  <th className="pb-1">Status</th>
                  <th className="pb-1">Last Updated</th>
                  <th className="pb-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documentRecords.map((record) => (
                  <tr key={record.name} className="bg-[#fffcf9] text-sm text-[#5c2418]">
                    <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4">
                      <p className="font-semibold">{record.name}</p>
                      <p className="text-[9px] uppercase tracking-[0.12em] text-[#af9b84]">{record.note}</p>
                    </td>
                    <td className="border-y border-[#efe4d6] px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                          record.status === "Verified"
                            ? "bg-[#e6f6e7] text-[#2d8a45]"
                            : record.status === "Pending"
                              ? "bg-[#f4f0eb] text-[#866f5d]"
                              : "bg-[#fde8e4] text-[#a31f15]"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="border-y border-[#efe4d6] px-4 py-4">{record.updated}</td>
                    <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]">
                      {record.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 space-y-3 md:hidden">
            {documentRecords.map((record) => (
              <div key={record.name} className="rounded-[8px] border border-[#efe4d6] bg-[#fffcf9] p-4">
                <p className="text-sm font-semibold text-[#5c2418]">{record.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#af9b84]">{record.note}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      record.status === "Verified"
                        ? "bg-[#e6f6e7] text-[#2d8a45]"
                        : record.status === "Pending"
                          ? "bg-[#f4f0eb] text-[#866f5d]"
                          : "bg-[#fde8e4] text-[#a31f15]"
                    }`}
                  >
                    {record.status}
                  </span>
                  <button className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]">
                    {record.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PortalCard>

        <div className="space-y-5">
          <PortalCard className="bg-[#8f120d] text-white before:bg-[#8f120d]">
            <p className="text-[22px] font-bold">Document Verification Guidelines</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>All documents must be scanned in high resolution at 300 DPI minimum.</li>
              <li>File formats accepted: PDF, JPG, PNG only. Maximum file size 5 MB.</li>
              <li>Original physical copies may be requested during physical clearance week.</li>
            </ul>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">Support and Verification</p>
            <div className="mt-4 rounded-[6px] border border-[#efe4d6] bg-[#fffcf8] p-4">
              <p className="text-sm font-semibold text-[#5b2117]">Verification Office</p>
              <p className="mt-1 text-sm text-[#7d6b5e]">Block B, Room 204</p>
            </div>
            <PortalButton variant="outline" className="mt-4 w-full" onClick={() => setActiveModal("support")}>
              <TriangleAlert className="h-4 w-4" />
              Request Assistance
            </PortalButton>
          </PortalCard>
        </div>
      </div>
      </div>

      <PortalModal
        open={activeModal === "upload"}
        onClose={() => setActiveModal(null)}
        title="Upload New File"
        description="Submit a replacement or additional supporting credential."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] p-6 text-center text-sm text-[#84705f]">
            Drag and drop a file here or browse from your device.
          </div>
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("Upload workspace opened. Backend transfer can be connected next.")
            }}
          >
            Continue Upload
          </PortalButton>
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "support"}
        onClose={() => setActiveModal(null)}
        title="Verification Assistance"
        description="Reach the credentials verification team for document-specific help."
      >
        <div className="space-y-4 text-sm text-[#7f6d5f]">
          <p>Office hours: Monday to Friday, 9:00 AM - 3:00 PM.</p>
          <p>Email: verification.office@loampolytechnic.edu</p>
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("Assistance request submitted to the verification office.")
            }}
          >
            Send Assistance Request
          </PortalButton>
        </div>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
