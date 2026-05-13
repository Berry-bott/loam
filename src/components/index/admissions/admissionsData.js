import { Calendar, CheckCircle, FileText, Users } from "lucide-react"

export const admissionSteps = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Application",
    description: "Complete our online application form with all required documents and transcripts.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Screening",
    description: "Visit our campus on the scheduled screening date and get all your documents screened by the admission team.",
  },
  {
    icon: Users,
    step: "03",
    title: "Admission",
    description: "Visit the office of the admission officer for your admission letter.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Acceptance",
    description: "Submit your admission decision and complete enrollment procedures.",
  },
]

export const deadlines = [
  { program: "Early Decision", date: "November 15, 2025", status: "Open" },
  { program: "Regular Decision", date: "January 15, 2026", status: "Open" },
  { program: "Rolling Admission", date: "Feb 1, 2026", status: "Open" },
]

export const stats = [
  { value: 85, suffix: "%", label: "Acceptance Rate" },
  { value: 100, suffix: "%", label: "Financial Aid Available" },
  { value: 25, suffix: "", label: "Average Class Size" },
  { value: 40, suffix: "+", label: "Countries Represented" },
]

export const formStepLabels = ["Personal Information", "Academic History", "Document Upload", "Review & Submit"]
export const examTypeOptions = ["WAEC", "NECO", "NABTEB", "GCE"]
export const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9", "AR"]
export const courseOptions = [
  "Computer Science",
  "Software and Web Development",
  "Mechanical Engineering",
  "Electrical / Electronics Engineering",
  "Computer Engineering",
  "Civil Engineering",
  "Statistics",
  "Accountancy",
]
export const subjectOptions = [
  "Agricultural Science",
  "Biology",
  "Chemistry",
  "Christian Religious Studies",
  "Civic Education",
  "Commerce",
  "Computer Studies",
  "Data Processing",
  "Economics",
  "English Language",
  "Financial Accounting",
  "Further Mathematics",
  "Geography",
  "Government",
  "Hausa",
  "History",
  "Igbo",
  "Islamic Religious Studies",
  "Literature in English",
  "Marketing",
  "Mathematics",
  "Physics",
  "Technical Drawing",
  "Yoruba",
]
export const jambYearOptions = Array.from({ length: 27 }, (_, index) => String(new Date().getFullYear() - index))

export const createSitting = () => ({
  examType: "",
  serialNumber: "",
  candidateNumber: "",
  subjects: Array.from({ length: 9 }, () => ({ subject: "", grade: "" })),
})

export const createJambSubject = (subject = "") => ({
  subject,
  score: "",
})
