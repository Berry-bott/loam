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
  assignHod,
  createDepartment,
  getAllDepartments,
} from "../../store/admin/adminApi"
import {
  facultyOptions,
  getDepartmentName,
  getEntityId,
  getFacultyName,
  getHodName,
  resolveArray,
} from "./adminManagementUtils"

const defaultDepartmentForm = {
  mode: "new",
  facultyName: facultyOptions[0],
  name: "",
  existingDepartmentId: "",
  hodInput: "",
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

export default function AdminDepartmentManagementPage() {
  const [toastMessage, setToastMessage] = useState("")
  const [departments, setDepartments] = useState([])
  const [departmentLoadError, setDepartmentLoadError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [departmentForm, setDepartmentForm] = useState(defaultDepartmentForm)

  const filteredDepartmentOptions = useMemo(() => {
    return departments
      .filter((department) => {
        const hasFacultyMetadata = Boolean(
          department?.faculty?.name ||
            department?.facultyName ||
            department?.school?.name ||
            department?.schoolName,
        )

        if (!hasFacultyMetadata) {
          return true
        }

        return getFacultyName(department) === departmentForm.facultyName
      })
      .map((department) => ({
        value: getEntityId(department),
        label: getDepartmentName(department),
      }))
  }, [departments, departmentForm.facultyName])

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

  const loadDepartmentData = async () => {
    setIsLoading(true)
    setDepartmentLoadError("")

    try {
      const departmentResult = await getAllDepartments()

      setDepartments(resolveArray(departmentResult))
    } catch (error) {
      setDepartments([])
      setDepartmentLoadError(error.message || "Unable to load departments right now.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDepartmentData()
  }, [])

  const resetForm = (overrides = {}) => {
    setDepartmentForm({ ...defaultDepartmentForm, ...overrides })
  }

  const handleDepartmentChange = (field, value) => {
    setDepartmentForm((current) => {
      const next = { ...current, [field]: value }
      if (field === "facultyName") next.existingDepartmentId = ""
      return next
    })
  }

  const handleSubmit = async () => {
    if (isSubmitting) return

    const isNewDepartment = departmentForm.mode === "new"
    const trimmedName = departmentForm.name.trim()

    if (!departmentForm.facultyName) {
      setToastMessage("Choose a faculty or school first.")
      return
    }

    if (isNewDepartment && !trimmedName) {
      setToastMessage("Department name is required.")
      return
    }

    if (!isNewDepartment && !departmentForm.existingDepartmentId) {
      setToastMessage("Choose an existing department first.")
      return
    }

    setIsSubmitting(true)

    try {
      let targetDepartmentId = departmentForm.existingDepartmentId
      let targetDepartmentName = trimmedName

      if (isNewDepartment) {
        const payload = await createDepartment({ name: trimmedName })
        const createdDepartment = payload?.data?.department || payload?.data || null

        targetDepartmentId =
          payload?.data?.id ||
          getEntityId(createdDepartment)

        targetDepartmentName =
          payload?.data?.name ||
          getDepartmentName(createdDepartment) ||
          trimmedName
      }

      if (departmentForm.hodInput.trim() && targetDepartmentId) {
        await assignHod({
          departmentId: targetDepartmentId,
          newHodUserId: departmentForm.hodInput.trim(),
        })
      }

      await loadDepartmentData()
      resetForm({ facultyName: departmentForm.facultyName })
      setToastMessage(
        isNewDepartment
          ? `${targetDepartmentName} saved successfully.`
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
          description="Choose the faculty first, then create a department or work with an existing one. HOD assignment is handled from the same page with a direct input field."
          actions={
            < >
            <div className="flex items-center gap-2">

              <Link to="/admin-dashboard/general-management">
                <PortalButton variant="outline">
                  <ArrowLeft className="h-4 w-4" />
                  Back 
                </PortalButton>
              </Link>

              <PortalButton variant="outline" onClick={loadDepartmentData}>
                <RefreshCcw className="h-4 w-4" />
                 
              </PortalButton>
            </div>

            </>
          }
        />

        <div className="grid gap-24 ">
          <PortalCard>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-[#8f120d]" />
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Save Department</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  Faculty comes first. Then choose whether to create a new department or load an existing one.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <SelectField
                label="Faculty / School"
                value={departmentForm.facultyName}
                onChange={(value) => handleDepartmentChange("facultyName", value)}
                options={facultyOptions}
              />

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
                <PortalInput
                  label="Department Name"
                  value={departmentForm.name}
                  placeholder="e.g. Computer Science"
                  onChange={(event) => handleDepartmentChange("name", event.target.value)}
                />
              ) : (
                <SelectField
                  label="Existing Department"
                  value={departmentForm.existingDepartmentId}
                  onChange={(value) => handleDepartmentChange("existingDepartmentId", value)}
                  options={filteredDepartmentOptions}
                  placeholder="Select an existing department"
                />
              )}

              <PortalInput
                label="Assign HOD User ID"
                value={departmentForm.hodInput}
                placeholder="Enter the exact user ID for the HOD"
                hint="The backend requires `newHodUserId`. Get this ID from staff records, then paste it here."
                onChange={(event) => handleDepartmentChange("hodInput", event.target.value)}
              />
            </div>

            {departmentLoadError ? (
              <p className="mt-4 rounded-[8px] border border-[#ead0cb] bg-[#fff5f4] px-4 py-3 text-sm text-[#9a211b]">
                {departmentLoadError}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <PortalButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Department"}
              </PortalButton>
              <PortalButton
                variant="outline"
                onClick={() => resetForm({ facultyName: departmentForm.facultyName })}
              >
                Reset Form
              </PortalButton>
            </div>
          </PortalCard>

          <PortalCard>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[22px] font-bold text-[#4f1d14]">Department Registry</p>
                <p className="mt-1 text-sm text-[#8b7969]">
                  Use the registry to load an existing department back into the form before assigning a HOD.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {isLoading ? (
                <div className="rounded-[10px] border border-dashed border-[#ddcdb8] bg-[#fffdfa] px-6 py-10 text-center text-sm text-[#8b7969]">
                  Loading departments...
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
                                      mode: "existing",
                                      facultyName: getFacultyName(department),
                                      existingDepartmentId: getEntityId(department),
                                      hodInput:
                                        getHodName(department) === "Unassigned"
                                          ? ""
                                          : getHodName(department),
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
