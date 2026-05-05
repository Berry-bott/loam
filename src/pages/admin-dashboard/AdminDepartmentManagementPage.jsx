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
      <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8d7969]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="h-12 w-full rounded-[3px] border border-[#efe5d8] bg-[#fffdf9] px-4 text-sm text-[#4d2017] outline-none transition focus:border-[#ccb08e] focus:ring-2 focus:ring-[#ecdcb8] disabled:cursor-not-allowed disabled:bg-[#f5f0ea] disabled:text-[#a39082]"
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
              <Building2 className="h-5 w-5 text-[#8f120d]" />
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Faculty Then Department</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  Follow these steps: 1. create a new faculty or select an existing faculty, 2. choose whether you want a new department or an existing department, 3. enter the department name or select the department record, 4. save the department setup.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <label className="block">
                <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8d7969]">
                  Faculty Source
                </span>
                <div className="grid grid-cols-2 rounded-[4px] bg-[#f2eeea] p-1">
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
                          ? "bg-white text-[#7d1711] shadow-sm"
                          : "text-[#7e6d5e]"
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
                <p className="rounded-[8px] border border-[#ead0cb] bg-[#fff5f4] px-4 py-3 text-sm text-[#9a211b]">
                  {facultyLoadError}
                </p>
              ) : null}

              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8d7969]">
                    Department Source
                  </span>
                  <div className="grid grid-cols-2 rounded-[4px] bg-[#f2eeea] p-1">
                    {[
                      { label: "New Department", value: "new" },
                      { label: "Existing Department", value: "existing" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleDepartmentChange("mode", option.value)}
                        className={`rounded-[3px] px-2 py-3 text-[12px] font-semibold transition-colors ${
                          departmentForm.mode === option.value
                            ? "bg-white text-[#7d1711] shadow-sm"
                            : "text-[#7e6d5e]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </label>

                {departmentForm.mode === "new" ? (
                  <div className="md:max-w-[50%]">
                    <PortalInput
                      label="Department Name"
                      value={departmentForm.name}
                      placeholder="e.g. Computer Science"
                      onChange={(event) => handleDepartmentChange("name", event.target.value)}
                    />
                  </div>
                ) : (
                  <div className="md:max-w-[50%]">
                    <SelectField
                      label="Existing Department"
                      value={departmentForm.existingDepartmentId}
                      onChange={(value) => handleDepartmentChange("existingDepartmentId", value)}
                      options={filteredDepartmentOptions}
                      placeholder={
                        activeFacultyId
                          ? "Select an existing department"
                          : "Select a faculty first"
                      }
                      disabled={!activeFacultyId}
                    />
                  </div>
                )}
              </div>

              {departmentLoadError ? (
                <p className="rounded-[8px] border border-[#ead0cb] bg-[#fff5f4] px-4 py-3 text-sm text-[#9a211b]">
                  {departmentLoadError}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <PortalButton onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Department"}
                </PortalButton>
                <PortalButton variant="outline" onClick={() => resetForm()}>
                  Reset Form
                </PortalButton>
              </div>
            </div>
          </PortalCard>

          <PortalCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Department Registry</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  Departments are grouped by faculty so admins can load the right record back into the form.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {isLoading ? (
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
                  Loading faculties and departments...
                </div>
              ) : groupedDepartments.length ? (
                groupedDepartments.map((group) => (
                  <div key={group.facultyName} className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex rounded-[8px] bg-[#fbebe7] px-3 py-2 text-sm font-semibold text-[#9b1810]">
                        {group.facultyName}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a18f80]">
                        {group.records.length} department{group.records.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {group.records.map((department) => (
                        <div
                          key={getEntityId(department) || getDepartmentName(department)}
                          className="rounded-[8px] border border-[#f0e5d8] bg-white px-4 py-3"
                        >
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-[#551f16]">
                                {getDepartmentName(department)}
                              </p>
                              <p className="mt-1 text-xs text-[#8d7969]">
                                HOD:{" "}
                                <span className="font-semibold text-[#5b2318]">
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
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
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
