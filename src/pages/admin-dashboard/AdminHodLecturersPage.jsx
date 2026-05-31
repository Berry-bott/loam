import { useEffect, useMemo, useState } from "react"
import { Eye, RefreshCcw, Users } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalCardSkeleton } from "../../components/portal/PortalSkeleton"
import { PortalToast } from "../../components/portal/PortalToast"
import {
  MetricCard,
  PageEyebrow,
  PageTitle,
  StatusPill,
} from "../../components/admin-shared/Shared"
import { getHodLecturers } from "../../store/admin/hodApi"

function resolveLecturerList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  if (Array.isArray(payload?.data?.lecturers)) return payload.data.lecturers
  if (Array.isArray(payload?.lecturers)) return payload.lecturers
  return []
}

function getEntityId(item) {
  return String(item?.id || item?._id || item?.userId || item?.lecturerId || item?.uuid || "")
}

function getLecturerName(item) {
  const profile = item?.staffProfile || item?.profile || item?.lecturerProfile || {}
  const title = String(item?.title || profile?.title || "").trim()
  const firstName = String(item?.firstName || profile?.firstName || "").trim()
  const lastName = String(item?.lastName || profile?.lastName || "").trim()
  const fullName = [title, firstName, lastName].filter(Boolean).join(" ")

  return fullName || item?.name || item?.fullName || "Unnamed Lecturer"
}

function getLecturerEmail(item) {
  return item?.email || item?.staffProfile?.email || item?.profile?.email || "-"
}

function getLecturerDepartment(item) {
  return (
    item?.department?.name ||
    item?.departmentName ||
    item?.staffProfile?.departmentName ||
    item?.profile?.departmentName ||
    "Department not available"
  )
}

function getLecturerRole(item) {
  return String(item?.role || item?.staffRole || "LECTURER")
    .replace(/_/g, " ")
    .toUpperCase()
}

function getLecturerStatus(item) {
  if (item?.isActive === true) return "Active"
  if (item?.isActive === false) return "Inactive"
  return item?.status || "Active"
}

export default function AdminHodLecturersPage() {
  const [lecturers, setLecturers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState("")
  const [selectedLecturerId, setSelectedLecturerId] = useState("")

  const selectedLecturer = useMemo(
    () => lecturers.find((item) => getEntityId(item) === selectedLecturerId) || null,
    [lecturers, selectedLecturerId],
  )

  const activeLecturers = useMemo(
    () => lecturers.filter((item) => String(getLecturerStatus(item)).toLowerCase() === "active").length,
    [lecturers],
  )

  const hodTaggedLecturers = useMemo(
    () => lecturers.filter((item) => getLecturerRole(item).includes("HOD")).length,
    [lecturers],
  )

  const loadLecturers = async () => {
    setIsLoading(true)

    try {
      const payload = await getHodLecturers()
      setLecturers(resolveLecturerList(payload))
    } catch (error) {
      setToastMessage(error.message || "Unable to load department lecturers right now.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLecturers().catch(() => {})
  }, [])

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="Department Lecturers"
          description="Review the academic staff attached to your department and open their details from the HOD portal."
          actions={
            <PortalButton variant="outline" onClick={loadLecturers}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </PortalButton>
          }
        />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <PortalCardSkeleton key={`hod-lecturer-metric-${index}`} lines={2} showBadge />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Department Staff" value={String(lecturers.length)} note="Total lecturers returned for this department" />
            <MetricCard label="Active Staff" value={String(activeLecturers)} note="Lecturers currently marked active" accent="gold" />
            <MetricCard label="HOD Records" value={String(hodTaggedLecturers)} note="Records currently tagged with HOD authority" />
          </div>
        )}

        <PortalCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Department Registry
              </p>
              <p className="mt-1 text-sm text-portal-text-muted">
                Academic staff visible from the HOD endpoint.
              </p>
            </div>
            <div className="rounded-full bg-portal-surface-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
              {lecturers.length} records
            </div>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <PortalCardSkeleton key={`hod-lecturer-row-${index}`} lines={3} showBadge />
              ))
            ) : lecturers.length ? (
              lecturers.map((lecturer) => {
                const lecturerId = getEntityId(lecturer)

                return (
                  <div
                    key={lecturerId || getLecturerEmail(lecturer)}
                    className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-portal-text">
                            {getLecturerName(lecturer)}
                          </p>
                          <StatusPill>{getLecturerStatus(lecturer)}</StatusPill>
                        </div>
                        <p className="mt-1 text-sm text-portal-text-muted">{getLecturerEmail(lecturer)}</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                          {getLecturerRole(lecturer)} · {getLecturerDepartment(lecturer)}
                        </p>
                      </div>

                      <PortalButton
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLecturerId(lecturerId)}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </PortalButton>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="rounded-[10px] border border-dashed border-portal-border bg-white px-4 py-10 text-center text-sm text-portal-text-muted">
                No lecturers were returned for this department yet.
              </div>
            )}
          </div>
        </PortalCard>

        {selectedLecturer ? (
          <PortalCard accent="gold">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                  Lecturer Profile
                </p>
                <h2 className="mt-2 text-[28px] font-bold text-shared-title">
                  {getLecturerName(selectedLecturer)}
                </h2>
                <p className="mt-2 text-sm text-portal-text-muted">
                  {getLecturerEmail(selectedLecturer)}
                </p>
              </div>
              <PortalButton variant="outline" onClick={() => setSelectedLecturerId("")}>
                Close
              </PortalButton>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Role" value={getLecturerRole(selectedLecturer)} note="Current academic portal role" />
              <MetricCard label="Department" value={getLecturerDepartment(selectedLecturer)} note="Mapped department assignment" accent="gold" />
              <MetricCard label="Status" value={getLecturerStatus(selectedLecturer)} note="Availability from HOD staff registry" />
              <PortalCard accent="none" className="h-[150px] border-dashed">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-portal-surface-soft p-3 text-portal-brand-soft">
                      <Users className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-shared-heading">Department View</p>
                  </div>
                  <p className="text-sm leading-6 text-portal-text-muted">
                    This page is read-only and available through the HOD login flow.
                  </p>
                </div>
              </PortalCard>
            </div>
          </PortalCard>
        ) : null}
      </div>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
