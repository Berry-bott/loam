import {
  Bell,
  BriefcaseBusiness,
  CreditCard,
  FileBadge2,
  FolderClosed,
  LayoutGrid,
  LogOut,
  Settings,
  ShieldCheck,
  BarChart3,
  UserRoundCog,
  Users,
  BookOpenCheck,
} from "lucide-react"
import { getAdminDashboardRoute, getPortalHomeRoute, getStudentDashboardRoute } from "./portal-routing"

function withStudentDashboardPath(path = "") {
  return getStudentDashboardRoute(path)
}

function withAdminDashboardPath(path = "") {
  return getAdminDashboardRoute(path)
}

export const studentSidebarItems = [
  { label: "Dashboard", to: withStudentDashboardPath(), icon: LayoutGrid },
  { label: "Academic Fees", to: withStudentDashboardPath("/academic-fees"), icon: FileBadge2 },
  // { label: "Financial Statement", to: "/student-dashboard/financial-statement", icon: CreditCard },
  { label: "Documents", to: withStudentDashboardPath("/documents"), icon: FolderClosed },
  { label: "Course Registration", to: withStudentDashboardPath("/course-registration"), icon: BookOpenCheck },
  { label: "Profile Settings", to: withStudentDashboardPath("/profile-settings"), icon: UserRoundCog },
]

const sharedAdminSidebarItems = [
  { label: "Dashboard Overview", to: withAdminDashboardPath(), icon: LayoutGrid },
  { label: "Analytics", to: withAdminDashboardPath("/analytics"), icon: BarChart3 },
  { label: "Settings", to: withAdminDashboardPath("/settings"), icon: Settings },
]

const superAdminSidebarItems = [
  { label: "Department Management", to: withAdminDashboardPath("/general-management/departments"), icon: Users },
  { label: "Staff Management", to: withAdminDashboardPath("/general-management/staff"), icon: UserRoundCog },
  { label: "Portal Management", to: withAdminDashboardPath("/portal-management"), icon: BriefcaseBusiness },
  { label: "News Management", to: withAdminDashboardPath("/news"), icon: Bell },
]

const lecturerSidebarItems = [
  { label: "Manage Courses", to: withAdminDashboardPath("/courses"), icon: BookOpenCheck },
  { label: "Upload Results", to: withAdminDashboardPath("/results"), icon: FileBadge2 },
]

const hodSidebarItems = [
  { label: "Manage Courses", to: withAdminDashboardPath("/courses"), icon: BookOpenCheck },
  { label: "Upload Results", to: withAdminDashboardPath("/results"), icon: FileBadge2 },
  { label: "Department Applications", to: withAdminDashboardPath("/applications"), icon: BriefcaseBusiness },
  { label: "Department Lecturers", to: withAdminDashboardPath("/lecturers"), icon: Users },
]

const officerSidebarItems = [
  { label: "Manage Applications", to: withAdminDashboardPath("/applications"), icon: BriefcaseBusiness },
  { label: "Manage Students", to: withAdminDashboardPath("/students"), icon: Users },
  { label: "Payment Monitoring", to: withAdminDashboardPath("/payments"), icon: CreditCard },
]

export function getAdminSidebarItems(role) {
  if (role === "superadmin") {
    return [
      sharedAdminSidebarItems[0],
      superAdminSidebarItems[0],
      superAdminSidebarItems[1],
      superAdminSidebarItems[2],
      superAdminSidebarItems[3],
      sharedAdminSidebarItems[1],
      sharedAdminSidebarItems[2],
    ]
  }

  if (role === "lecturer") {
    return [
      sharedAdminSidebarItems[0],
      lecturerSidebarItems[0],
      lecturerSidebarItems[1],
      sharedAdminSidebarItems[1],
      sharedAdminSidebarItems[2],
    ]
  }

  if (role === "hod") {
    return [
      sharedAdminSidebarItems[0],
      hodSidebarItems[0],
      hodSidebarItems[1],
      hodSidebarItems[2],
      hodSidebarItems[3],
      sharedAdminSidebarItems[1],
      sharedAdminSidebarItems[2],
    ]
  }

  if (role === "admission_officer" || role === "bursary_officer") {
    return [
      sharedAdminSidebarItems[0],
      officerSidebarItems[0],
      officerSidebarItems[1],
      officerSidebarItems[2],
      sharedAdminSidebarItems[1],
      sharedAdminSidebarItems[2],
    ]
  }

  return sharedAdminSidebarItems
}

export const logoutItem = { label: "Logout", to: getPortalHomeRoute(), icon: LogOut }

export const studentTopbarLinks = ["Help", "Support"]

export const adminTopbarLinks = []

export const loginIdentityOptions = [
  { label: "Student", value: "student" },
  // { label: "Admission", value: "admission" },
];


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
    title: "Receipt generated for Payment ID 981209.",
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

export const studentAcademicProfile = {
  school: "Loam Polytechnic",
  studentName: "Adewale John",
  matricNumber: "AKP/SWD/2025/00019",
  faculty: "School of Applied Sciences",
  department: "Software and Web Development",
  programme: "Higher National Diploma",
  currentLevel: "HND 1",
  academicSession: "2024 / 2025",
}

export const academicFeeHistory = [
  {
    id: "fee-acceptance-2025",
    feeTitle: "Acceptance Fee",
    amount: 25000,
    status: "Verified",
    paidOn: "Oct 12, 2025",
    paymentType: "Admission Clearance",
    semester: "First Semester",
    session: "2024 / 2025",
    level: "HND 1",
    receiptNumber: "LPT/REC/2025/001284",
    rrr: "250145667812",
    invoiceNumber: "LPT/INV/2025/00984",
    transactionReference: "TRX-81249031",
    paymentChannel: "Remita via Bank Branch",
    verifiedBy: "Bursary Audit Desk",
    purpose: "Initial institutional acceptance and onboarding clearance.",
  },
  {
    id: "fee-registration-2025",
    feeTitle: "Registration Fee",
    amount: 3500,
    status: "Verified",
    paidOn: "Oct 14, 2025",
    paymentType: "Session Registration",
    semester: "First Semester",
    session: "2024 / 2025",
    level: "HND 1",
    receiptNumber: "LPT/REC/2025/001307",
    rrr: "250145668904",
    invoiceNumber: "LPT/INV/2025/01013",
    transactionReference: "TRX-81277105",
    paymentChannel: "Remita via Portal Checkout",
    verifiedBy: "Registry Finance Liaison",
    purpose: "Annual registration validation for active academic records.",
  },
  {
    id: "fee-department-materials-2025",
    feeTitle: "Department Materials Fee",
    amount: 5000,
    status: "Verified",
    paidOn: "Oct 18, 2025",
    paymentType: "Departmental Charges",
    semester: "First Semester",
    session: "2024 / 2025",
    level: "HND 1",
    receiptNumber: "LPT/REC/2025/001362",
    rrr: "250145672158",
    invoiceNumber: "LPT/INV/2025/01066",
    transactionReference: "TRX-81320498",
    paymentChannel: "Remita via Mobile Transfer",
    verifiedBy: "Departmental Bursary Unit",
    purpose: "Approved departmental materials and studio resource levy.",
  },
  {
    id: "fee-ict-2025",
    feeTitle: "ICT Fee",
    amount: 2500,
    status: "Pending Confirmation",
    paidOn: "Oct 20, 2025",
    paymentType: "Technology Support Levy",
    semester: "First Semester",
    session: "2024 / 2025",
    level: "HND 1",
    receiptNumber: "Awaiting Release",
    rrr: "250145673009",
    invoiceNumber: "LPT/INV/2025/01089",
    transactionReference: "TRX-81349721",
    paymentChannel: "Remita via Card Payment",
    verifiedBy: "Awaiting bursary posting",
    purpose: "Portal access, LMS provisioning, and digital identity services.",
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
    ["HP/24/ENG/0191", "Julian Akabioyo", "julian.akabioyo@loamportal.edu", "248", "Oct 19, 2025", "Pending"],
    ["HP/24/CST/0744", "Sarah Mensah", "sarah.mensah@loamportal.edu", "286", "Oct 19, 2025", "Reviewed"],
    ["HP/24/BUS/0188", "Chioma Okoro", "chioma.okoro@loamportal.edu", "271", "Oct 08, 2025", "Approved"],
    ["HP/24/LAW/0283", "Eunice Nwosu", "eunice.nwosu@loamportal.edu", "233", "Oct 05, 2025", "Rejected"],
    ["HP/24/ARC/0193", "Kofi Taylor", "kofi.taylor@loamportal.edu", "259", "Oct 16, 2025", "Pending"],
  ]

export const adminApplicationProfiles = [
  {
    id: "HP/24/ENG/0191",
    name: "Julian Akabioyo",
    email: "julian.akabioyo@loamportal.edu",
    phone: "+234 803 445 1182",
    gender: "Male",
    dateOfBirth: "2006-04-18",
    maritalStatus: "Single",
    nationality: "Nigerian",
    stateOfOrigin: "Akwa Ibom",
    lga: "Uyo",
    residentialAddress: "12 Unity Crescent, Uyo, Akwa Ibom State",
    submissionDate: "Oct 19, 2025",
    status: "Pending",
    jambRegistrationNumber: "202455667788JA",
    jambYear: "2025",
    jambTotal: "248",
    lastSchool: "Federal Government College, Ikot Ekpene",
    department: "Mechanical Engineering",
    sponsorName: "Ekanem Akabioyo",
    sponsorPhone: "+234 806 223 8174",
    emergencyContactName: "Martha Akabioyo",
    emergencyContactPhone: "+234 809 115 6029",
    sittings: [
      {
        examType: "WAEC",
        examYear: "2024",
        candidateNumber: "4455667788",
        subjects: [
          ["English Language", "B2"],
          ["Mathematics", "A1"],
          ["Physics", "B3"],
          ["Chemistry", "B2"],
          ["Technical Drawing", "A1"],
        ],
      },
    ],
    jambSubjects: [
      ["English Language", "68"],
      ["Mathematics", "62"],
      ["Physics", "59"],
      ["Chemistry", "59"],
    ],
    documents: ["Passport Photograph", "WAEC Result"],
  },
  {
    id: "HP/24/CST/0744",
    name: "Sarah Mensah",
    email: "sarah.mensah@loamportal.edu",
    phone: "+234 813 090 1154",
    gender: "Female",
    dateOfBirth: "2005-11-02",
    maritalStatus: "Single",
    nationality: "Nigerian",
    stateOfOrigin: "Cross River",
    lga: "Calabar Municipal",
    residentialAddress: "44 Marian Road, Calabar, Cross River State",
    submissionDate: "Oct 19, 2025",
    status: "Reviewed",
    jambRegistrationNumber: "202477881122CS",
    jambYear: "2025",
    jambTotal: "286",
    lastSchool: "Hope Waddell Training Institution",
    department: "Computer Science",
    sponsorName: "Mabel Mensah",
    sponsorPhone: "+234 806 551 2248",
    emergencyContactName: "Kofi Mensah",
    emergencyContactPhone: "+234 701 883 1147",
    sittings: [
      {
        examType: "WAEC",
        examYear: "2024",
        candidateNumber: "7711882233",
        subjects: [
          ["English Language", "A1"],
          ["Mathematics", "A1"],
          ["Physics", "B2"],
          ["Chemistry", "B2"],
          ["Biology", "B3"],
        ],
      },
    ],
    jambSubjects: [
      ["English Language", "72"],
      ["Mathematics", "74"],
      ["Physics", "70"],
      ["Chemistry", "70"],
    ],
    documents: ["Passport Photograph", "WAEC Result"],
  },
  {
    id: "HP/24/BUS/0188",
    name: "Chioma Okoro",
    email: "chioma.okoro@loamportal.edu",
    phone: "+234 802 667 4412",
    gender: "Female",
    dateOfBirth: "2005-08-15",
    maritalStatus: "Single",
    nationality: "Nigerian",
    stateOfOrigin: "Imo",
    lga: "Owerri Municipal",
    residentialAddress: "8 Tetlow Road, Owerri, Imo State",
    submissionDate: "Oct 08, 2025",
    status: "Approved",
    jambRegistrationNumber: "202466112299BS",
    jambYear: "2025",
    jambTotal: "271",
    lastSchool: "Girls Secondary School, Owerri",
    department: "Accountancy",
    sponsorName: "Nkechi Okoro",
    sponsorPhone: "+234 703 118 2261",
    emergencyContactName: "Pascal Okoro",
    emergencyContactPhone: "+234 809 776 0054",
    sittings: [
      {
        examType: "NECO",
        examYear: "2024",
        candidateNumber: "5511772200",
        subjects: [
          ["English Language", "B2"],
          ["Mathematics", "B2"],
          ["Economics", "A1"],
          ["Commerce", "A1"],
          ["Accounting", "B3"],
        ],
      },
    ],
    jambSubjects: [
      ["English Language", "66"],
      ["Mathematics", "68"],
      ["Economics", "69"],
      ["Commerce", "68"],
    ],
    documents: ["Passport Photograph", "NECO Result"],
  },
  {
    id: "HP/24/LAW/0283",
    name: "Eunice Nwosu",
    email: "eunice.nwosu@loamportal.edu",
    phone: "+234 811 532 8801",
    gender: "Female",
    dateOfBirth: "2006-01-24",
    maritalStatus: "Single",
    nationality: "Nigerian",
    stateOfOrigin: "Abia",
    lga: "Aba North",
    residentialAddress: "51 Faulks Road, Aba, Abia State",
    submissionDate: "Oct 05, 2025",
    status: "Rejected",
    jambRegistrationNumber: "202433228811LS",
    jambYear: "2025",
    jambTotal: "233",
    lastSchool: "National High School, Aba",
    department: "Legal Studies",
    sponsorName: "Chika Nwosu",
    sponsorPhone: "+234 814 220 1168",
    emergencyContactName: "Favour Nwosu",
    emergencyContactPhone: "+234 803 114 6627",
    sittings: [
      {
        examType: "WAEC",
        examYear: "2024",
        candidateNumber: "6677441133",
        subjects: [
          ["English Language", "C4"],
          ["Literature", "B3"],
          ["Government", "C5"],
          ["CRS", "B2"],
          ["Mathematics", "C6"],
        ],
      },
    ],
    jambSubjects: [
      ["English Language", "58"],
      ["Literature", "60"],
      ["Government", "57"],
      ["CRS", "58"],
    ],
    documents: ["Passport Photograph", "WAEC Result"],
  },
  {
    id: "HP/24/ARC/0193",
    name: "Kofi Taylor",
    email: "kofi.taylor@loamportal.edu",
    phone: "+234 805 334 7102",
    gender: "Male",
    dateOfBirth: "2005-12-09",
    maritalStatus: "Single",
    nationality: "Ghanaian",
    stateOfOrigin: "Greater Accra",
    lga: "Tema",
    residentialAddress: "14 Harbour Layout, Tema Community 3",
    submissionDate: "Oct 16, 2025",
    status: "Pending",
    jambRegistrationNumber: "202455001122AR",
    jambYear: "2025",
    jambTotal: "259",
    lastSchool: "Tema Technical Institute",
    department: "Architecture",
    sponsorName: "Kwame Taylor",
    sponsorPhone: "+233 24 111 8890",
    emergencyContactName: "Afia Taylor",
    emergencyContactPhone: "+233 55 002 1148",
    sittings: [
      {
        examType: "WAEC",
        examYear: "2024",
        candidateNumber: "7733001155",
        subjects: [
          ["English Language", "B3"],
          ["Mathematics", "B2"],
          ["Physics", "B3"],
          ["Fine Art", "A1"],
          ["Technical Drawing", "A1"],
        ],
      },
      {
        examType: "NECO",
        examYear: "2024",
        candidateNumber: "7733002255",
        subjects: [
          ["Chemistry", "B2"],
          ["Geography", "B3"],
          ["Further Mathematics", "C4"],
        ],
      },
    ],
    jambSubjects: [
      ["English Language", "63"],
      ["Mathematics", "65"],
      ["Physics", "66"],
      ["Fine Art", "65"],
    ],
    documents: ["Passport Photograph", "WAEC Result", "NECO Result"],
  },
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

export const adminStudentProfiles = [
  {
    fullName: "Emediong Ekanem",
    regNumber: "LOAM/23/ENG/042",
    matricNumber: "LOAM/23/ENG/042",
    department: "Computer Engineering",
    faculty: "School of Engineering",
    programme: "Higher National Diploma",
    level: "300 Level",
    status: "Cleared",
    session: "2024 / 2025",
    email: "emediong.ekanem@loampolytechnic.edu.ng",
    phone: "+234 803 114 2281",
    gender: "Male",
    dateOfBirth: "2002-03-11",
    address: "12 Unity Crescent, Uyo, Akwa Ibom State",
    guardianName: "Ekong Ekanem",
    guardianPhone: "+234 806 005 1943",
    admissionDate: "2023-09-18",
  },
  {
    fullName: "Emmanuel Bassey",
    regNumber: "LOAM/24/BUS/018",
    matricNumber: "LOAM/24/BUS/018",
    department: "Accountancy",
    faculty: "School of Management Sciences",
    programme: "National Diploma",
    level: "100 Level",
    status: "Cleared",
    session: "2024 / 2025",
    email: "emmanuel.bassey@loampolytechnic.edu.ng",
    phone: "+234 802 881 1940",
    gender: "Male",
    dateOfBirth: "2004-07-21",
    address: "44 Mbiabong Road, Ikot Ekpene, Akwa Ibom State",
    guardianName: "Grace Bassey",
    guardianPhone: "+234 809 445 7182",
    admissionDate: "2024-10-03",
  },
  {
    fullName: "Joshua Barnett",
    regNumber: "LOAM/22/MEC/016",
    matricNumber: "LOAM/22/MEC/016",
    department: "Mechanical Engineering",
    faculty: "School of Engineering",
    programme: "Higher National Diploma",
    level: "400 Level",
    status: "Cleared",
    session: "2024 / 2025",
    email: "joshua.barnett@loampolytechnic.edu.ng",
    phone: "+234 813 763 0092",
    gender: "Male",
    dateOfBirth: "2001-12-02",
    address: "8 Library Avenue, Eket, Akwa Ibom State",
    guardianName: "Martha Barnett",
    guardianPhone: "+234 703 983 1142",
    admissionDate: "2022-09-12",
  },
  {
    fullName: "Somto Okafor",
    regNumber: "LOAM/24/CST/033",
    matricNumber: "LOAM/24/CST/033",
    department: "Computer Science",
    faculty: "School of Applied Sciences",
    programme: "National Diploma",
    level: "200 Level",
    status: "Cleared",
    session: "2024 / 2025",
    email: "somto.okafor@loampolytechnic.edu.ng",
    phone: "+234 811 520 4419",
    gender: "Female",
    dateOfBirth: "2003-05-29",
    address: "90 Federal Housing Estate, Calabar, Cross River State",
    guardianName: "Chinelo Okafor",
    guardianPhone: "+234 810 330 7621",
    admissionDate: "2024-09-27",
  },
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

export const nigeriaStatesAndLgas = {
  Abia: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma Ngwa", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
  Adamawa: ["Demsa", "Fufure", "Ganye", "Girei", "Gombi", "Guyuk", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo-Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
  "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
  Anambra: ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
  Bauchi: ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
  Bayelsa: ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
  Benue: ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
  Borno: ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
  "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakurr", "Yala"],
  Delta: ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
  Ebonyi: ["Abakaliki", "Afikpo North", "Edda", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
  Edo: ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
  Ekiti: ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
  Enugu: ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo-Uwani"],
  Gombe: ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
  Imo: ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Onuimo", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West"],
  Jigawa: ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
  Kaduna: ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
  Kano: ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
  Katsina: ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dan Musa", "Dandume", "Danja", "Daura", "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
  Kebbi: ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
  Kogi: ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa-Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
  Kwara: ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
  Lagos: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
  Nasarawa: ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Eggon", "Obi", "Toto", "Wamba"],
  Niger: ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Munya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
  Ogun: ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu", "Yewa North", "Yewa South"],
  Ondo: ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
  Osun: ["Aiyedaade", "Aiyedire", "Atakunmosa East", "Atakunmosa West", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", "Ifedayo", "Ifelodun", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo", "Ila"],
  Oyo: ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Oriire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"],
  Plateau: ["Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
  Rivers: ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
  Sokoto: ["Binji", "Bodinga", "Dange Shuni", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
  Taraba: ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kurmi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
  Yobe: ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
  Zamfara: ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Tsafe", "Zurmi"],
  "Federal Capital Territory": ["Abaji", "Abuja Municipal Area Council", "Bwari", "Gwagwalada", "Kuje", "Kwali"],
}
