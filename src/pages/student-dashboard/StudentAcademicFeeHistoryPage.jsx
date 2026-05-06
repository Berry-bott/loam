import { ArrowLeft, History } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { AcademicFeePaymentHistory } from "../../components/student-shared/AcademicFeePaymentHistory"
import { PortalToast } from "../../components/portal/PortalToast"
import { getPortalSession } from "../../lib/portal-auth"
import { academicFeeHistory, studentAcademicProfile } from "../../lib/portal-data"
import { useState } from "react"

export default function StudentAcademicFeeHistoryPage() {
  const navigate = useNavigate()
  const session = getPortalSession()
  const [toastMessage, setToastMessage] = useState("")

  const paymentHistoryProfile = {
    ...studentAcademicProfile,
    studentName: session?.name || session?.names || studentAcademicProfile.studentName,
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">
              Academic Fees / Payment History
            </p>
            <h1 className="mt-2 flex items-center gap-3 text-[28px] font-bold tracking-tight text-student-title sm:text-[40px]">
              <History className="h-7 w-7 text-primary" />
              Payment History
            </h1>
            <p className="mt-2 max-w-[760px] text-sm leading-6 text-portal-text-muted">
              Review the full bursary record for all academic fee payments, including receipt number, RRR, invoice
              reference, and verification details.
            </p>
          </div>

          <PortalButton variant="outline" onClick={() => navigate("/student-dashboard/academic-fees")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Academic Fees
          </PortalButton>
        </div>

        <AcademicFeePaymentHistory
          records={academicFeeHistory}
          studentProfile={paymentHistoryProfile}
          onDownloadReceipt={(record) => setToastMessage(`${record.feeTitle} receipt download prepared successfully.`)}
          onDownloadSlip={(record) => setToastMessage(`${record.feeTitle} payment slip prepared successfully.`)}
        />
      </div>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

