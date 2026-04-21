import { useState } from "react"
import { Check, Download, Eye, Upload } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { applicationSteps, credentials } from "../../lib/portal-data"

export default function StudentApplicationPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [selectedCredential, setSelectedCredential] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">Current Process</p>
          <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[#531b14] sm:text-[40px]">
            My Application
          </h1>
          <p className="max-w-[720px] text-sm text-[#8b7969] sm:text-[15px]">
            Application ID: HP-2024-8892. Your journey toward academic excellence is currently being
            reviewed by our admissions board.
          </p>
        </div>
        <div className="text-left lg:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">Academic Session</p>
          <p className="mt-1 text-[24px] font-bold text-[#5b2017]">2024 / 2025</p>
        </div>
      </div>

      <PortalCard>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#4f1d14]">Admission Progress</p>
            <span className="rounded-full bg-[#f1c85b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6c240f]">
              In Progress
            </span>
          </div>

          <div className="relative grid gap-5 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-6 hidden h-[2px] bg-[#eadfce] md:block" />
            {applicationSteps.map((step, index) => (
              <div key={step.label} className="relative flex flex-col items-center text-center">
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-[12px] border-4 border-[#fffdfa] text-white shadow-sm ${
                    step.state === "active"
                      ? "bg-[#9b7a16]"
                      : step.state === "complete"
                        ? "bg-[#8f120d]"
                        : "bg-[#d9d0c4]"
                  }`}
                >
                  {step.state === "complete" ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                </div>
                <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5b2017]">
                  {step.label}
                </p>
                <p className="mt-1 text-[11px] text-[#a59587]">{step.date}</p>
              </div>
            ))}
          </div>
        </div>
      </PortalCard>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.75fr)_310px]">
        <PortalCard>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Evidence of Credentials</p>
              </div>
              <button
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f120d]"
                onClick={() => setActiveModal("upload")}
              >
                <Upload className="h-4 w-4" />
                Upload Now
              </button>
            </div>

            <div className="space-y-3">
              {credentials.map((credential) => (
                <div
                  key={credential.name}
                  className="flex items-center gap-4 rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#faf1ef] text-[#8f120d]">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-[#4f1d14]">{credential.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#ab987f]">{credential.size}</p>
                  </div>
                  <div className="flex gap-2 text-[#947e6c]">
                    <button
                      className="rounded-full border border-[#eadfce] p-2"
                      onClick={() => {
                        setSelectedCredential(credential)
                        setActiveModal("credential")
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-full border border-[#eadfce] p-2"
                      onClick={() => setToastMessage(`Download prepared for ${credential.name}.`)}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PortalCard>

        <div className="space-y-5">
          <PortalCard className="bg-[#8f120d] text-white before:bg-[#8f120d]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Admission Status</p>
            <p className="mt-3 text-[30px] font-bold leading-tight">Awaiting Departmental Clearance</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Your documents have been validated. The next phase is an interview or screening with the HOD or
              departmental screening unit.
            </p>
            <PortalButton variant="gold" className="mt-5 w-full" onClick={() => setActiveModal("requirements")}>
              View Requirements
            </PortalButton>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">
              Academic Registrar's Note
            </p>
            <p className="mt-3 text-sm leading-6 text-[#7d6d60]">
              Please ensure all uploaded documents are original and legible. Inconsistencies may lead to
              additional review.
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-[6px] bg-[#fbf5ea] px-3 py-3">
              <img src="/IMG_3175.jpeg" alt="Officer" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-[#5b2117]">Dr. Esther Udo</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#a58f78]">Office of the Registrar</p>
              </div>
            </div>
          </PortalCard>
        </div>
      </div>
      </div>

      <PortalModal
        open={activeModal === "upload"}
        onClose={() => setActiveModal(null)}
        title="Upload Additional Credential"
        description="Attach a clearer or updated file for the admissions review team."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] p-6 text-center text-sm text-[#84705f]">
            Drop files here or click to choose a PDF, JPG, or PNG document.
          </div>
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("Upload queue created. Attachments can be completed from the document desk.")
            }}
          >
            Continue Upload
          </PortalButton>
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "credential"}
        onClose={() => setActiveModal(null)}
        title={selectedCredential?.name || "Credential Preview"}
        description="Document details available for your review."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] bg-[#faf3ea] p-4 text-sm text-[#7f6d5f]">
            File type: {selectedCredential?.size}
          </div>
          <PortalButton variant="outline" className="w-full" onClick={() => setActiveModal(null)}>
            Close Preview
          </PortalButton>
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "requirements"}
        onClose={() => setActiveModal(null)}
        title="Departmental Clearance Requirements"
        description="Prepare the following items before your next screening stage."
      >
        <ul className="space-y-3 text-sm leading-6 text-[#7f6d5f]">
          <li>Original copies of all uploaded credentials.</li>
          <li>Application slip and payment confirmation receipt.</li>
          <li>Two recent passport photographs.</li>
        </ul>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
