import { Upload } from "lucide-react"
import { Input } from "../../ui/input"
import { examTypeOptions, gradeOptions } from "./admissionsData"

function SectionHeading({ title }) {
  return (
    <div className="mb-6 flex items-center gap-2 border-l-4 border-accent pl-3">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
    </div>
  )
}

export function PersonalInformationStep({
  form,
  handleChange,
  handleStateChange,
  stateOptions,
  lgaOptions,
}) {
  return (
    <div>
      <SectionHeading title="Personal Details" />

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
  )
}

export function AcademicHistoryStep({
  form,
  activeSittings,
  handleChange,
  handleSittingFieldChange,
  handleSittingSubjectChange,
  handleJambChange,
}) {
  return (
    <div>
      <SectionHeading title="Academic History" />

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

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              <div>
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
                  className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_240px]"
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

        <div className="grid grid-cols-1 gap-4">
          {form.jambSubjects.map((subject, subjectIndex) => (
            <div key={`jamb-${subjectIndex}`} className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
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
  )
}

export function DocumentUploadStep({ form, handleFile }) {
  return (
    <div>
      <SectionHeading title="Document Upload" />
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
  )
}

export function ReviewSubmitStep({ form, activeSittings }) {
  return (
    <div>
      <SectionHeading title="Review & Submit" />
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
  )
}
