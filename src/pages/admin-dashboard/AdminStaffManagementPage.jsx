import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, RefreshCcw, UserCog } from "lucide-react"
import { Link } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalDropdown } from "../../components/portal/PortalDropdown"
import { PortalInput } from "../../components/portal/PortalInput"
import { PortalToast } from "../../components/portal/PortalToast"
import { PageEyebrow, PageTitle, StatusPill } from "../../components/admin-shared/Shared"
import {
  createStaff,
  getAllDepartments,
  getAllStaff,
  resetStaffPassword,
  toggleStaffStatus,
} from "../../store/admin/adminApi"
import {
  getDepartmentName,
  getEntityId,
  getFacultyName,
  getStaffDepartment,
  getStaffEmail,
  getStaffName,
  getStaffRole,
  getStaffStatus,
  resolveArray,
  roleOptions,
} from "./adminManagementUtils"

const defaultStaffForm = {
  email: "",
  role: roleOptions[1],
  departmentId: "",
}

function SelectField({ label, value, onChange, options, placeholder = "Select option" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8d7969]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[3px] border border-[#efe5d8] bg-[#fffdf9] px-4 text-sm text-[#4d2017] outline-none transition focus:border-[#ccb08e] focus:ring-2 focus:ring-[#ecdcb8]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function AdminStaffManagementPage() {
  const [toastMessage, setToastMessage] = useState("")
  const [departments, setDepartments] = useState([])
  const [staff, setStaff] = useState([])
  const [staffLoadError, setStaffLoadError] = useState("")
  const [departmentLoadError, setDepartmentLoadError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [staffForm, setStaffForm] = useState(defaultStaffForm)

  const departmentOptions = useMemo(
    () =>
      departments.map((department) => ({
        value: getEntityId(department),
        label: `${getFacultyName(department)} · ${getDepartmentName(department)}`,
      })),
    [departments],
  )

  const loadStaffData = async () => {
    setIsLoading(true)
    setStaffLoadError("")
    setDepartmentLoadError("")

    try {
      const [staffResult, departmentResult] = await Promise.allSettled([
        getAllStaff(),
        getAllDepartments(),
      ])

      if (staffResult.status === "fulfilled") {
        setStaff(resolveArray(staffResult.value))
      } else {
        setStaff([])
        setStaffLoadError(
          staffResult.reason?.message || "Unable to load staff records right now.",
        )
      }

      if (departmentResult.status === "fulfilled") {
        setDepartments(resolveArray(departmentResult.value))
      } else {
        setDepartments([])
        setDepartmentLoadError(
          departmentResult.reason?.message || "Unable to load departments right now.",
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStaffData()
  }, [])

  const handleStaffChange = (field, value) => {
    setStaffForm((current) => ({ ...current, [field]: value }))
  }

  const resetForm = () => {
    setStaffForm(defaultStaffForm)
  }

  const handleSubmit = async () => {
    if (isSubmitting) return

    const normalizedEmail = staffForm.email.trim().toLowerCase()
    if (!normalizedEmail) {
      setToastMessage("Staff email is required.")
      return
    }

    setIsSubmitting(true)

    try {
      await createStaff({
        email: normalizedEmail,
        role: staffForm.role,
        departmentId: staffForm.departmentId || undefined,
      })

      await loadStaffData()
      resetForm()
      setToastMessage(`${normalizedEmail} created successfully.`)
    } catch (error) {
      setToastMessage(error.message || "Unable to create staff right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleStatus = async (staffId) => {
    try {
      await toggleStaffStatus(staffId)
      await loadStaffData()
      setToastMessage("Staff status updated successfully.")
    } catch (error) {
      setToastMessage(error.message || "Unable to update staff status right now.")
    }
  }

  const handleResetPassword = async (staffId) => {
    try {
      await resetStaffPassword(staffId)
      setToastMessage("Password reset triggered successfully.")
    } catch (error) {
      setToastMessage(error.message || "Unable to reset staff password right now.")
    }
  }

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="Staff Management"
          description="Create staff accounts, load all staff records, toggle active status, and trigger password reset operations from one dedicated page."
          actions={
            <>
              <Link to="/admin-dashboard/general-management">
                <PortalButton variant="outline">
                  <ArrowLeft className="h-4 w-4" />
                  Back 
                </PortalButton>
              </Link>
              <PortalButton variant="outline" onClick={loadStaffData}>
                <RefreshCcw className="h-4 w-4" />
               
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-24 ">
          <PortalCard>
            <div className="flex items-center gap-3">
              <UserCog className="h-5 w-5 text-[#8f120d]" />
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Create Staff</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  This page wires `createStaff`, `getAllStaff`, `toggleStaffStatus`, and `resetStaffPassword`.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <PortalInput
                label="Staff Email"
                type="email"
                value={staffForm.email}
                placeholder="e.g. registry.office@loampoly.edu"
                onChange={(event) => handleStaffChange("email", event.target.value)}
              />

              <SelectField
                label="Staff Role"
                value={staffForm.role}
                onChange={(value) => handleStaffChange("role", value)}
                options={roleOptions}
              />

              <SelectField
                label="Department"
                value={staffForm.departmentId}
                onChange={(value) => handleStaffChange("departmentId", value)}
                options={departmentOptions}
                placeholder="Optional department assignment"
              />
            </div>

            {departmentLoadError ? (
              <p className="mt-4 rounded-[8px] border border-[#ead0cb] bg-[#fff5f4] px-4 py-3 text-sm text-[#9a211b]">
                {departmentLoadError}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <PortalButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Staff"}
              </PortalButton>
              <PortalButton variant="outline" onClick={resetForm}>
                Reset Form
              </PortalButton>
            </div>
          </PortalCard>

          <PortalCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Staff Registry</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  Every loaded staff record exposes toggle and password reset actions.
                </p>
              </div>
            </div>

            {staffLoadError ? (
              <p className="mt-5 rounded-[8px] border border-[#ead0cb] bg-[#fff5f4] px-4 py-3 text-sm text-[#9a211b]">
                {staffLoadError}
              </p>
            ) : null}

            <div className="mt-5 space-y-3">
              {isLoading ? (
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
                  Loading staff records...
                </div>
              ) : staff.length ? (
                staff.map((member) => {
                  const staffId = getEntityId(member)

                  return (
                    <div
                      key={staffId || getStaffEmail(member)}
                      className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-4"
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#5c2418]">
                            {getStaffName(member)}
                          </p>
                          <p className="mt-1 text-sm text-[#8b7969]">{getStaffEmail(member)}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#a18f80]">
                            {getStaffRole(member)} · {getStaffDepartment(member)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <StatusPill>{getStaffStatus(member)}</StatusPill>
                          <PortalDropdown
                            label="Actions"
                            triggerClassName="h-9 px-3 text-[10px]"
                            items={[
                              {
                                label: "Toggle Staff Status",
                                onClick: () => handleToggleStatus(staffId),
                              },
                              {
                                label: "Reset Password",
                                onClick: () => handleResetPassword(staffId),
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
                  No staff records loaded yet.
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
