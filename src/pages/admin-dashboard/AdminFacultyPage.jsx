import { useEffect, useMemo, useState } from "react"
import { Building2, RefreshCcw, UserCog } from "lucide-react"
import { Link } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
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

  const recentDepartments = useMemo(() => departments.slice(0, 6), [departments])
  const recentStaff = useMemo(() => staff.slice(0, 6), [staff])

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
            <PortalButton className="h-14 w-full justify-between px-6 text-[12px] tracking-[0.16em]">
              <span className="flex items-center gap-3">
                <Building2 className="h-4 w-4" />
                Department Management
              </span>
              <span>Open Page</span>
            </PortalButton>
          </Link>
          <Link to="/admin-dashboard/general-management/staff">
            <PortalButton variant="gold" className="h-14 w-full justify-between px-6 text-[12px] tracking-[0.16em]">
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
                <p className="text-[22px] font-bold text-[#4f1d14]">Departments Overview</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  {isLoading
                    ? "Refreshing department overview..."
                    : `${departments.length} departments created, ${hodAssignedCount} with assigned HODs.`}
                </p>
              </div>
              <StatusPill>{`${departments.length} Total`}</StatusPill>
            </div>

            <div className="mt-5 space-y-3">
              {recentDepartments.length ? (
                recentDepartments.map((department) => (
                  <div
                    key={getEntityId(department) || getDepartmentName(department)}
                    className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-[#5c2418]">
                      {getDepartmentName(department)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#a18f80]">
                      HOD
                    </p>
                    <p className="mt-1 text-sm text-[#8b7969]">{getHodName(department)}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
                  No departments created yet.
                </div>
              )}
            </div>
          </PortalCard>

          <PortalCard accent="gold">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Staff Overview</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  {isLoading
                    ? "Refreshing staff overview..."
                    : `${staff.length} staff records loaded, ${activeStaffCount} currently active.`}
                </p>
              </div>
              <StatusPill>{`${staff.length} Total`}</StatusPill>
            </div>

            <div className="mt-5 space-y-3">
              {recentStaff.length ? (
                recentStaff.map((member) => (
                  <div
                    key={getEntityId(member) || getStaffEmail(member)}
                    className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#5c2418]">
                          {getStaffName(member)}
                        </p>
                        <p className="mt-1 text-sm text-[#8b7969]">{getStaffEmail(member)}</p>
                      </div>
                      <StatusPill>{getStaffStatus(member)}</StatusPill>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
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
