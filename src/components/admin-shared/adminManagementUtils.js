export const roleOptions = [
  { label: "Lecturer", value: "LECTURER" },
  { label: "HOD", value: "HOD" },
  { label: "Registrar", value: "REGISTRAR" },
  { label: "Bursary Officer", value: "BURSARY_OFFICER" },
  { label: "Admin", value: "ADMIN" },
  { label: "Staff", value: "STAFF" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
]

function toTitleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function resolveArray(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.sessions)) return payload.data.sessions
  if (Array.isArray(payload?.data?.semesters)) return payload.data.semesters
  if (Array.isArray(payload?.data?.faculties)) return payload.data.faculties
  if (Array.isArray(payload?.data?.departments)) return payload.data.departments
  if (Array.isArray(payload?.data?.staff)) return payload.data.staff
  if (Array.isArray(payload?.sessions)) return payload.sessions
  if (Array.isArray(payload?.semesters)) return payload.semesters
  if (Array.isArray(payload?.faculties)) return payload.faculties
  if (Array.isArray(payload?.departments)) return payload.departments
  if (Array.isArray(payload?.staff)) return payload.staff
  return []
}

export function getEntityId(item) {
  return item?.id || item?._id || item?.userId || item?.departmentId || item?.staffId || item?.facultyId || ""
}

export function getDepartmentName(item) {
  return item?.name || item?.departmentName || item?.title || item?.code || "Unnamed Department"
}

export function getFacultyName(item) {
  return (
    item?.faculty?.name ||
    item?.facultyName ||
    item?.name ||
    item?.school?.name ||
    item?.schoolName ||
    "Institutional Departments"
  )
}

export function getFacultyCode(item) {
  return item?.faculty?.code || item?.code || item?.facultyCode || item?.schoolCode || ""
}

export function getHodName(item) {
  const hodProfile = item?.hod?.user?.staffProfile || item?.headOfDepartment?.user?.staffProfile || {}
  const composedHodName = [
    toTitleCase(hodProfile?.title),
    toTitleCase(hodProfile?.firstName),
    toTitleCase(hodProfile?.lastName),
  ]
    .filter(Boolean)
    .join(" ")

  return (
    composedHodName ||
    item?.hod?.name ||
    item?.hod?.user?.name ||
    item?.hod?.user?.email ||
    item?.hodName ||
    item?.headOfDepartment?.name ||
    item?.headOfDepartment?.user?.name ||
    item?.headOfDepartment?.user?.email ||
    item?.headOfDepartmentName ||
    "Unassigned"
  )
}

export function getStaffName(item) {
  const profile = item?.staffProfile || item?.profile || item?.user?.staffProfile || {}
  const composedName = [
    toTitleCase(profile?.title),
    toTitleCase(profile?.firstName),
    toTitleCase(profile?.lastName),
  ]
    .filter(Boolean)
    .join(" ")

  return composedName || item?.name || item?.fullName || item?.profile?.name || item?.email || "Unnamed Staff"
}

export function getStaffEmail(item) {
  return item?.email || item?.profile?.email || "No email"
}

export function getStaffRole(item) {
  return item?.role || item?.staffRole || item?.designation || "Staff"
}

export function getStaffDepartment(item) {
  return (
    item?.department?.name ||
    item?.departmentName ||
    item?.department?.title ||
    item?.faculty?.name ||
    "Unassigned"
  )
}

export function getStaffStatus(item) {
  const rawStatus = item?.status || item?.accountStatus
  if (rawStatus) return String(rawStatus)
  if (item?.isActive === false) return "Inactive"
  if (item?.isActive === true) return "Active"
  return "Active"
}
