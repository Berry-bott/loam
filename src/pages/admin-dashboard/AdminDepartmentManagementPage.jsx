import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Building2, RefreshCcw } from "lucide-react"
import { Link } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalCardSkeleton, PortalSkeleton } from "../../components/portal/PortalSkeleton"
import { PortalToast } from "../../components/portal/PortalToast"
import { MetricCard, PageEyebrow, PageTitle } from "../../components/admin-shared/Shared"
import { getAdminDashboardRoute } from "../../lib/portal-routing"
import {
  assignHod,
  createDepartment,
  createFaculty,
  getAllDepartments,
  getDepartmentsByFaculty,
  getAllFaculties,
  getAllStaff,
  getStaffById,
} from "../../store/admin/adminApi"
import {
  getDepartmentName,
  getEntityId,
  getFacultyCode,
  getFacultyName,
  getHodName,
  getStaffEmail,
  getStaffName,
  getStaffRole,
  resolveArray,
} from "../../components/admin-shared/adminManagementUtils"

const defaultDepartmentForm = {
  facultyMode: "existing",
  facultyName: "",
  facultyCode: "",
  selectedFacultyId: "",
  mode: "new",
  name: "",
  existingDepartmentId: "",
}

function SelectField({ label, value, onChange, options, placeholder = "Select option", disabled = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-admin-field-label">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="h-12 w-full rounded-[3px] border border-admin-field-border bg-admin-field-bg px-4 text-sm text-admin-field-text outline-none transition focus:border-admin-field-focus-border focus:ring-2 focus:ring-admin-field-focus-ring disabled:cursor-not-allowed disabled:bg-admin-field-disabled-bg disabled:text-admin-field-disabled-text"
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

export default function AdminDepartmentManagementPage() {
  const [toastMessage, setToastMessage] = useState("")
  const [faculties, setFaculties] = useState([])
  const [departments, setDepartments] = useState([])
  const [facultyDepartments, setFacultyDepartments] = useState([])
  const [facultyLoadError, setFacultyLoadError] = useState("")
  const [departmentLoadError, setDepartmentLoadError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAssigningHod, setIsAssigningHod] = useState(false)
  const [isLoadingDepartmentStaff, setIsLoadingDepartmentStaff] = useState(false)
  const [departmentStaffLoadError, setDepartmentStaffLoadError] = useState("")
  const [departmentForm, setDepartmentForm] = useState(defaultDepartmentForm)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedLecturer, setSelectedLecturer] = useState(null)
  const [confirmCandidate, setConfirmCandidate] = useState(null)
  const [departmentStaff, setDepartmentStaff] = useState([])

  const facultyOptions = useMemo(
    () =>
      faculties.map((faculty) => {
        const code = getFacultyCode(faculty)
        const name = getFacultyName(faculty)

        return {
          value: getEntityId(faculty),
          label: code ? `${name} (${code})` : name,
        }
      }),
    [faculties],
  )

  const activeFacultyId = departmentForm.selectedFacultyId

  const filteredDepartmentSource = facultyDepartments.length ? facultyDepartments : departments

  const filteredDepartmentOptions = useMemo(() => {
    return filteredDepartmentSource
      .filter((department) => {
        if (!activeFacultyId) return false

        const departmentFacultyId =
          department?.faculty?.id ||
          department?.faculty?._id ||
          department?.facultyId ||
          ""

        if (departmentFacultyId) {
          return String(departmentFacultyId) === String(activeFacultyId)
        }

        const departmentFacultyName = getFacultyName(department)
        const selectedFaculty = faculties.find((faculty) => String(getEntityId(faculty)) === String(activeFacultyId))

        return selectedFaculty
          ? departmentFacultyName === getFacultyName(selectedFaculty)
          : false
      })
      .map((department) => ({
        value: getEntityId(department),
        label: getDepartmentName(department),
      }))
  }, [activeFacultyId, filteredDepartmentSource, faculties])

  const groupedDepartments = useMemo(() => {
    const grouped = departments.reduce((accumulator, department) => {
      const facultyName = getFacultyName(department)
      if (!accumulator[facultyName]) {
        accumulator[facultyName] = []
      }

      accumulator[facultyName].push(department)
      return accumulator
    }, {})

    return Object.entries(grouped).map(([facultyName, records]) => ({
      facultyName,
      records: records.sort((left, right) =>
        getDepartmentName(left).localeCompare(getDepartmentName(right)),
      ),
    }))
  }, [departments])

  const hodAssignedCount = useMemo(
    () => departments.filter((department) => getHodName(department) !== "Unassigned").length,
    [departments],
  )

  const loadManagementData = async () => {
    setIsLoading(true)
    setFacultyLoadError("")
    setDepartmentLoadError("")

    try {
      const [facultyResult, departmentResult] = await Promise.allSettled([
        getAllFaculties(),
        getAllDepartments(),
      ])

      if (facultyResult.status === "fulfilled") {
        setFaculties(resolveArray(facultyResult.value))
      } else {
        setFaculties([])
        setFacultyLoadError(
          facultyResult.reason?.message || "Unable to load faculties right now.",
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
    loadManagementData()
  }, [])

  useEffect(() => {
    let isActive = true

    if (!activeFacultyId) {
      setFacultyDepartments([])
      return () => {
        isActive = false
      }
    }

    getDepartmentsByFaculty(activeFacultyId)
      .then((payload) => {
        if (!isActive) return
        setFacultyDepartments(resolveArray(payload))
      })
      .catch(() => {
        if (!isActive) return
        setFacultyDepartments([])
      })

    return () => {
      isActive = false
    }
  }, [activeFacultyId])

  const resetForm = (overrides = {}) => {
    setDepartmentForm({ ...defaultDepartmentForm, ...overrides })
  }

  const handleOpenAssignHod = async (department) => {
    setSelectedDepartment(department)
    setSelectedLecturer(null)
    setConfirmCandidate(null)
    setDepartmentStaff([])
    setDepartmentStaffLoadError("")
    setIsLoadingDepartmentStaff(true)

    try {
      const staffPayload = await getAllStaff()
      const allStaff = resolveArray(staffPayload)
      const selectedDepartmentId = String(getEntityId(department))
      const selectedDepartmentName = String(getDepartmentName(department)).toLowerCase()

      const matchedStaff = allStaff.filter((member) => {
        const staffDepartmentId = String(
          member?.departmentId ||
          member?.department?.id ||
          member?.department?._id ||
          member?.lecturer?.departmentId ||
          member?.hod?.departmentId ||
          member?.lecturer?.department?.id ||
          member?.hod?.department?.id ||
          member?.profile?.departmentId ||
          member?.staffProfile?.departmentId ||
          "",
        )

        const staffDepartmentName = String(
          member?.department?.name ||
          member?.departmentName ||
          member?.lecturer?.department?.name ||
          member?.hod?.department?.name ||
          member?.profile?.departmentName ||
          member?.staffProfile?.departmentName ||
          "",
        ).toLowerCase()

        return (
          (staffDepartmentId && staffDepartmentId === selectedDepartmentId) ||
          (staffDepartmentName && staffDepartmentName === selectedDepartmentName)
        )
      })

      const uniqueStaffIds = Array.from(
        new Set(matchedStaff.map((member) => getEntityId(member)).filter(Boolean)),
      )

      if (!uniqueStaffIds.length) {
        setDepartmentStaff([])
        return
      }

      const results = await Promise.allSettled(
        uniqueStaffIds.map((staffId) => getStaffById(staffId)),
      )

      const resolvedStaff = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value?.data || result.value)
        .filter(Boolean)

      setDepartmentStaff(resolvedStaff)
    } catch (error) {
      setDepartmentStaff([])
      setDepartmentStaffLoadError(error.message || "Unable to load department staff right now.")
    } finally {
      setIsLoadingDepartmentStaff(false)
    }
  }

  const handleCloseAssignHod = () => {
    setSelectedDepartment(null)
    setSelectedLecturer(null)
    setConfirmCandidate(null)
    setDepartmentStaff([])
    setDepartmentStaffLoadError("")
    setIsAssigningHod(false)
    setIsLoadingDepartmentStaff(false)
  }

  const handleOpenConfirmAssign = (member) => {
    setSelectedLecturer(member)
    setConfirmCandidate(member)
  }

  const handleCloseConfirmAssign = () => {
    setConfirmCandidate(null)
  }

  const handleDepartmentChange = (field, value) => {
    setDepartmentForm((current) => {
      const next = { ...current, [field]: value }

      if (field === "facultyMode") {
        next.facultyName = ""
        next.facultyCode = ""
        next.selectedFacultyId = ""
        next.existingDepartmentId = ""
      }

      if (field === "selectedFacultyId") {
        next.existingDepartmentId = ""
      }

      return next
    })
  }

  const resolveFacultyId = async () => {
    if (departmentForm.facultyMode === "existing") {
      if (!departmentForm.selectedFacultyId) {
        throw new Error("Choose an existing faculty before creating or loading a department.")
      }

      return {
        facultyId: departmentForm.selectedFacultyId,
        createdFacultyName:
          faculties.find((faculty) => String(getEntityId(faculty)) === String(departmentForm.selectedFacultyId))
            ? getFacultyName(
                faculties.find((faculty) => String(getEntityId(faculty)) === String(departmentForm.selectedFacultyId)),
              )
            : "Selected Faculty",
      }
    }

    const trimmedFacultyName = departmentForm.facultyName.trim()
    const trimmedFacultyCode = departmentForm.facultyCode.trim().toUpperCase()

    if (!trimmedFacultyName) {
      throw new Error("Schools name is required.")
    }

    if (!trimmedFacultyCode) {
      throw new Error("Schools code is required.")
    }

    const payload = await createFaculty({
      name: trimmedFacultyName,
      code: trimmedFacultyCode,
    })

    const createdFaculty = payload?.data?.faculty || payload?.data || null
    const facultyId =
      payload?.data?.id ||
      getEntityId(createdFaculty)

    if (!facultyId) {
      throw new Error("Faculty was created but no faculty id was returned.")
    }

    return {
      facultyId,
      createdFacultyName:
        payload?.data?.name ||
        getFacultyName(createdFaculty) ||
        trimmedFacultyName,
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting) return

    const isNewDepartment = departmentForm.mode === "new"
    const trimmedDepartmentName = departmentForm.name.trim()

    if (isNewDepartment && !trimmedDepartmentName) {
      setToastMessage("Department name is required.")
      return
    }

    if (!isNewDepartment && !departmentForm.existingDepartmentId) {
      setToastMessage("Choose an existing department first.")
      return
    }

    setIsSubmitting(true)

    try {
      const { facultyId, createdFacultyName } = await resolveFacultyId()

      let targetDepartmentId = departmentForm.existingDepartmentId
      let targetDepartmentName = trimmedDepartmentName

      if (isNewDepartment) {
        const payload = await createDepartment({
          name: trimmedDepartmentName,
          facultyId,
        })
        const createdDepartment = payload?.data?.department || payload?.data || null

        targetDepartmentId =
          payload?.data?.id ||
          getEntityId(createdDepartment)

        targetDepartmentName =
          payload?.data?.name ||
          getDepartmentName(createdDepartment) ||
          trimmedDepartmentName
      }

      await loadManagementData()
      resetForm({
        facultyMode: "existing",
        selectedFacultyId: facultyId,
      })
      setToastMessage(
        isNewDepartment
          ? `${targetDepartmentName} saved under ${createdFacultyName} successfully.`
          : "Department record updated successfully.",
      )
    } catch (error) {
      setToastMessage(error.message || "Unable to save department right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAssignHod = async () => {
    const departmentId = getEntityId(selectedDepartment)
    const userId = getEntityId(selectedLecturer)

    if (!departmentId || !userId) {
      setToastMessage("Choose a lecturer before continuing.")
      return
    }

    setIsAssigningHod(true)

    try {
      await assignHod({ departmentId, userId })
      await loadManagementData()
      setToastMessage("HOD assigned successfully.")
      handleCloseAssignHod()
    } catch (error) {
      setToastMessage(error.message || "Unable to assign HOD right now.")
      setIsAssigningHod(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="Department Management"
          description="Get an overview of all departments, create new departments under existing or new schools, and assign heads of department to their respective departments all from this page."
          actions={
            <div className="flex items-center gap-2">
              <Link to={getAdminDashboardRoute()}>
                <PortalButton variant="outline">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </PortalButton>
              </Link>

              <PortalButton variant="outline" onClick={loadManagementData}>
                <RefreshCcw className="h-4 w-4" />
              </PortalButton>
            </div>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MetricCard
            label="Departments Overview"
            value={String(departments.length).padStart(2, "0")}
            note="Total departments created"
          />
          <MetricCard
            label="HOD Assigned"
            value={String(hodAssignedCount).padStart(2, "0")}
            note={`${hodAssignedCount} departments now have a head assigned`}
            accent="gold"
          />
        </div>

        <div className="grid gap-16">
          <PortalCard>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-portal-brand" />
              <div>
                <p className="text-[22px] font-bold text-shared-heading">Schools Then Department</p>
                <p className="mt-1 text-sm text-admin-registry-text">
                  Follow these steps: 1. create a new schools or select an existing schools, 2. choose whether you want a new department or an existing department, 3. enter the department name or select the department record, 4. save the department setup.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <label className="block">
                <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-admin-field-label">
                  Schools
                </span>
                <div className="grid grid-cols-2 rounded-[3px] bg-admin-tab-bg p-1">
                  {[
                    { label: "Choose Existing Schools", value: "existing" },
                    { label: "Create Schools", value: "new" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleDepartmentChange("facultyMode", option.value)}
                        className={`rounded-[3px] px-2 py-2.5 text-[12px] font-semibold transition-colors ${
                          departmentForm.facultyMode === option.value
                            ? "bg-white text-admin-tab-active-text shadow-sm"
                            : "text-admin-tab-inactive-text"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                {departmentForm.facultyMode === "new" ? (
                  <>
                    <PortalInput
                      label="Schools Name"
                      value={departmentForm.facultyName}
                      placeholder="e.g. Schools of Computing"
                      onChange={(event) => handleDepartmentChange("facultyName", event.target.value)}
                    />
                    <PortalInput
                      label="Schools Code"
                      value={departmentForm.facultyCode}
                      placeholder="e.g. CO"
                      onChange={(event) => handleDepartmentChange("facultyCode", event.target.value.toUpperCase())}
                    />
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <SelectField
                      label="Existing Schools"
                      value={departmentForm.selectedFacultyId}
                      onChange={(value) => handleDepartmentChange("selectedFacultyId", value)}
                      options={facultyOptions}
                      placeholder="Select an existing Schools"
                    />
                  </div>
                )}
              </div>

              {facultyLoadError ? (
                <p className="rounded-[6px] border border-admin-error-border bg-admin-error-bg px-3 py-2.5 text-sm text-admin-error-text">
                  {facultyLoadError}
                </p>
              ) : null}

              <div className="grid gap-5">
                <div className="md:max-w-[50%]">
                  <PortalInput
                    label="Department Name"
                    value={departmentForm.name}
                    placeholder="e.g. Computer Science"
                    onChange={(event) => handleDepartmentChange("name", event.target.value)}
                  />
                </div>
              </div>

              {departmentLoadError ? (
                <p className="rounded-[6px] border border-admin-error-border bg-admin-error-bg px-3 py-2.5 text-sm text-admin-error-text">
                  {departmentLoadError}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
              <PortalButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Department"}
              </PortalButton>
                <Link to={getAdminDashboardRoute("/general-management/staff")}>
                  <PortalButton variant="gold">
                    Manage Staff
                  </PortalButton>
                </Link>
                <PortalButton variant="outline" onClick={() => resetForm()}>
                  Reset Form
                </PortalButton>
              </div>
            </div>
          </PortalCard>

          <PortalCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[22px] font-bold text-shared-heading">Department Registry</p>
                <p className="mt-1 text-sm text-admin-registry-text">
                  Departments are grouped by faculty so admins can load the right record back into the form.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-[10px] border border-admin-registry-border bg-gradient-to-b from-white to-admin-registry-bg p-4 shadow-[0_18px_35px_rgba(74,25,16,0.05)]">
                    <div className="flex items-center justify-between gap-3">
                      <PortalSkeleton className="h-9 w-44" />
                      <PortalSkeleton className="h-4 w-20" />
                    </div>
                    <div className="mt-4 grid gap-3">
                      <PortalCardSkeleton lines={2} />
                      <PortalCardSkeleton lines={2} />
                    </div>
                  </div>
                ))
              ) : groupedDepartments.length ? (
                groupedDepartments.map((group) => (
                  <div
                    key={group.facultyName}
                    className="rounded-[10px] border border-admin-registry-border bg-gradient-to-b from-white via-analytics-chart-bg to-admin-registry-bg p-4 shadow-[0_18px_40px_rgba(74,25,16,0.06)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-admin-registry-border/70 pb-3">
                      <div className="inline-flex px-1 py-1 text-base font-semibold text-admin-registry-chip-text">
                        {toTitleCase(group.facultyName)}
                      </div>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-admin-registry-count shadow-sm">
                        {group.records.length} department{group.records.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {group.records.map((department) => (
                        <div
                          key={getEntityId(department) || getDepartmentName(department)}
                          className="rounded-[8px] border border-admin-registry-border-alt bg-white px-4 py-3 shadow-[0_10px_24px_rgba(74,25,16,0.04)] transition-colors hover:border-stone-300"
                        >
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-admin-registry-title">
                                {`Department of ${getDepartmentName(department)}`}
                              </p>
                              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-2.5 py-1">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-admin-registry-count">
                                  HOD
                                </span>
                                <span className="text-sm font-semibold text-admin-registry-strong">
                                  {getHodName(department)}
                                </span>
                              </div>
                            </div>

                            <PortalButton
                              variant="outline"
                              className="h-9 rounded-full px-3 text-[10px] shadow-sm"
                              onClick={() => handleOpenAssignHod(department)}
                            >
                              All Staff
                            </PortalButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[8px] border border-dashed border-portal-border-muted bg-admin-registry-bg px-4 py-8 text-center text-sm text-admin-registry-text">
                  No departments loaded yet.
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

      <PortalModal
        open={Boolean(selectedDepartment)}
        onClose={handleCloseAssignHod}
        title={selectedDepartment ? `All Staff: ${getDepartmentName(selectedDepartment)}` : "All Staff"}
        description="Select one staff record from this department, then continue to assign the head of department role."
        className="max-w-3xl"
      >
        <div className="space-y-4">
          {departmentStaffLoadError ? (
            <p className="rounded-[8px] border border-admin-error-border bg-admin-error-bg px-4 py-3 text-sm text-admin-error-text">
              {departmentStaffLoadError}
            </p>
          ) : null}

          {isLoadingDepartmentStaff ? (
            <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <PortalCardSkeleton key={index} lines={2} />
              ))}
            </div>
          ) : departmentStaff.length ? (
            <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
              {departmentStaff.map((member) => {
                const memberId = getEntityId(member)
                const isSelected = String(getEntityId(selectedLecturer)) === String(memberId)

                return (
                  <div
                    key={memberId || getStaffEmail(member)}
                    className={`group w-full rounded-[10px] border px-4 py-4 text-left transition-colors ${
                      isSelected
                        ? "border-portal-brand bg-amber-50"
                        : "border-admin-registry-border bg-admin-registry-bg hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-admin-registry-title">
                          {getStaffName(member)}
                        </p>
                        <p className="mt-1 text-sm text-admin-registry-text">{getStaffEmail(member)}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-admin-registry-count">
                          {getStaffRole(member)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenConfirmAssign(member)}
                        className="inline-flex items-center gap-2 rounded-full border border-portal-brand/70 bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-portal-brand opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 hover:bg-amber-50"
                      >
                        <span className="relative inline-flex h-4 w-7 items-center rounded-full bg-amber-100 p-[2px]">
                          <span className="h-3 w-3 rounded-full bg-portal-brand shadow-sm" />
                        </span>
                        Make HOD
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-[8px] border border-dashed border-portal-border-muted bg-admin-registry-bg px-4 py-8 text-center text-sm text-admin-registry-text">
              No staff were found for this department yet.
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <PortalButton variant="outline" onClick={handleCloseAssignHod}>
              Close
            </PortalButton>
          </div>
        </div>
      </PortalModal>

      <PortalModal
        open={Boolean(confirmCandidate)}
        onClose={handleCloseConfirmAssign}
        title="Confirm HOD Assignment"
        description="Review this action before continuing."
        className="max-w-xl"
      >
        <div className="space-y-5">
          <div className="rounded-[8px] border border-amber-100 bg-amber-50 px-4 py-3">
            <p className="text-sm font-semibold text-admin-registry-title">
              You are about to make {getStaffName(confirmCandidate)} HOD of {selectedDepartment ? getDepartmentName(selectedDepartment) : "-"}.
            </p>
            <p className="mt-1 text-sm text-admin-registry-text">
              Click continue if you want to assign this staff to the department.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <PortalButton
              onClick={handleAssignHod}
              disabled={!selectedLecturer || isAssigningHod}
            >
              {isAssigningHod ? "Assigning..." : "Continue"}
            </PortalButton>
            <PortalButton variant="outline" onClick={handleCloseConfirmAssign}>
              Cancel
            </PortalButton>
          </div>
        </div>
      </PortalModal>
    </>
  )
}

function toTitleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
