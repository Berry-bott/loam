import { useEffect, useRef, useState } from "react"
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Mail } from "lucide-react"
import { Button } from "../../ui/button"
import { nigeriaStatesAndLgas } from "../../../lib/portal-data"
import {
  createJambSubject,
  createSitting,
  formStepLabels,
} from "./admissionsData"
import {
  AcademicHistoryStep,
  DocumentUploadStep,
  PersonalInformationStep,
  ReviewSubmitStep,
} from "./AdmissionsFormSections"

function SubmissionSuccess({ trackingId, onViewGuide }) {
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

      <div className="flex gap-3">
        <Button size="lg" variant="outline" className="rounded-full" onClick={onViewGuide}>
          View Admission Guide
        </Button>
      </div>
    </div>
  )
}

function FormProgress({ step, progress }) {
  return (
    <div className="sticky -top-6 z-20 -mx-5 mb-8 border-b border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur md:-mx-6 md:px-6">
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
  )
}

export function AdmissionsApplicationForm({ onClose, onViewGuide }) {
  const formRef = useRef(null)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
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

  useEffect(() => {
    const scrollContainer = formRef.current?.closest('[data-application-scroll-container="true"]')

    scrollContainer?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [step])

  if (submitted) {
    return <SubmissionSuccess trackingId={trackingId} onViewGuide={onViewGuide} />
  }

  return (
    <div ref={formRef} className="mx-auto w-full max-w-6xl">
      <FormProgress step={step} progress={progress} />

      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
        {step === 1 && (
          <PersonalInformationStep
            form={form}
            handleChange={handleChange}
            handleStateChange={handleStateChange}
            stateOptions={stateOptions}
            lgaOptions={lgaOptions}
          />
        )}

        {step === 2 && (
          <AcademicHistoryStep
            form={form}
            activeSittings={activeSittings}
            handleChange={handleChange}
            handleSittingFieldChange={handleSittingFieldChange}
            handleSittingSubjectChange={handleSittingSubjectChange}
            handleJambChange={handleJambChange}
          />
        )}

        {step === 3 && <DocumentUploadStep form={form} handleFile={handleFile} />}

        {step === 4 && <ReviewSubmitStep form={form} activeSittings={activeSittings} />}

        <div className="mt-8 flex justify-between border-t border-border pt-6">
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground">
              Save as Draft
            </Button>
            {step > 1 && (
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => setStep((current) => current - 1)}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground" onClick={onClose}>
              Cancel
            </Button>
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
