import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, CheckCircle2, Ellipsis, RefreshCcw, UserCog, UsersRound, X } from "lucide-react"
import { Link } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"
import { PortalCardSkeleton, PortalSkeleton } from "../../components/portal/PortalSkeleton"
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
} from "../../components/admin-shared/adminManagementUtils"

function getStaffProfile(item) {
  return item?.staffProfile || item?.profile || {}
}

function getStaffTitle(item) {
  return getStaffProfile(item)?.title || item?.title || ""
}

function getStaffFirstName(item) {
  return getStaffProfile(item)?.firstName || item?.firstName || ""
}

function getStaffMiddleName(item) {
  return getStaffProfile(item)?.middleName || item?.middleName || ""
}

function getStaffLastName(item) {
  return getStaffProfile(item)?.lastName || item?.lastName || ""
}

function getStaffPhoneNumber(item) {
  return getStaffProfile(item)?.phoneNumber || item?.phoneNumber || ""
}

function getStaffQualification(item) {
  return getStaffProfile(item)?.qualification || item?.qualification || ""
}

function getStaffYearOfEmployment(item) {
  return getStaffProfile(item)?.yearOfEmployment || item?.yearOfEmployment || ""
}

function shouldShowDepartmentForStaff(item) {
  const role = String(getStaffRole(item)).toUpperCase()
  return !["ADMISSIONS_OFFICER", "BURSARY_OFFICER"].includes(role)
}

function resolveStaffDepartmentName(item, departments) {
  const directDepartmentName =
    item?.department?.name ||
    item?.departmentName ||
    item?.department?.title ||
    item?.lecturer?.department?.name ||
    item?.hod?.department?.name ||
    item?.profile?.departmentName ||
    item?.staffProfile?.departmentName

  if (directDepartmentName) return directDepartmentName

  const departmentId = String(
    item?.departmentId ||
    item?.department?.id ||
    item?.department?._id ||
    item?.lecturer?.departmentId ||
    item?.hod?.departmentId ||
    item?.lecturer?.department?.id ||
    item?.lecturer?.department?._id ||
    item?.hod?.department?.id ||
    item?.hod?.department?._id ||
    item?.profile?.departmentId ||
    item?.staffProfile?.departmentId ||
    "",
  )

  if (!departmentId) return "Unassigned"

  const matchedDepartment = departments.find(
    (department) => String(getEntityId(department)) === departmentId,
  )

  return matchedDepartment ? getDepartmentName(matchedDepartment) : "Unassigned"
}

const STAFF_TYPE_OPTIONS = [
  { label: "Academic Staff", value: "academic" },
  { label: "Administrative Staff", value: "administrative" },
]

const TITLE_OPTIONS = ["MR", "MRS", "MISS", "DR", "PROF"]
const GENDER_OPTIONS = ["MALE", "FEMALE"]
const MARITAL_STATUS_OPTIONS = ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]
const ACADEMIC_ROLE_OPTIONS = [
  { label: "Lecturer", value: "LECTURER" },
]
const ADMIN_ROLE_OPTIONS = [
  { label: "Admissions Officer", value: "ADMISSIONS_OFFICER" },
  { label: "Bursary Officer", value: "BURSARY_OFFICER" },
]

const defaultStaffForm = {
  staffType: "academic",
  email: "",
  role: "LECTURER",
  departmentId: "",
  title: "DR",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "MALE",
  maritalStatus: "MARRIED",
  phoneNumber: "",
  alternatePhone: "",
  personalEmail: "",
  nationality: "Nigerian",
  stateOfOrigin: "",
  lga: "",
  residentialAddress: "",
  permanentAddress: "",
  qualification: "",
  specialization: "",
  yearOfEmployment: "",
  nextOfKinName: "",
  nextOfKinPhone: "",
  nextOfKinRelationship: "",
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
        {placeholder ? <option value="">{placeholder}</option> : null}
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
    <section className={`rounded-[10px] border p-4 shadow-[0_18px_38px_rgba(74,25,16,0.05)] ${toneClasses}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-portal-brand shadow-sm">
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

function FormGroup({ title, hint, children, className = "" }) {
  return (
    <div className={`rounded-[10px] border border-admin-registry-border bg-white p-4 ${className}`}>
      <div className="mb-4">
        <p className="text-sm font-semibold text-shared-heading">{title}</p>
        {hint ? <p className="mt-1 text-xs text-admin-registry-text">{hint}</p> : null}
      </div>
      <div className="grid gap-5">{children}</div>
    </div>
  )
}

function DetailField({ label, value }) {
  return (
    <div className="border-b border-admin-registry-border py-3 last:border-b-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-staff-meta-soft">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-staff-name break-words">
        {value || "-"}
      </p>
    </div>
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
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [staffFilter, setStaffFilter] = useState("all")
  const [staffDepartmentFilter, setStaffDepartmentFilter] = useState("all")
  const [departmentFilterMenuOpen, setDepartmentFilterMenuOpen] = useState(false)
  const [togglingStaffIds, setTogglingStaffIds] = useState([])
  const [staffForm, setStaffForm] = useState(defaultStaffForm)
  const departmentFilterMenuRef = useRef(null)

  const departmentOptions = useMemo(
    () =>
      departments.map((department) => ({
        value: getEntityId(department),
        label: `${getFacultyName(department)} - ${getDepartmentName(department)}`,
      })),
    [departments],
  )

  const staffDepartmentFilterOptions = useMemo(
    () => [
      { value: "all", label: "All Departments" },
      ...departments.map((department) => ({
        value: String(getEntityId(department)),
        label: getDepartmentName(department),
      })),
    ],
    [departments],
  )

  const selectedStaff = useMemo(
    () => staff.find((member) => String(getEntityId(member)) === String(selectedStaffId)) || null,
    [selectedStaffId, staff],
  )

  const filteredStaff = useMemo(() => {
    const filteredByType =
      staffFilter === "all"
        ? staff
        : staff.filter((member) => {
            const role = String(getStaffRole(member)).toUpperCase()
            const academicRoles = ["LECTURER", "HOD"]
            const administrativeRoles = ["ADMISSIONS_OFFICER", "BURSARY_OFFICER", "REGISTRAR", "ADMIN", "STAFF", "SUPER_ADMIN"]

            return staffFilter === "academic"
              ? academicRoles.includes(role)
              : administrativeRoles.includes(role)
          })

    if (staffDepartmentFilter === "all") return filteredByType

    return filteredByType.filter((member) => {
      const departmentId = String(
        member?.departmentId ||
        member?.department?.id ||
        member?.department?._id ||
        member?.lecturer?.departmentId ||
        member?.hod?.departmentId ||
        member?.lecturer?.department?.id ||
        member?.lecturer?.department?._id ||
        member?.hod?.department?.id ||
        member?.hod?.department?._id ||
        member?.profile?.departmentId ||
        member?.staffProfile?.departmentId ||
        "",
      )

      if (departmentId) {
        return departmentId === String(staffDepartmentFilter)
      }

      const matchedDepartment = departments.find(
        (department) =>
          getDepartmentName(department).toLowerCase() === resolveStaffDepartmentName(member, departments).toLowerCase(),
      )

      return matchedDepartment
        ? String(getEntityId(matchedDepartment)) === String(staffDepartmentFilter)
        : false
    })
  }, [departments, staff, staffDepartmentFilter, staffFilter])

  useEffect(() => {
    if (!departmentFilterMenuOpen) return

    function handleOutsideClick(event) {
      if (departmentFilterMenuRef.current && !departmentFilterMenuRef.current.contains(event.target)) {
        setDepartmentFilterMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [departmentFilterMenuOpen])

  const selectedDepartmentFilterLabel = useMemo(() => {
    return (
      staffDepartmentFilterOptions.find((option) => option.value === staffDepartmentFilter)?.label ||
      "All Departments"
    )
  }, [staffDepartmentFilter, staffDepartmentFilterOptions])

  const selectedStaffDisplayName = useMemo(() => {
    if (!selectedStaff) return ""

    const title = getStaffTitle(selectedStaff)?.trim?.() || ""
    const firstName = getStaffFirstName(selectedStaff)?.trim?.() || ""
    const lastName = getStaffLastName(selectedStaff)?.trim?.() || ""
    const constructedName = [title, firstName, lastName].filter(Boolean).join(" ")

    return constructedName || getStaffName(selectedStaff)
  }, [selectedStaff])

  const isAcademicStaff = staffForm.staffType === "academic"
  const roleOptions = isAcademicStaff ? ACADEMIC_ROLE_OPTIONS : ADMIN_ROLE_OPTIONS

  const loadDepartments = async () => {
    setIsLoadingDepartments(true)
    setDepartmentLoadError("")

    try {
      const payload = await getAllDepartments()
      setDepartments(resolveArray(payload))
    } catch (error) {
      setDepartments([])
      setDepartmentLoadError(
        error.message || "Unable to load departments right now.",
      )
    } finally {
      setIsLoadingDepartments(false)
    }
  }

  const loadStaffData = async () => {
    setIsLoading(true)
    setStaffLoadError("")

    try {
      const staffPayload = await getAllStaff()
      const resolvedStaff = resolveArray(staffPayload)
      setStaff(resolvedStaff)
      setSelectedStaffId((current) =>
        current && resolvedStaff.some((member) => String(getEntityId(member)) === String(current))
          ? current
          : "",
      )
    } catch (error) {
      setStaff([])
      setSelectedStaffId("")
      setStaffLoadError(
        error.message || "Unable to load staff records right now.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStaffData()
  }, [])

  useEffect(() => {
    if (!isAcademicStaff || departments.length || isLoadingDepartments) return
    loadDepartments()
  }, [departments.length, isAcademicStaff, isLoadingDepartments])

  const handleStaffChange = (field, value) => {
    setStaffForm((current) => {
      const next = { ...current, [field]: value }

      if (field === "staffType") {
        next.role = value === "academic" ? "LECTURER" : "ADMISSIONS_OFFICER"
        if (value !== "academic") {
          next.departmentId = ""
        }
      }

      return next
    })
  }

  const resetForm = () => {
    setStaffForm(defaultStaffForm)
  }

  const handleSubmit = async () => {
    if (isSubmitting) return

    const normalizedEmail = staffForm.email.trim().toLowerCase()
    const normalizedPersonalEmail = staffForm.personalEmail.trim().toLowerCase()

    if (!normalizedEmail) {
      setToastMessage("Staff email is required.")
      return
    }

    if (!staffForm.role) {
      setToastMessage("Staff role is required.")
      return
    }

    if (isAcademicStaff && !staffForm.departmentId) {
      setToastMessage("Select the department the academic staff belongs to.")
      return
    }

    if (!staffForm.firstName.trim() || !staffForm.lastName.trim()) {
      setToastMessage("First name and last name are required.")
      return
    }

    if (!staffForm.dateOfBirth) {
      setToastMessage("Date of birth is required.")
      return
    }

    if (!staffForm.phoneNumber.trim()) {
      setToastMessage("Phone number is required.")
      return
    }

    if (!normalizedPersonalEmail) {
      setToastMessage("Personal email is required.")
      return
    }

    if (!staffForm.qualification.trim() || !staffForm.specialization.trim()) {
      setToastMessage("Qualification and specialization are required.")
      return
    }

    if (!staffForm.yearOfEmployment) {
      setToastMessage("Year of employment is required.")
      return
    }

    if (!staffForm.nextOfKinName.trim() || !staffForm.nextOfKinPhone.trim() || !staffForm.nextOfKinRelationship.trim()) {
      setToastMessage("Complete the next of kin section before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        email: normalizedEmail,
        role: staffForm.role,
        ...(isAcademicStaff ? { departmentId: staffForm.departmentId } : {}),
        title: staffForm.title,
        firstName: staffForm.firstName.trim(),
        middleName: staffForm.middleName.trim(),
        lastName: staffForm.lastName.trim(),
        dateOfBirth: staffForm.dateOfBirth,
        gender: staffForm.gender,
        maritalStatus: staffForm.maritalStatus,
        phoneNumber: staffForm.phoneNumber.trim(),
        alternatePhone: staffForm.alternatePhone.trim(),
        personalEmail: normalizedPersonalEmail,
        nationality: staffForm.nationality.trim(),
        stateOfOrigin: staffForm.stateOfOrigin.trim(),
        lga: staffForm.lga.trim(),
        residentialAddress: staffForm.residentialAddress.trim(),
        permanentAddress: staffForm.permanentAddress.trim(),
        qualification: staffForm.qualification.trim(),
        specialization: staffForm.specialization.trim(),
        yearOfEmployment: Number(staffForm.yearOfEmployment),
        nextOfKinName: staffForm.nextOfKinName.trim(),
        nextOfKinPhone: staffForm.nextOfKinPhone.trim(),
        nextOfKinRelationship: staffForm.nextOfKinRelationship.trim(),
      }

      await createStaff(payload)

      await loadStaffData()
      resetForm()
      setToastMessage(`${normalizedEmail} created successfully.`)
    } catch (error) {
      setToastMessage(error.message || "Unable to create staff right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleStatus = async (staffRecord) => {
    const staffId = getEntityId(staffRecord)
    if (!staffId) return

    const nextIsActive = !(staffRecord?.isActive === true)

    setTogglingStaffIds((current) => [...current, staffId])

    try {
      await toggleStaffStatus(staffId, nextIsActive)
      setStaff((current) =>
        current.map((member) =>
          String(getEntityId(member)) === String(staffId)
            ? { ...member, isActive: nextIsActive, status: nextIsActive ? "Active" : "Inactive" }
            : member,
        ),
      )
      setToastMessage("Staff status updated successfully.")
    } catch (error) {
      setToastMessage(error.message || "Unable to update staff status right now.")
    } finally {
      setTogglingStaffIds((current) => current.filter((id) => String(id) !== String(staffId)))
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
          description="Choose the staff type first, then fill the right form for either academic or administrative staff creation."
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
            description="Pick the staff category first. Academic staff requires a department, while administrative staff uses administrative role options."
          >
            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                <FormGroup
                  title="1. Choose Staff Type"
                  hint="Select the kind of staff account the admin wants to create."
                >
                  <div>
                    <p className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-admin-field-label">
                      Staff Category
                    </p>
                    <div className="grid grid-cols-2 rounded-[6px] bg-admin-tab-bg p-1">
                      {STAFF_TYPE_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleStaffChange("staffType", option.value)}
                          className={`rounded-[5px] px-3 py-3 text-[12px] font-semibold transition-colors ${
                            staffForm.staffType === option.value
                              ? "bg-white text-admin-tab-active-text shadow-sm"
                              : "text-admin-tab-inactive-text"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </FormGroup>

                <div className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-admin-registry-count">
                    Current Mode
                  </p>
                  <p className="mt-3 text-lg font-semibold text-admin-registry-title">
                    {isAcademicStaff ? "Academic Staff" : "Administrative Staff"}
                  </p>
                  <p className="mt-2 text-sm text-admin-registry-text">
                    {isAcademicStaff
                      ? "This form will require a department and academic role."
                      : "This form uses administrative roles and does not require a department."}
                  </p>
                </div>
              </div>

              <FormGroup
                title="2. Account Setup"
                hint="Start with the institutional account details for the new staff member."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <PortalInput
                    label="Institutional Email"
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
                    placeholder=""
                  />
                </div>

                {isAcademicStaff ? (
                  <div className="md:max-w-[50%]">
                    <SelectField
                      label="Department"
                      value={staffForm.departmentId}
                      onChange={(value) => handleStaffChange("departmentId", value)}
                      options={departmentOptions}
                      placeholder="Select the department for this staff"
                    />
                  </div>
                ) : null}
              </FormGroup>

              <FormGroup
                title="3. Personal Information"
                hint="Fill the staff member's identity, contact, and residential details."
              >
                <div className="grid gap-5 md:grid-cols-3">
                  <SelectField
                    label="Title"
                    value={staffForm.title}
                    onChange={(value) => handleStaffChange("title", value)}
                    options={TITLE_OPTIONS}
                    placeholder=""
                  />
                  <PortalInput
                    label="First Name"
                    value={staffForm.firstName}
                    onChange={(event) => handleStaffChange("firstName", event.target.value)}
                  />
                  <PortalInput
                    label="Middle Name"
                    value={staffForm.middleName}
                    onChange={(event) => handleStaffChange("middleName", event.target.value)}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <PortalInput
                    label="Last Name"
                    value={staffForm.lastName}
                    onChange={(event) => handleStaffChange("lastName", event.target.value)}
                  />
                  <PortalInput
                    label="Date of Birth"
                    type="date"
                    value={staffForm.dateOfBirth}
                    onChange={(event) => handleStaffChange("dateOfBirth", event.target.value)}
                  />
                  <SelectField
                    label="Gender"
                    value={staffForm.gender}
                    onChange={(value) => handleStaffChange("gender", value)}
                    options={GENDER_OPTIONS}
                    placeholder=""
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <SelectField
                    label="Marital Status"
                    value={staffForm.maritalStatus}
                    onChange={(value) => handleStaffChange("maritalStatus", value)}
                    options={MARITAL_STATUS_OPTIONS}
                    placeholder=""
                  />
                  <PortalInput
                    label="Phone Number"
                    value={staffForm.phoneNumber}
                    onChange={(event) => handleStaffChange("phoneNumber", event.target.value)}
                  />
                  <PortalInput
                    label="Alternate Phone"
                    value={staffForm.alternatePhone}
                    onChange={(event) => handleStaffChange("alternatePhone", event.target.value)}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <PortalInput
                    label="Personal Email"
                    type="email"
                    value={staffForm.personalEmail}
                    onChange={(event) => handleStaffChange("personalEmail", event.target.value)}
                  />
                  <PortalInput
                    label="Nationality"
                    value={staffForm.nationality}
                    onChange={(event) => handleStaffChange("nationality", event.target.value)}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <PortalInput
                    label="State of Origin"
                    value={staffForm.stateOfOrigin}
                    onChange={(event) => handleStaffChange("stateOfOrigin", event.target.value)}
                  />
                  <PortalInput
                    label="LGA"
                    value={staffForm.lga}
                    onChange={(event) => handleStaffChange("lga", event.target.value)}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <PortalInput
                    label="Residential Address"
                    value={staffForm.residentialAddress}
                    onChange={(event) => handleStaffChange("residentialAddress", event.target.value)}
                  />
                  <PortalInput
                    label="Permanent Address"
                    value={staffForm.permanentAddress}
                    onChange={(event) => handleStaffChange("permanentAddress", event.target.value)}
                  />
                </div>
              </FormGroup>

              <div className="grid gap-5 xl:grid-cols-2">
                <FormGroup
                  title="4. Employment Details"
                  hint="Capture the staff member's qualification and work profile."
                >
                  <PortalInput
                    label="Qualification"
                    value={staffForm.qualification}
                    onChange={(event) => handleStaffChange("qualification", event.target.value)}
                  />
                  <PortalInput
                    label="Specialization"
                    value={staffForm.specialization}
                    onChange={(event) => handleStaffChange("specialization", event.target.value)}
                  />
                  <PortalInput
                    label="Year of Employment"
                    type="number"
                    value={staffForm.yearOfEmployment}
                    onChange={(event) => handleStaffChange("yearOfEmployment", event.target.value)}
                  />
                </FormGroup>

                <FormGroup
                  title="5. Next of Kin"
                  hint="Add the emergency contact details for internal records."
                >
                  <PortalInput
                    label="Next of Kin Name"
                    value={staffForm.nextOfKinName}
                    onChange={(event) => handleStaffChange("nextOfKinName", event.target.value)}
                  />
                  <PortalInput
                    label="Next of Kin Phone"
                    value={staffForm.nextOfKinPhone}
                    onChange={(event) => handleStaffChange("nextOfKinPhone", event.target.value)}
                  />
                  <PortalInput
                    label="Relationship"
                    value={staffForm.nextOfKinRelationship}
                    onChange={(event) => handleStaffChange("nextOfKinRelationship", event.target.value)}
                  />
                </FormGroup>
              </div>
            </div>

            {departmentLoadError && isAcademicStaff ? (
              <p className="mt-4 rounded-[6px] border border-admin-error-border bg-admin-error-bg px-3 py-2.5 text-sm text-admin-error-text">
                {departmentLoadError}
              </p>
            ) : null}

            {isLoadingDepartments && isAcademicStaff ? (
              <p className="mt-4 text-sm text-admin-registry-text">
                Loading departments...
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <PortalButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : `Create ${isAcademicStaff ? "Academic" : "Administrative"} Staff`}
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

            <div className="rounded-[10px] border border-staff-list-border bg-white p-2">
                <div className="flex flex-wrap items-center justify-between gap-3 px-1.5 pb-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-staff-list-label">
                    Staff Registry
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex rounded-[8px] bg-admin-tab-bg p-1">
                      {[
                        { label: "All", value: "all" },
                        { label: "Academic", value: "academic" },
                        { label: "Administrative", value: "administrative" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setStaffFilter(option.value)}
                          className={`rounded-[6px] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                            staffFilter === option.value
                              ? "bg-white text-admin-tab-active-text shadow-sm"
                              : "text-admin-tab-inactive-text"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative" ref={departmentFilterMenuRef}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!departments.length && !isLoadingDepartments) {
                            loadDepartments()
                          }
                          setDepartmentFilterMenuOpen((current) => !current)
                        }}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-[8px] border bg-white text-admin-tab-inactive-text transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-staff-hover-border hover:text-admin-tab-active-text ${
                          departmentFilterMenuOpen
                            ? "border-staff-hover-border text-admin-tab-active-text shadow-[0_10px_20px_rgba(74,25,16,0.10)]"
                            : "border-admin-registry-border"
                        }`}
                        aria-label="Filter staff by department"
                      >
                        <Ellipsis className={`h-4 w-4 transition-transform duration-200 ${departmentFilterMenuOpen ? "scale-110" : ""}`} />
                      </button>

                      {departmentFilterMenuOpen ? (
                        <div className="absolute right-0 top-11 z-20 w-64 origin-top-right rounded-[10px] border border-admin-registry-border bg-white p-2 shadow-[0_18px_40px_rgba(74,25,16,0.12)] transition-all duration-200 ease-out animate-[staffFilterMenuIn_180ms_ease-out]">
                          <div className="border-b border-admin-registry-border px-2 pb-2">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-staff-list-label">
                              Filter By Department
                            </p>
                            <p className="mt-1 text-xs text-admin-registry-text">
                              {selectedDepartmentFilterLabel}
                            </p>
                          </div>

                          <div className="mt-2 max-h-64 overflow-y-auto">
                            {isLoadingDepartments ? (
                              <p className="px-2 py-3 text-sm text-admin-registry-text">Loading departments...</p>
                            ) : (
                              staffDepartmentFilterOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setStaffDepartmentFilter(option.value)
                                    setDepartmentFilterMenuOpen(false)
                                  }}
                                  className={`flex w-full items-center justify-between rounded-[8px] px-2 py-2 text-left text-sm transition-all duration-150 ${
                                    staffDepartmentFilter === option.value
                                      ? "bg-admin-tab-bg text-admin-tab-active-text"
                                      : "text-admin-registry-title hover:bg-admin-registry-bg hover:translate-x-[2px]"
                                  }`}
                                >
                                  <span>{option.label}</span>
                                  {staffDepartmentFilter === option.value ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                  ) : null}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-[8px] border border-admin-registry-border bg-admin-registry-bg px-3 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1 space-y-3">
                            <PortalSkeleton className="h-6 w-20 rounded-full" />
                            <PortalSkeleton className="h-5 w-56" />
                            <PortalSkeleton className="h-4 w-48" />
                            <PortalSkeleton className="h-4 w-36" />
                          </div>
                          <PortalSkeleton className="h-7 w-12 rounded-full" />
                        </div>
                      </div>
                    ))
                  ) : filteredStaff.length ? (
                    filteredStaff.map((member) => {
                      const staffId = getEntityId(member)
                      const isSelected = String(staffId) === String(selectedStaffId)
                      const isToggling = togglingStaffIds.some((id) => String(id) === String(staffId))

                      return (
                        <button
                          key={staffId || getStaffEmail(member)}
                          type="button"
                          onClick={() => setSelectedStaffId(staffId)}
                        className={`w-full rounded-[8px] border px-2.5 py-2.5 text-left transition-colors ${
                            isSelected
                              ? "border-staff-selected-border bg-staff-selected-bg"
                              : "border-admin-registry-border bg-admin-registry-bg hover:border-staff-hover-border"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-center justify-between gap-3">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                                    member?.isActive === true
                                      ? "bg-portal-status-success-soft-bg text-portal-status-success-soft-text"
                                      : "bg-portal-status-danger-bg text-portal-status-danger-text"
                                  }`}
                                >
                                  {member?.isActive === true ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-staff-name">
                                {[getStaffTitle(member), getStaffFirstName(member), getStaffLastName(member)].filter(Boolean).join(" ") || getStaffName(member)}
                              </p>
                              <p className="mt-1 text-sm text-staff-meta">{getStaffEmail(member)}</p>
                              {shouldShowDepartmentForStaff(member) ? (
                                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-staff-meta-soft">
                                  Department: {resolveStaffDepartmentName(member, departments)}
                                </p>
                              ) : null}
                              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-staff-meta-soft">
                                {getStaffRole(member)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  handleToggleStatus(member)
                                }}
                                disabled={isToggling}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                                  member?.isActive === true ? "bg-primary" : "bg-admin-registry-border"
                                } ${isToggling ? "cursor-not-allowed opacity-60" : ""}
                                }`}
                                aria-label={`Toggle ${getStaffEmail(member)} status`}
                              >
                                <span
                                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                                    member?.isActive === true ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </button>
                              {isSelected ? <CheckCircle2 className="h-4 w-4 text-staff-selected-icon" /> : null}
                            </div>
                          </div>
                        </button>
                      )
                    })
                  ) : (
                    <div className="rounded-[8px] border border-dashed border-staff-empty-border bg-admin-registry-bg px-4 py-8 text-center text-sm text-staff-empty-text">
                      No staff records match this filter.
                    </div>
                  )}
                </div>
              </div>
          </SectionFrame>
        </div>
      </div>

      {selectedStaff ? (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          onClick={() => setSelectedStaffId("")}
        >
          <div
            className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[12px] bg-white shadow-[0_30px_90px_rgba(34,12,8,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-admin-registry-border bg-white px-6 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-admin-registry-count">
                  Staff Record
                </p>
                <h3 className="mt-2 text-2xl font-bold text-shared-heading">{selectedStaffDisplayName}</h3>
                <p className="mt-1 text-sm text-admin-registry-text">{getStaffEmail(selectedStaff)}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill>{getStaffStatus(selectedStaff)}</StatusPill>
                <button
                  type="button"
                  onClick={() => setSelectedStaffId("")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-admin-registry-border text-admin-registry-strong transition-colors hover:bg-admin-registry-bg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-5 px-6 py-6">
              <div className="rounded-[10px] border border-admin-registry-border bg-white px-4 py-3">
                <p className="text-sm font-semibold text-shared-heading">Basic Details</p>
                <div className="mt-3 grid gap-x-8 md:grid-cols-2">
                  <DetailField label="Title" value={getStaffTitle(selectedStaff) || "-"} />
                  <DetailField label="Role" value={getStaffRole(selectedStaff)} />
                  <DetailField label="First Name" value={getStaffFirstName(selectedStaff) || "-"} />
                  <DetailField label="Last Name" value={getStaffLastName(selectedStaff) || "-"} />
                  <DetailField label="Middle Name" value={getStaffMiddleName(selectedStaff) || "-"} />
                  {shouldShowDepartmentForStaff(selectedStaff) ? (
                    <DetailField label="Department" value={resolveStaffDepartmentName(selectedStaff, departments)} />
                  ) : null}
                  <DetailField label="Staff ID" value={getStaffProfile(selectedStaff)?.staffId || "-"} />
                  <DetailField label="Status" value={getStaffStatus(selectedStaff)} />
                </div>
              </div>

              <div className="rounded-[10px] border border-admin-registry-border bg-white px-4 py-3">
                <p className="text-sm font-semibold text-shared-heading">Contact Information</p>
                <div className="mt-3 grid gap-x-8 md:grid-cols-2">
                  <DetailField label="Institutional Email" value={getStaffEmail(selectedStaff)} />
                  <DetailField label="Personal Email" value={selectedStaff?.personalEmail || "-"} />
                  <DetailField label="Phone Number" value={getStaffPhoneNumber(selectedStaff) || "-"} />
                  <DetailField label="Alternate Phone" value={selectedStaff?.alternatePhone || "-"} />
                </div>
              </div>

              <div className="rounded-[10px] border border-admin-registry-border bg-white px-4 py-3">
                <p className="text-sm font-semibold text-shared-heading">Employment</p>
                <div className="mt-3 grid gap-x-8 md:grid-cols-2">
                  <DetailField label="Qualification" value={getStaffQualification(selectedStaff) || "-"} />
                  <DetailField label="Specialization" value={selectedStaff?.specialization || "-"} />
                  <DetailField label="Year of Employment" value={String(getStaffYearOfEmployment(selectedStaff) || "-")} />
                  <DetailField label="Created At" value={selectedStaff?.createdAt || "-"} />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-admin-registry-border pt-5">
                <PortalButton onClick={() => handleToggleStatus(selectedStaff)}>
                  {selectedStaff?.isActive === true ? "Turn Off Staff" : "Turn On Staff"}
                </PortalButton>
                <PortalButton
                  variant="outline"
                  onClick={() => handleResetPassword(getEntityId(selectedStaff))}
                >
                  Reset Password
                </PortalButton>
                <PortalButton variant="outline" onClick={() => setSelectedStaffId("")}>
                  Close
                </PortalButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <PortalToast
        open={Boolean(toastMessage)}
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
    </>
  )
}
