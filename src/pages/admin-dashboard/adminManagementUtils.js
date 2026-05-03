export const roleOptions = [
  "Super Admin",
  "Admin",
  "HOD",
  "Registrar",
  "Bursary Officer",
  "Staff",
]

export const facultyOptions = [
  "School of Applied Sciences",
  "School of Engineering",
  "School of Management Sciences",
  "School of General Studies",
  "Institutional Departments",
]

export function resolveArray(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.departments)) return payload.data.departments
  if (Array.isArray(payload?.data?.staff)) return payload.data.staff
  if (Array.isArray(payload?.departments)) return payload.departments
  if (Array.isArray(payload?.staff)) return payload.staff
  return []
}

export function getEntityId(item) {
  return item?.id || item?._id || item?.userId || item?.departmentId || item?.staffId || ""
}

export function getDepartmentName(item) {
  return item?.name || item?.departmentName || item?.title || item?.code || "Unnamed Department"
}

export function getFacultyName(item) {
  return (
    item?.faculty?.name ||
    item?.facultyName ||
    item?.school?.name ||
    item?.schoolName ||
    "Institutional Departments"
  )
}

export function getHodName(item) {
  return (
    item?.hod?.name ||
    item?.hodName ||
    item?.headOfDepartment?.name ||
    item?.headOfDepartmentName ||
    "Unassigned"
  )
}

export function getStaffName(item) {
  return item?.name || item?.fullName || item?.profile?.name || item?.email || "Unnamed Staff"
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
