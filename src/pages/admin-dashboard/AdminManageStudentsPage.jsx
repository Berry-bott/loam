import { useEffect, useState } from "react"
import { ArrowLeft, Camera, Search, UserRoundCog } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalInput } from "../../components/portal/PortalInput"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminStudentProfiles } from "../../lib/portal-data"
import { MetricCard, PageEyebrow, PageTitle, StatusPill } from "../../components/admin-shared/Shared"

const emptyForm = {
  fullName: "",
  regNumber: "",
  matricNumber: "",
  department: "",
  faculty: "",
  programme: "",
  level: "",
  status: "",
  session: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  guardianName: "",
  guardianPhone: "",
  admissionDate: "",
}

function normalizeRegNumber(value) {
  return value.trim().toUpperCase()
}

function EditableField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <PortalInput
      label={label}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default function AdminManageStudentsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchValue, setSearchValue] = useState(location.state?.regNumber || "")
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [toastMessage, setToastMessage] = useState("")

  const handleFieldChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSearch = (regNumber = searchValue) => {
    const normalizedValue = normalizeRegNumber(regNumber)
    const matchedRecord = adminStudentProfiles.find(
      (student) => normalizeRegNumber(student.regNumber) === normalizedValue,
    )

    if (!matchedRecord) {
      setSelectedRecord(null)
      setFormData(emptyForm)
      setToastMessage(`No student record found for ${normalizedValue || "that registration number"}.`)
      return
    }

    setSelectedRecord(matchedRecord)
    setFormData(matchedRecord)
    setSearchValue(matchedRecord.regNumber)
    setToastMessage(`Student record ${matchedRecord.regNumber} loaded successfully.`)
  }

  useEffect(() => {
    if (location.state?.regNumber) {
      handleSearch(location.state.regNumber)
    }
  }, [location.state])

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>Manage Students</PageEyebrow>
        <PageTitle
          title="Student Record Control"
          description="Search by registration number to open a student file for administrative editing. Students cannot alter these core profile details after initial submission, so all corrections must be handled by the registry or admin department."
          actions={
            <PortalButton variant="outline" onClick={() => navigate("/admin-dashboard/students")}>
              <ArrowLeft className="h-4 w-4" />
              Back to Student List
            </PortalButton>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Editable Records" value="1,482" note="Registry controlled student data" />
          <MetricCard label="Search Key" value="Reg Number" note="Use the official student registration ID" accent="gold" />
          <PortalCard className="bg-[#324758] h-[150px] text-white before:bg-[#324758]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Registry Notice</p>
            <p className="mt-3 text-[18px] font-bold">Admin Review Only</p>
            <p className="mt-2 text-[10px] text-white/75">
              Profile corrections made here override the student-facing record and should be handled by authorized staff only.
            </p>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="grid  gap-4 lg:grid-cols-[minmax(0,1fr)_190px] lg:justify-center items-center">
            <PortalInput
              label="Enter Student Registration Number"
              value={searchValue}
              placeholder="e.g. LOAM/24/CST/033"
              hint="Enter the official registration number to open and edit the student file."
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <PortalButton className="w-full" onClick={() => handleSearch()}>
              <Search className="h-4 w-4" />
              Search Record
            </PortalButton>
          </div>
        </PortalCard>

        {selectedRecord ? (
          <>
            <PortalCard accent="gold">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <UserRoundCog className="h-5 w-5 text-primary" />
                    <p className="text-[24px] font-bold text-portal-text-strong">{formData.fullName}</p>
                  </div>
                  <p className="mt-2 text-sm text-portal-text-muted">
                    Registration No: <span className="font-semibold text-portal-text">{formData.regNumber}</span>
                  </p>
                </div>
                <StatusPill>{formData.status}</StatusPill>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-[10px] border border-portal-border bg-portal-surface p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-label">Department</p>
                  <p className="mt-2 text-lg font-bold text-student-title">{formData.department}</p>
                </div>
                <div className="rounded-[10px] border border-portal-border bg-portal-surface p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-label">Programme</p>
                  <p className="mt-2 text-lg font-bold text-student-title">{formData.programme}</p>
                </div>
                <div className="rounded-[10px] border border-portal-border bg-portal-surface p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-label">Current Level</p>
                  <p className="mt-2 text-lg font-bold text-student-title">{formData.level}</p>
                </div>
              </div>
            </PortalCard>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_320px]">
              <PortalCard>
                <p className="text-[24px] font-bold text-portal-text-strong">Editable Student Information</p>
                <p className="mt-2 text-sm leading-6 text-portal-text-muted">
                  Update the student record below. Changes here represent the official registry version of the student profile.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <EditableField label="Full Name" value={formData.fullName} onChange={(value) => handleFieldChange("fullName", value)} />
                  <EditableField label="Registration Number" value={formData.regNumber} onChange={(value) => handleFieldChange("regNumber", value)} />
                  <EditableField label="Matric Number" value={formData.matricNumber} onChange={(value) => handleFieldChange("matricNumber", value)} />
                  <EditableField label="Institutional Email" value={formData.email} onChange={(value) => handleFieldChange("email", value)} type="email" />
                  <EditableField label="Phone Number" value={formData.phone} onChange={(value) => handleFieldChange("phone", value)} />
                  <EditableField label="Gender" value={formData.gender} onChange={(value) => handleFieldChange("gender", value)} />
                  <EditableField label="Date of Birth" value={formData.dateOfBirth} onChange={(value) => handleFieldChange("dateOfBirth", value)} type="date" />
                  <EditableField label="Admission Date" value={formData.admissionDate} onChange={(value) => handleFieldChange("admissionDate", value)} type="date" />
                  <EditableField label="Faculty / School" value={formData.faculty} onChange={(value) => handleFieldChange("faculty", value)} />
                  <EditableField label="Department" value={formData.department} onChange={(value) => handleFieldChange("department", value)} />
                  <EditableField label="Programme" value={formData.programme} onChange={(value) => handleFieldChange("programme", value)} />
                  <EditableField label="Level" value={formData.level} onChange={(value) => handleFieldChange("level", value)} />
                  <EditableField label="Session" value={formData.session} onChange={(value) => handleFieldChange("session", value)} />
                  <EditableField label="Status" value={formData.status} onChange={(value) => handleFieldChange("status", value)} />
                  <EditableField label="Guardian Name" value={formData.guardianName} onChange={(value) => handleFieldChange("guardianName", value)} />
                  <EditableField label="Guardian Phone" value={formData.guardianPhone} onChange={(value) => handleFieldChange("guardianPhone", value)} />
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8d7969]">
                    Residential Address
                  </span>
                  <textarea
                    value={formData.address}
                    onChange={(event) => handleFieldChange("address", event.target.value)}
                    className="min-h-[130px] w-full rounded-[3px] border border-admin-field-border bg-admin-field-bg px-4 py-3 text-sm text-admin-field-text outline-none transition focus:border-admin-field-focus-border focus:ring-2 focus:ring-admin-field-focus-ring"
                    placeholder="Student residential address"
                  />
                </label>

                <div className="mt-6 flex flex-wrap gap-3">
                  <PortalButton
                    onClick={() => setToastMessage(`Administrative updates for ${formData.regNumber} saved successfully.`)}
                  >
                    Save Student Changes
                  </PortalButton>
                  <PortalButton
                    variant="outline"
                    onClick={() => {
                      setFormData(selectedRecord)
                      setToastMessage(`Changes reset to the current saved record for ${selectedRecord.regNumber}.`)
                    }}
                  >
                    Reset Changes
                  </PortalButton>
                </div>
              </PortalCard>

              <div className="space-y-5">
                <PortalCard className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">Student Profile Photo</p>
                  <div className="mt-5 flex justify-center">
                    <img
                      src="/student-avatar.jpeg"
                      alt={formData.fullName}
                      className="h-[190px] w-[290px] rounded-[12px] object-cover shadow-[0_18px_32px_rgba(74,25,16,0.12)]"
                    />
                  </div>
                  <PortalButton
                    variant="gold"
                    className="mt-5 w-full"
                    onClick={() => setToastMessage(`Photo update workspace opened for ${formData.regNumber}.`)}
                  >
                    <Camera className="h-4 w-4" />
                    Edit Photo
                  </PortalButton>
                </PortalCard>

                <PortalCard accent="gold">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">Loaded Record</p>
                  <div className="mt-4 space-y-4 text-sm text-[#6f5b4a]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-label">Registration Number</p>
                      <p className="mt-1 font-semibold text-portal-text-strong">{formData.regNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-label">Current Session</p>
                      <p className="mt-1 font-semibold text-portal-text-strong">{formData.session}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-label">Record Owner</p>
                      <p className="mt-1 font-semibold text-portal-text-strong">{formData.fullName}</p>
                    </div>
                  </div>
                </PortalCard>
              </div>
            </div>
          </>
        ) : (
          <PortalCard>
            <div className="rounded-[12px] border border-dashed border-[#ddcdb8] bg-portal-surface px-6 py-12 text-center">
              <p className="text-[24px] font-bold text-student-title">No Student Record Loaded</p>
              <p className="mt-3 text-sm leading-6 text-portal-text-muted">
                Search with a valid registration number to open a student file for administrative editing.
              </p>
            </div>
          </PortalCard>
        )}
      </div>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

