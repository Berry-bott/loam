import { useEffect, useMemo, useState } from "react"
import { Building2, RefreshCcw, UserCog } from "lucide-react"
import { Link } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalCardSkeleton } from "../../components/portal/PortalSkeleton"
import { PortalToast } from "../../components/portal/PortalToast"
import { PageEyebrow, PageTitle, StatusPill } from "../../components/admin-shared/Shared"
import { getAllDepartments, getAllStaff } from "../../store/admin/adminApi"
import {
  getDepartmentName,
  getEntityId,
  getStaffEmail,
  getStaffName,
  getHodName,
  getStaffStatus,
  resolveArray,
} from "../../components/admin-shared/adminManagementUtils"

export default function AdminFacultyPage() {
  const [departments, setDepartments] = useState([])
  const [staff, setStaff] = useState([])
  const [toastMessage, setToastMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const hodAssignedCount = useMemo(
    () => departments.filter((department) => getHodName(department) !== "Unassigned").length,
    [departments],
  )

  const activeStaffCount = useMemo(
    () => staff.filter((member) => getStaffStatus(member).toLowerCase().includes("active")).length,
    [staff],
  )

  const recentDepartments = useMemo(() => departments, [departments])
  const recentStaff = useMemo(() => staff, [staff])

  const loadOverview = async () => {
    setIsLoading(true)

    try {
      const [departmentResult, staffResult] = await Promise.allSettled([
        getAllDepartments(),
        getAllStaff(),
      ])

      if (departmentResult.status === "fulfilled") {
        setDepartments(resolveArray(departmentResult.value))
      } else {
        setDepartments([])
      }

      if (staffResult.status === "fulfilled") {
        setStaff(resolveArray(staffResult.value))
      } else {
        setStaff([])
      }

      if (
        departmentResult.status === "rejected" &&
        staffResult.status === "rejected"
      ) {
        setToastMessage("Unable to load management summary right now.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOverview()
  }, [])

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="General Management"
          description="Open a dedicated management page for departments or staff, then use the overview below to quickly see what has already been created."
          actions={
            <PortalButton variant="outline" onClick={loadOverview}>
              <RefreshCcw className="h-4 w-4" />
              Refresh Summary
            </PortalButton>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/admin-dashboard/general-management/departments">
            <PortalButton className="h-12 w-full justify-between px-4 text-[11px] tracking-[0.14em]">
              <span className="flex items-center gap-3">
                <Building2 className="h-4 w-4" />
                Department Management
              </span>
              <span>Open Page</span>
            </PortalButton>
          </Link>
          <Link to="/admin-dashboard/general-management/staff">
            <PortalButton variant="gold" className="h-12 w-full justify-between px-4 text-[11px] tracking-[0.14em]">
              <span className="flex items-center gap-3">
                <UserCog className="h-4 w-4" />
                Staff Management
              </span>
              <span>Open Page</span>
            </PortalButton>
          </Link>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <PortalCard>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[22px] font-bold text-portal-text-strong">Departments Overview</p>
                <p className="mt-1 text-sm text-portal-text-muted">
                  {isLoading
                    ? "Refreshing department overview..."
                    : `${departments.length} departments created, ${hodAssignedCount} with assigned HODs.`}
                </p>
              </div>
              <StatusPill>{`${departments.length} Total`}</StatusPill>
            </div>

            <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-1">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <PortalCardSkeleton key={index} lines={2} />
                ))
              ) : recentDepartments.length ? (
                recentDepartments.map((department) => (
                  <div
                    key={getEntityId(department) || getDepartmentName(department)}
                    className="rounded-[8px] border border-portal-border bg-portal-surface px-3 py-3"
                  >
                    <p className="text-sm font-semibold text-portal-text">
                      {getDepartmentName(department)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-staff-meta-soft">
                      HOD
                    </p>
                    <p className="mt-1 text-sm text-portal-text-muted">{getHodName(department)}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[8px] border border-dashed border-staff-empty-border bg-portal-surface px-4 py-8 text-center text-sm text-portal-text-muted">
                  No departments created yet.
                </div>
              )}
            </div>
          </PortalCard>

          <PortalCard accent="gold">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[22px] font-bold text-portal-text-strong">Staff Overview</p>
                <p className="mt-1 text-sm text-portal-text-muted">
                  {isLoading
                    ? "Refreshing staff overview..."
                    : `${staff.length} staff records loaded, ${activeStaffCount} currently active.`}
                </p>
              </div>
              <StatusPill>{`${staff.length} Total`}</StatusPill>
            </div>

            <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-1">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <PortalCardSkeleton key={index} lines={2} showBadge />
                ))
              ) : recentStaff.length ? (
                recentStaff.map((member) => (
                  <div
                    key={getEntityId(member) || getStaffEmail(member)}
                    className="rounded-[8px] border border-portal-border bg-portal-surface px-3 py-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-portal-text">
                          {getStaffName(member)}
                        </p>
                        <p className="mt-1 text-sm text-portal-text-muted">{getStaffEmail(member)}</p>
                      </div>
                      <StatusPill>{getStaffStatus(member)}</StatusPill>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[8px] border border-dashed border-staff-empty-border bg-portal-surface px-4 py-8 text-center text-sm text-portal-text-muted">
                  No staff created yet.
                </div>
              )}
            </div>
          </PortalCard>
        </div>
      </div>

      <PortalToast
        open={Boolean(toastMessage)}
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
    </>
  )
}

