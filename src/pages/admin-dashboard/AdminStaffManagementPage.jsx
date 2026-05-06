import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, CheckCircle2, RefreshCcw, UserCog, UsersRound } from "lucide-react"
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
} from "../../components/admin-shared/adminManagementUtils"

const defaultStaffForm = {
  email: "",
  role: roleOptions[0].value,
  departmentId: "",
}

function SelectField({ label, value, onChange, options, placeholder = "Select option" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-admin-field-label">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[3px] border border-admin-field-border bg-admin-field-bg px-4 text-sm text-admin-field-text outline-none transition focus:border-admin-field-focus-border focus:ring-2 focus:ring-admin-field-focus-ring"
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

function SectionFrame({ icon: Icon, title, description, accent = "red", children }) {
  const toneClasses =
    accent === "gold"
      ? "border-staff-frame-gold-border bg-gradient-to-b from-staff-frame-base to-staff-frame-gold-end"
      : "border-staff-frame-red-border bg-gradient-to-b from-staff-frame-base to-staff-frame-red-end"

  return (
    <section className={`rounded-[14px] border p-5 shadow-[0_18px_38px_rgba(74,25,16,0.05)] ${toneClasses}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-white text-portal-brand shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[22px] font-bold text-shared-heading">{title}</p>
          <p className="mt-1 text-sm text-admin-registry-text">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function AdminStaffManagementPage() {
  const [toastMessage, setToastMessage] = useState("")
  const [departments, setDepartments] = useState([])
  const [staff, setStaff] = useState([])
  const [selectedStaffId, setSelectedStaffId] = useState("")
  const [staffLoadError, setStaffLoadError] = useState("")
  const [departmentLoadError, setDepartmentLoadError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [staffForm, setStaffForm] = useState(defaultStaffForm)

  const departmentOptions = useMemo(
    () =>
      departments.map((department) => ({
        value: getEntityId(department),
        label: `${getFacultyName(department)} - ${getDepartmentName(department)}`,
      })),
    [departments],
  )

  const selectedStaff = useMemo(
    () => staff.find((member) => String(getEntityId(member)) === String(selectedStaffId)) || null,
    [selectedStaffId, staff],
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
        const resolvedStaff = resolveArray(staffResult.value)
        setStaff(resolvedStaff)
        setSelectedStaffId((current) =>
          current && resolvedStaff.some((member) => String(getEntityId(member)) === String(current))
            ? current
            : (resolvedStaff[0] ? getEntityId(resolvedStaff[0]) : ""),
        )
      } else {
        setStaff([])
        setSelectedStaffId("")
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

    if (!staffForm.role) {
      setToastMessage("Staff role is required.")
      return
    }

    if (!staffForm.departmentId) {
      setToastMessage("Select the department the staff belongs to.")
      return
    }

    setIsSubmitting(true)

    try {
      await createStaff({
        email: normalizedEmail,
        role: staffForm.role,
        departmentId: staffForm.departmentId,
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
          description="Create a new staff record under a department, or select an existing staff account from the registry to manage its access state."
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

        <div className="grid gap-6 ">
          <SectionFrame
            icon={UserCog}
            title="Create New Staff"
            description="Enter the staff email, choose the staff role, then select the department the staff member belongs to before creating the account."
          >


            <div className="mt-5 grid gap-5">
              <PortalInput
                label="Staff Email"
                type="email"
                value={staffForm.email}
                placeholder="e.g. lecturer@loampolytechnic.edu"
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
                placeholder="Select the department for this staff"
              />
            </div>

            {departmentLoadError ? (
              <p className="mt-4 rounded-[8px] border border-admin-error-border bg-admin-error-bg px-4 py-3 text-sm text-admin-error-text">
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
          </SectionFrame>

          <SectionFrame
            icon={UsersRound}
            title="Select Existing Staff"
            description="This section is visually separated for reviewing current staff records, selecting one, and applying registry actions like status toggle or password reset."
            accent="gold"
          >
            {staffLoadError ? (
              <p className="rounded-[8px] border border-admin-error-border bg-admin-error-bg px-4 py-3 text-sm text-admin-error-text">
                {staffLoadError}
              </p>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,1fr)]">
              <div className="rounded-[12px] border border-staff-list-border bg-white p-3">
                <p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-staff-list-label">
                  Staff Registry
                </p>
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="rounded-[10px] border border-dashed border-staff-empty-border bg-admin-registry-bg px-6 py-10 text-center text-sm text-staff-empty-text">
                      Loading staff records...
                    </div>
                  ) : staff.length ? (
                    staff.map((member) => {
                      const staffId = getEntityId(member)
                      const isSelected = String(staffId) === String(selectedStaffId)

                      return (
                        <button
                          key={staffId || getStaffEmail(member)}
                          type="button"
                          onClick={() => setSelectedStaffId(staffId)}
                          className={`w-full rounded-[10px] border px-4 py-4 text-left transition-colors ${
                            isSelected
                              ? "border-staff-selected-border bg-staff-selected-bg"
                              : "border-admin-registry-border bg-admin-registry-bg hover:border-staff-hover-border"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-staff-name">
                                {getStaffName(member)}
                              </p>
                              <p className="mt-1 text-sm text-staff-meta">{getStaffEmail(member)}</p>
                              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-staff-meta-soft">
                                {getStaffRole(member)} - {getStaffDepartment(member)}
                              </p>
                            </div>
                            {isSelected ? <CheckCircle2 className="h-4 w-4 text-staff-selected-icon" /> : null}
                          </div>
                        </button>
                      )
                    })
                  ) : (
                    <div className="rounded-[10px] border border-dashed border-staff-empty-border bg-admin-registry-bg px-6 py-10 text-center text-sm text-staff-empty-text">
                      No staff records loaded yet.
                    </div>
                  )}
                </div>
              </div>

              <PortalCard className="h-full border border-staff-detail-border bg-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[20px] font-bold text-shared-heading">Selected Staff</p>
                    <p className="mt-1 text-sm text-staff-meta">
                      Choose a staff record on the left to view and manage it here.
                    </p>
                  </div>
                  {selectedStaff ? <StatusPill>{getStaffStatus(selectedStaff)}</StatusPill> : null}
                </div>

                {selectedStaff ? (
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-staff-meta-soft">
                        Staff Name
                      </p>
                      <p className="mt-2 text-sm font-semibold text-staff-name">
                        {getStaffName(selectedStaff)}
                      </p>
                    </div>

                    <div className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-staff-meta-soft">
                        Institutional Email
                      </p>
                      <p className="mt-2 text-sm font-semibold text-staff-name">
                        {getStaffEmail(selectedStaff)}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-staff-meta-soft">
                          Role
                        </p>
                        <p className="mt-2 text-sm font-semibold text-staff-name">
                          {getStaffRole(selectedStaff)}
                        </p>
                      </div>
                      <div className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-staff-meta-soft">
                          Department
                        </p>
                        <p className="mt-2 text-sm font-semibold text-staff-name">
                          {getStaffDepartment(selectedStaff)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <PortalButton onClick={() => handleToggleStatus(getEntityId(selectedStaff))}>
                        Toggle Staff Status
                      </PortalButton>
                      <PortalButton
                        variant="outline"
                        onClick={() => handleResetPassword(getEntityId(selectedStaff))}
                      >
                        Reset Password
                      </PortalButton>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-[10px] border border-dashed border-staff-empty-border bg-admin-registry-bg px-6 py-10 text-center text-sm text-staff-empty-text">
                    Select a staff record from the registry to inspect it here.
                  </div>
                )}
              </PortalCard>
            </div>
          </SectionFrame>
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
