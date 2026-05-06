import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, Building2, RefreshCcw } from "lucide-react"
import { Link } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalDropdown } from "../../components/portal/PortalDropdown"
import { PortalInput } from "../../components/portal/PortalInput"
import { PortalToast } from "../../components/portal/PortalToast"
import { PageEyebrow, PageTitle } from "../../components/admin-shared/Shared"
import {
  createDepartment,
  createFaculty,
  getAllDepartments,
  getAllFaculties,
} from "../../store/admin/adminApi"
import {
  getDepartmentName,
  getEntityId,
  getFacultyCode,
  getFacultyName,
  getHodName,
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
  const [facultyLoadError, setFacultyLoadError] = useState("")
  const [departmentLoadError, setDepartmentLoadError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [departmentForm, setDepartmentForm] = useState(defaultDepartmentForm)

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

  const filteredDepartmentOptions = useMemo(() => {
    return departments
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
  }, [activeFacultyId, departments, faculties])

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

  const resetForm = (overrides = {}) => {
    setDepartmentForm({ ...defaultDepartmentForm, ...overrides })
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
      throw new Error("Faculty name is required.")
    }

    if (!trimmedFacultyCode) {
      throw new Error("Faculty code is required.")
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

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="Department Management"
          description="Create a faculty or choose an existing one first. After faculty is resolved, create a new department or load an existing department under that faculty."
          actions={
            <div className="flex items-center gap-2">
              <Link to="/admin-dashboard/general-management">
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

        <div className="grid gap-24">
          <PortalCard>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-portal-brand" />
              <div>
                <p className="text-[22px] font-bold text-shared-heading">Faculty Then Department</p>
                <p className="mt-1 text-sm text-admin-registry-text">
                  Follow these steps: 1. create a new faculty or select an existing faculty, 2. choose whether you want a new department or an existing department, 3. enter the department name or select the department record, 4. save the department setup.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <label className="block">
                <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-admin-field-label">
                  Faculty Source
                </span>
                <div className="grid grid-cols-2 rounded-[4px] bg-admin-tab-bg p-1">
                  {[
                    { label: "Choose Existing", value: "existing" },
                    { label: "Create Faculty", value: "new" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleDepartmentChange("facultyMode", option.value)}
                      className={`rounded-[3px] px-2 py-3 text-[12px] font-semibold transition-colors ${
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
                      label="Faculty Name"
                      value={departmentForm.facultyName}
                      placeholder="e.g. Faculty of Computing"
                      onChange={(event) => handleDepartmentChange("facultyName", event.target.value)}
                    />
                    <PortalInput
                      label="Faculty Code"
                      value={departmentForm.facultyCode}
                      placeholder="e.g. CO"
                      onChange={(event) => handleDepartmentChange("facultyCode", event.target.value.toUpperCase())}
                    />
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <SelectField
                      label="Existing Faculty"
                      value={departmentForm.selectedFacultyId}
                      onChange={(value) => handleDepartmentChange("selectedFacultyId", value)}
                      options={facultyOptions}
                      placeholder="Select an existing faculty"
                    />
                  </div>
                )}
              </div>

              {facultyLoadError ? (
                <p className="rounded-[8px] border border-admin-error-border bg-admin-error-bg px-4 py-3 text-sm text-admin-error-text">
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
                <p className="rounded-[8px] border border-admin-error-border bg-admin-error-bg px-4 py-3 text-sm text-admin-error-text">
                  {departmentLoadError}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <PortalButton onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Department"}
                </PortalButton>
                <Link to="/admin-dashboard/general-management/staff">
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
                <div className="rounded-[10px] border border-dashed border-portal-border-muted bg-admin-registry-bg px-6 py-10 text-center text-sm text-admin-registry-text">
                  Loading faculties and departments...
                </div>
              ) : groupedDepartments.length ? (
                groupedDepartments.map((group) => (
                  <div key={group.facultyName} className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex rounded-[8px] bg-admin-registry-chip-bg px-3 py-2 text-sm font-semibold text-admin-registry-chip-text">
                        {group.facultyName}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-admin-registry-count">
                        {group.records.length} department{group.records.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {group.records.map((department) => (
                        <div
                          key={getEntityId(department) || getDepartmentName(department)}
                          className="rounded-[8px] border border-admin-registry-border-alt bg-white px-4 py-3"
                        >
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-admin-registry-title">
                                {getDepartmentName(department)}
                              </p>
                              <p className="mt-1 text-xs text-admin-registry-text">
                                HOD:{" "}
                                <span className="font-semibold text-admin-registry-strong">
                                  {getHodName(department)}
                                </span>
                              </p>
                            </div>

                            <PortalDropdown
                              label="Department Actions"
                              triggerClassName="h-9 px-3 text-[10px]"
                              items={[
                                {
                                  label: "Load Into Form",
                                  onClick: () =>
                                    resetForm({
                                      facultyMode: "existing",
                                      selectedFacultyId:
                                        department?.faculty?.id ||
                                        department?.faculty?._id ||
                                        department?.facultyId ||
                                        "",
                                      mode: "existing",
                                      existingDepartmentId: getEntityId(department),
                                    }),
                                },
                              ]}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[10px] border border-dashed border-portal-border-muted bg-admin-registry-bg px-6 py-10 text-center text-sm text-admin-registry-text">
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
    </>
  )
}
