import { useEffect, useRef, useState } from "react"
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Clock, Mail, Upload } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { nigeriaStatesAndLgas } from "../../../lib/portal-data"

const courses = [
  "Statistics",
  "Computer Science",
  "Accountancy",
  "Electrical Electronics Engineering",
  "Computer Engineering Technology",
  "Business Administration",
  "Public Administration",
  "Science Lab Technology",
  "Estate Management",
  "Mass Communication",
]

const formStepLabels = ["Personal Information", "Academic History", "Document Upload", "Review & Submit"]
const examTypeOptions = ["WAEC", "NECO", "NABTEB", "GCE"]
const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9", "AR"]

const createSitting = () => ({
  examType: "",
  serialNumber: "",
  candidateNumber: "",
  subjects: Array.from({ length: 9 }, () => ({ subject: "", grade: "" })),
})

const createJambSubject = () => ({
  subject: "",
  score: "",
})

export function ApplicationForm({ onClose, onReadGuideline }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const formTopRef = useRef(null)
  const [trackingId] = useState(
    `LP-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`
  )

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    residentialAddress: "",
    nationality: "Nigeria",
    stateOfOrigin: "",
    lga: "",
    lastSchool: "",
    graduationYear: "",
    chosenCourse: "",
    sittingCount: "1",
    sittings: [createSitting(), createSitting()],
    jambSubjects: Array.from({ length: 4 }, () => createJambSubject()),
    passport: null,
    waecResult: null,
    birthCert: null,
  })

  const progress = Math.round(((step - 1) / (formStepLabels.length - 1)) * 100)
  const activeSittings = form.sittings.slice(0, Number(form.sittingCount))
  const stateOptions = Object.keys(nigeriaStatesAndLgas)
  const lgaOptions = form.stateOfOrigin ? nigeriaStatesAndLgas[form.stateOfOrigin] ?? [] : []

  useEffect(() => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [step])

  const handleChange = (key) => (event) => {
    const value = event.target.value
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleFile = (key) => (event) => {
    const file = event.target.files?.[0] ?? null
    setForm((current) => ({ ...current, [key]: file }))
  }

  const handleStateChange = (event) => {
    const value = event.target.value
    setForm((current) => ({
      ...current,
      stateOfOrigin: value,
      lga: "",
    }))
  }

  const handleSittingFieldChange = (sittingIndex, key) => (event) => {
    const value = event.target.value
    setForm((current) => ({
      ...current,
      sittings: current.sittings.map((sitting, index) =>
        index === sittingIndex ? { ...sitting, [key]: value } : sitting
      ),
    }))
  }

  const handleSittingSubjectChange = (sittingIndex, subjectIndex, key) => (event) => {
    const value = event.target.value
    setForm((current) => ({
      ...current,
      sittings: current.sittings.map((sitting, index) =>
        index === sittingIndex
          ? {
              ...sitting,
              subjects: sitting.subjects.map((subject, currentIndex) =>
                currentIndex === subjectIndex ? { ...subject, [key]: value } : subject
              ),
            }
          : sitting
      ),
    }))
  }

  const handleJambChange = (subjectIndex, key) => (event) => {
    const value = event.target.value
    setForm((current) => ({
      ...current,
      jambSubjects: current.jambSubjects.map((subject, index) =>
        index === subjectIndex ? { ...subject, [key]: value } : subject
      ),
    }))
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="mb-2 font-serif text-3xl font-bold">Submission Successful</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          Your application for the {new Date().getFullYear()}/{new Date().getFullYear() + 1} Academic Session
          has been received and is currently under review by the admissions board.
        </p>

        <div className="mb-8 w-full max-w-sm rounded-2xl border border-border bg-secondary/20 p-6">
          <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">Tracking Identity</p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold">{trackingId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(trackingId)}
              className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:bg-secondary"
            >
              Copy ID
            </button>
          </div>
        </div>

        <div className="mb-8 grid w-full max-w-sm grid-cols-3 gap-4 text-sm">
          {[
            { Icon: Mail, title: "Email Sent", desc: "Check your inbox for a detailed confirmation receipt." },
            { Icon: Clock, title: "Review Time", desc: "Initial verification usually takes 3-5 business days." },
            { Icon: CheckCircle, title: "Need Help?", desc: "Contact our help desk for any application queries." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-1 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="text-xs font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" className="rounded-full" onClick={onClose}>
            Close Form
          </Button>
          <Button className="rounded-full" onClick={onReadGuideline}>
            Read Application Guideline <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div ref={formTopRef} className="mx-auto w-full max-w-6xl">
      <div className="sticky -top-6 z-20 -mx-5 mb-8 border-b border-border bg-background/95 px-5 pb-6 pt-3 backdrop-blur md:-mx-6 md:px-6">
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>APPLICATION PROGRESS: {progress}%</span>
            <span>STEP {step} OF {formStepLabels.length}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-4 h-px bg-border" style={{ zIndex: 0 }} />
          {formStepLabels.map((label, index) => {
            const currentStep = index + 1
            const done = currentStep < step
            const active = currentStep === step

            return (
              <div key={label} className="flex flex-col items-center gap-2" style={{ zIndex: 1 }}>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    done
                      ? "border-accent bg-accent text-white"
                      : active
                        ? "border-accent bg-background text-accent"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {done ? <CheckCircle className="h-4 w-4" /> : currentStep}
                </div>
                <span
                  className={`hidden max-w-[80px] text-center text-xs leading-tight sm:block ${
                    active ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
        {step === 1 && (
          <div>
            <div className="mb-6 flex items-center gap-2 border-l-4 border-accent pl-3">
              <h3 className="font-serif text-xl font-semibold">Personal Details</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">First Name</label>
                <Input
                  placeholder="Adebayo"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Middle Name</label>
                <Input
                  placeholder="Oluwaseun"
                  value={form.middleName}
                  onChange={handleChange("middleName")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Last Name</label>
                <Input
                  placeholder="Adeyemi"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                  Date of Birth (Optional)
                </label>
                <Input type="date" value={form.dateOfBirth} onChange={handleChange("dateOfBirth")} className="rounded-lg" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Gender</label>
                <select
                  value={form.gender}
                  onChange={handleChange("gender")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Year of Graduation</label>
                <Input
                  placeholder="e.g. 2023"
                  value={form.graduationYear}
                  onChange={handleChange("graduationYear")}
                  className="rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="example@domain.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input
                  placeholder="+234 800 000 0000"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Nationality</label>
                <select
                  value={form.nationality}
                  onChange={handleChange("nationality")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">State of Origin</label>
                <select
                  value={form.stateOfOrigin}
                  onChange={handleStateChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select state</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">LGA</label>
                <select
                  value={form.lga}
                  onChange={handleChange("lga")}
                  disabled={!form.stateOfOrigin}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">{form.stateOfOrigin ? "Select LGA" : "Select state first"}</option>
                  {lgaOptions.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Residential Address</label>
                <Input
                  placeholder="No. 1, Example Street, City"
                  value={form.residentialAddress}
                  onChange={handleChange("residentialAddress")}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-6 flex items-center gap-2 border-l-4 border-accent pl-3">
              <h3 className="font-serif text-xl font-semibold">Academic History</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Last School Attended</label>
                <Input
                  placeholder="Name of your secondary school"
                  value={form.lastSchool}
                  onChange={handleChange("lastSchool")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Chosen Course</label>
                <select
                  value={form.chosenCourse}
                  onChange={handleChange("chosenCourse")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Number of Sittings</label>
                <select
                  value={form.sittingCount}
                  onChange={handleChange("sittingCount")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="1">1 Sitting</option>
                  <option value="2">2 Sittings</option>
                </select>
              </div>
            </div>

            <div className={`mt-8 grid grid-cols-1 gap-6 ${Number(form.sittingCount) === 2 ? "xl:grid-cols-2" : ""}`}>
              {activeSittings.map((sitting, sittingIndex) => (
                <div key={`sitting-${sittingIndex}`} className="rounded-2xl border border-border bg-secondary/10 p-5">
                  <div className="mb-5">
                    <h4 className="font-serif text-lg font-semibold">Sitting {sittingIndex === 0 ? "A" : "B"}</h4>
                    <p className="text-xs text-muted-foreground">
                      Add exam type, serial number, candidate number, and 9 subjects with grades.
                    </p>
                  </div>

                  <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Exam Type</label>
                      <select
                        value={sitting.examType}
                        onChange={handleSittingFieldChange(sittingIndex, "examType")}
                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select exam</option>
                        {examTypeOptions.map((examType) => (
                          <option key={examType} value={examType}>
                            {examType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Serial Number</label>
                      <Input
                        placeholder="Enter serial number"
                        value={sitting.serialNumber}
                        onChange={handleSittingFieldChange(sittingIndex, "serialNumber")}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Candidate Number</label>
                      <Input
                        placeholder="Enter candidate number"
                        value={sitting.candidateNumber}
                        onChange={handleSittingFieldChange(sittingIndex, "candidateNumber")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {sitting.subjects.map((subject, subjectIndex) => (
                      <div
                        key={`sitting-${sittingIndex}-subject-${subjectIndex}`}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_140px]"
                      >
                        <div>
                          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                            Subject {subjectIndex + 1}
                          </label>
                          <Input
                            placeholder="Enter subject"
                            value={subject.subject}
                            onChange={handleSittingSubjectChange(sittingIndex, subjectIndex, "subject")}
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Grade</label>
                          <select
                            value={subject.grade}
                            onChange={handleSittingSubjectChange(sittingIndex, subjectIndex, "grade")}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select grade</option>
                            {gradeOptions.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-secondary/10 p-5">
              <div className="mb-5">
                <h4 className="font-serif text-lg font-semibold">JAMB Details</h4>
                <p className="text-xs text-muted-foreground">Provide 4 JAMB subjects and their scores.</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {form.jambSubjects.map((subject, subjectIndex) => (
                  <div key={`jamb-${subjectIndex}`} className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_120px]">
                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                        Subject {subjectIndex + 1}
                      </label>
                      <Input
                        placeholder="Enter subject"
                        value={subject.subject}
                        onChange={handleJambChange(subjectIndex, "subject")}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Score</label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={subject.score}
                        onChange={handleJambChange(subjectIndex, "score")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-6 flex items-center gap-2 border-l-4 border-accent pl-3">
              <h3 className="font-serif text-xl font-semibold">Document Upload</h3>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Upload clear scans or photos. Accepted formats: PDF, JPG, PNG (max 5MB each).
            </p>

            <div className="flex flex-col gap-5">
              {[
                { label: "Passport Photograph", key: "passport", desc: "Recent white-background passport photo" },
                { label: "WAEC Result (Optional)", key: "waecResult", desc: "Upload WAEC result slip or certificate if available" },
                { label: "Birth Certificate", key: "birthCert", desc: "National Population Commission certificate" },
              ].map(({ label, key, desc }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
                  <p className="mb-2 text-xs text-muted-foreground">{desc}</p>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-4 transition-colors ${
                      form[key] ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Upload className={`h-5 w-5 flex-shrink-0 ${form[key] ? "text-accent" : "text-muted-foreground"}`} />
                    <div className="min-w-0 flex-1">
                      {form[key] ? (
                        <span className="block truncate text-sm font-medium text-accent">{form[key].name}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                      )}
                    </div>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile(key)} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="mb-6 flex items-center gap-2 border-l-4 border-accent pl-3">
              <h3 className="font-serif text-xl font-semibold">Review & Submit</h3>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Please review your information carefully before submitting.
            </p>

            {[
              {
                title: "Personal Information",
                rows: [
                  ["Full Name", [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")],
                  ["Date of Birth", form.dateOfBirth || "Optional"],
                  ["Gender", form.gender],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Nationality", form.nationality],
                  ["State / LGA", `${form.stateOfOrigin} / ${form.lga}`],
                ],
              },
              {
                title: "Academic History",
                rows: [
                  ["Last School", form.lastSchool],
                  ["Graduation Year", form.graduationYear],
                  ["Chosen Course", form.chosenCourse],
                  ["Number of Sittings", form.sittingCount],
                ],
              },
              {
                title: "Documents",
                rows: [
                  ["Passport", form.passport?.name ?? "Not uploaded"],
                  ["WAEC Result", form.waecResult?.name ?? "Optional"],
                  ["Birth Certificate", form.birthCert?.name ?? "Not uploaded"],
                ],
              },
            ].map((section) => (
              <div key={section.title} className="mb-6 overflow-hidden rounded-xl border border-border">
                <div className="bg-secondary/40 px-4 py-2 text-sm font-semibold">{section.title}</div>
                {section.rows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 border-t border-border px-4 py-2 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium truncate">{value || <span className="italic text-muted-foreground">-</span>}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="mb-6 overflow-hidden rounded-xl border border-border">
              <div className="bg-secondary/40 px-4 py-2 text-sm font-semibold">O&apos;Level Sittings</div>
              <div className={`grid grid-cols-1 gap-4 p-4 ${Number(form.sittingCount) === 2 ? "xl:grid-cols-2" : ""}`}>
                {activeSittings.map((sitting, sittingIndex) => (
                  <div key={`review-sitting-${sittingIndex}`} className="rounded-xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Sitting {sittingIndex === 0 ? "A" : "B"}</h4>
                      <span className="text-xs text-muted-foreground">{sitting.examType || "Exam type not set"}</span>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Serial Number</p>
                        <p className="font-medium">{sitting.serialNumber || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Candidate Number</p>
                        <p className="font-medium">{sitting.candidateNumber || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {sitting.subjects.map((subject, subjectIndex) => (
                        <div key={`review-sitting-${sittingIndex}-subject-${subjectIndex}`} className="grid grid-cols-[minmax(0,1fr)_80px] gap-3 text-sm">
                          <span className="truncate">{subject.subject || `Subject ${subjectIndex + 1}`}</span>
                          <span className="font-medium">{subject.grade || "-"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-xl border border-border">
              <div className="bg-secondary/40 px-4 py-2 text-sm font-semibold">JAMB Details</div>
              <div className="space-y-2 p-4">
                {form.jambSubjects.map((subject, subjectIndex) => (
                  <div key={`review-jamb-${subjectIndex}`} className="grid grid-cols-[minmax(0,1fr)_80px] gap-3 text-sm">
                    <span className="truncate">{subject.subject || `Subject ${subjectIndex + 1}`}</span>
                    <span className="font-medium">{subject.score || "-"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              By submitting this form you confirm that all information provided is accurate and complete.
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-border pt-6">
          <div className="flex gap-3">

            {step > 1 && (
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => setStep((current) => current - 1)}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">

            {step < formStepLabels.length ? (
              <Button size="sm" className="rounded-full" onClick={() => setStep((current) => current + 1)}>
                Next Step <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => setSubmitted(true)}
              >
                Submit Application <CheckCircle className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
