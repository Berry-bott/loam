import {
  Archive,
  Bell,
  BriefcaseBusiness,
  CreditCard,
  FileBadge2,
  FileText,
  FolderClosed,
  LayoutGrid,
  LogOut,
  Newspaper,
  Settings,
  ShieldCheck,
  BarChart3,
  UserRoundCog,
  Users,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react"

export const studentSidebarItems = [
  { label: "Dashboard", to: "/student-dashboard", icon: LayoutGrid },
  { label: "Academic Fees", to: "/student-dashboard/academic-fees", icon: FileBadge2 },
  { label: "Financial Statement", to: "/student-dashboard/financial-statement", icon: CreditCard },
  { label: "Documents", to: "/student-dashboard/documents", icon: FolderClosed },
  { label: "Course Registration", to: "/student-dashboard/course-registration", icon: BookOpenCheck },
  { label: "Profile Settings", to: "/student-dashboard/profile-settings", icon: UserRoundCog },
]

export const adminSidebarItems = [
  { label: "Dashboard Overview", to: "/admin-dashboard", icon: LayoutGrid },
  { label: "Manage Courses", to: "/admin-dashboard/courses", icon: BookOpenCheck },
  { label: "Manage Applications", to: "/admin-dashboard/applications", icon: FileText },
  { label: "Manage Students", to: "/admin-dashboard/students", icon: GraduationCap },
  { label: "Payment Monitoring", to: "/admin-dashboard/payments", icon: CreditCard },
  { label: "News Management", to: "/admin-dashboard/news", icon: Newspaper },
  { label: "Faculty Management", to: "/admin-dashboard/faculty", icon: Users },
  { label: "Analytics", to: "/admin-dashboard/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin-dashboard/settings", icon: Settings },
]

export const logoutItem = { label: "Logout", to: "/auth/login", icon: LogOut }

export const studentTopbarLinks = ["Help", "Directory", "Support"]

export const adminTopbarLinks = ["Directory", "Archives", "Faculty Portal"]

export const loginIdentityOptions = [
  { label: "Student", value: "student" },
  { label: "Staff/Admin", value: "admin" },
  // { label: "Admission", value: "admission" },
]

export const studentAlerts = [
  {
    title: "Registration portal closes in 48 hours.",
    time: "3 hours ago",
  },
  {
    title: "Your reserved workbook 'Advanced Neural Networks' is now available.",
    time: "Yesterday",
  },
  {
    title: "Receipt generated for Payment ID #981209.",
    time: "Oct 03",
  },
]

export const studentCalendarItems = [
  {
    date: "OCT 14",
    title: "Mid-Semester Examinations",
    meta: "All departments, 9:00 AM onwards",
  },
  {
    date: "OCT 21",
    title: "Research Proposal Submission",
    meta: "Faculty board, 4:00 PM",
  },
  {
    date: "NOV 04",
    title: "Convocation Week Commencement",
    meta: "Main auditorium, founders square",
  },
]

export const applicationSteps = [
  {
    label: "Submitted",
    date: "Oct 22, 2024",
    state: "complete",
  },
  {
    label: "Payment",
    date: "Oct 24, 2024",
    state: "complete",
  },
  {
    label: "Preliminary Review",
    date: "Underway",
    state: "active",
  },
  {
    label: "Departmental Screening",
    date: "Queued",
    state: "upcoming",
  },
  {
    label: "Admission Letter",
    date: "Pending",
    state: "upcoming",
  },
]

export const credentials = [
  {
    name: "O'Level Result Statement.pdf",
    size: "PDF 2.3 MB",
  },
  {
    name: "Birth Certificate Scan.jpg",
    size: "JPG 860 KB",
  },
  {
    name: "Application Fee Receipt.pdf",
    size: "PDF 450 KB",
  },
]

export const transactions = [
  {
    date: "Oct 12, 2025",
    description: "Tuition Fee - Semester I",
    amount: "N850,000.00",
    status: "Success",
    action: "Receipt",
  },
  {
    date: "Nov 05, 2025",
    description: "Laboratory and Workshop Fees",
    amount: "N45,000.00",
    status: "Success",
    action: "Receipt",
  },
  {
    date: "Dec 20, 2025",
    description: "Hostel Maintenance Fee",
    amount: "N120,000.00",
    status: "Pending",
    action: "Pay",
  },
]

export const documentSummary = [
  { label: "Total Uploaded", value: "08", tone: "red" },
  { label: "Verified", value: "05", tone: "gold" },
  { label: "Pending Review", value: "02", tone: "neutral" },
  { label: "Action Required", value: "01", tone: "red" },
]

export const documentRecords = [
  {
    name: "Official Undergraduate Transcripts",
    note: "Required for final clearance",
    status: "Verified",
    updated: "Oct 14, 2025",
    action: "View",
  },
  {
    name: "Institutional Admission Letter",
    note: "Scanned copy",
    status: "Verified",
    updated: "Oct 14, 2025",
    action: "View",
  },
  {
    name: "Government Issued Identification",
    note: "Upload a newer, more legible copy",
    status: "Action Required",
    updated: "Blurry image",
    action: "Re-upload",
  },
  {
    name: "Passport Photographs (Digital)",
    note: "Recent passport, white background",
    status: "Pending",
    updated: "Nov 02, 2025",
    action: "Replace",
  },
]

export const adminMetrics = [
  { label: "Applications Today", value: "118", icon: BriefcaseBusiness, tone: "red" },
  { label: "Verified Documents", value: "54", icon: ShieldCheck, tone: "gold" },
  { label: "Pending Payments", value: "29", icon: CreditCard, tone: "neutral" },
  { label: "Unread Alerts", value: "12", icon: Bell, tone: "red" },
]

export const adminApplicants = [
  {
    name: "Sarah Michael",
    programme: "Mechanical Engineering",
    id: "LP/25/0412",
    status: "Screening",
  },
  {
    name: "Udeme Peter",
    programme: "Computer Science",
    id: "LP/25/0401",
    status: "Documents Pending",
  },
  {
    name: "Victory James",
    programme: "Electrical Engineering",
    id: "LP/25/0398",
    status: "Approved",
  },
]

export const adminPayments = [
  {
    title: "Fee Collections",
    value: "N3,820,000.00",
    note: "14 confirmed payments this week",
  },
  {
    title: "Outstanding Invoices",
    value: "N1,145,000.00",
    note: "9 students awaiting clearance",
  },
]

export const adminOverviewStats = [
  { label: "Total Students", value: "2,450", note: "+12.5% increase", tone: "green" },
  { label: "Institutional Revenue", value: "N305.2M", note: "+2.8% vs last term", tone: "green" },
  { label: "Pending Reviews", value: "142", note: "High priority", tone: "red" },
  { label: "System Uptime", value: "84.2%", note: "Exceeding goal", tone: "green" },
]

export const adminActivityRows = [
  {
    action: "Tuition Payment Received",
    department: "Bursary Dept.",
    status: "Verified",
    timestamp: "Oct 21, 2025 09:12 AM",
    reference: "APP-94881",
  },
  {
    action: "Application Approved",
    department: "Admissions",
    status: "Official",
    timestamp: "Oct 20, 2025 09:54 AM",
    reference: "HP-24-0417",
  },
  {
    action: "New Bulletin Published",
    department: "Public Relations",
    status: "Live",
    timestamp: "Oct 22, 2025 11:20 AM",
    reference: "NEWS-102",
  },
  {
    action: "High Volume Pending Applications",
    department: "Registrar's Office",
    status: "Urgent",
    timestamp: "Oct 23, 2025 11:20 AM",
    reference: "ADM-QUEUE",
  },
]

export const adminCourses = [
  ["COM 101", "Introduction to Computing", "Computer Science", "3.0", "Accredited"],
  ["BUS 214", "Microeconomics I", "Business Studies", "4.0", "Accredited"],
  ["MTH 111", "Algebra & Trigonometry", "General Studies", "3.0", "Accredited"],
  ["ENG 302", "Fluid Mechanics", "Mechanical Engineering", "4.0", "New Pending"],
  ["ARC 410", "Urban Design Theory", "Architecture", "2.0", "Accredited"],
]

export const adminApplicationRows = [
  ["Julian Akabioyo", "HP/24/ENG/0191", "Mechanical Engineering", "Oct 19, 2025", "Pending"],
  ["Sarah Mensah", "HP/24/CST/0744", "Computer Science", "Oct 19, 2025", "Reviewed"],
  ["Chioma Okoro", "HP/24/BUS/0188", "Accountancy", "Oct 08, 2025", "Approved"],
  ["Eunice Nwosu", "HP/24/LAW/0283", "Legal Studies", "Oct 05, 2025", "Rejected"],
  ["Kofi Taylor", "HP/24/ARC/0193", "Architecture", "Oct 16, 2025", "Pending"],
]

export const adminFacultyCards = [
  {
    name: "Faculty of Engineering",
    accent: "red",
    summary: "Active departments across mechanical, electrical, and civil tracks.",
    departments: ["Mechanical Engineering", "Civil Engineering", "Electrical / Electronics", "Computer Engineering"],
  },
  {
    name: "Management Sciences",
    accent: "gold",
    summary: "Focuses on applied management, accounting, and business administration.",
    departments: ["Accountancy", "Business Administration", "Public Administration"],
  },
]

export const adminStudents = [
  ["Emediong Ekanem", "LOAM/23/ENG/042", "Computer Engineering", "300 Level", "Cleared"],
  ["Emmanuel Bassey", "LOAM/24/BUS/018", "Accountancy", "100 Level", "Cleared"],
  ["Joshua Barnett", "LOAM/22/MEC/016", "Mechanical Engineering", "400 Level", "Cleared"],
  ["Somto Okafor", "LOAM/24/CST/033", "Computer Science", "200 Level", "Cleared"],
]

export const adminNewsItems = [
  ["24 Oct", "Convocation Ceremony Schedule for the Class of 2024", "12:45 PM"],
  ["22 Oct", "LOAMPOLY Secures Victory at Inter-Collegiate Games", "11:20 AM"],
  ["19 Oct", "New Grant Opportunities for Post Graduate Studies", "09:10 AM"],
  ["15 Oct", "Sustainability Initiative: Campus Modernisation Phase 3", "08:35 AM"],
]

export const adminPaymentRows = [
  ["984", "Emeka Bassey", "Tuition Clearance", "N450,000.00", "Success"],
  ["985", "Irene Udo", "Hostel Fee", "N65,000.00", "Pending"],
  ["986", "Chika Okafor", "Exam Docket", "N18,000.00", "Success"],
  ["987", "S. Victor Toby", "Course Registration", "N75,000.00", "Failed"],
]

export const adminAnalyticsRows = [
  ["TND-141717", "Adaptive Thermodynamics", "Engineering", "N7,250.00"],
  ["TND-141722", "Lead Admission", "Pure Sciences", "N58,000.00"],
  ["TND-141742", "Civil Workshop", "Engineering", "N32,500.00"],
]

export const adminSettingsUsers = [
  ["Prof. Udo Effiong", "Super Admin", "Registry HQ", "Full Access"],
  ["Mfon Bassey", "Finance Manager", "Bursary Dept.", "Payments Only"],
  ["Ekaette Akpan", "Records Officer", "Admin Unit", "Data Access"],
]
