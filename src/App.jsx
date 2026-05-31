import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/index/HomePage"
import AboutPage from "./pages/index/AboutPage"
import AdmissionsPage from "./pages/index/AdmissionsPage"
import PortalPage from "./pages/index/PortalPage"
import StudentLifePage from "./pages/index/StudentLifePage"
import GalleryPage from "./pages/index/GalleryPage"
import EventsPage from "./pages/index/EventsPage"
import ContactPage from "./pages/index/ContactPage"
import AdvertsPage from "./pages/index/AdvertsPage"
import AcademicDetailPage from "./pages/index/academics/AcademicDetailPage"
import LoginPage from "./auth/login/LoginPage"
import SuperAdminLoginPage from "./auth/login/SuperAdminLoginPage"

// students routes
import StudentPortalLayout from "./pages/student-dashboard/StudentPortalLayout"
import StudentDashboardPage from "./pages/student-dashboard/StudentDashboardPage"
import StudentApplicationPage from "./pages/student-dashboard/StudentFeesPage"
import StudentAcademicFeeHistoryPage from "./pages/student-dashboard/StudentAcademicFeeHistoryPage"
// import StudentFinancialPage from "./pages/student-dashboard/StudentFinancialPage"
import StudentDocumentsPage from "./pages/student-dashboard/StudentDocumentsPage"
import StudentProfilePage from "./pages/student-dashboard/StudentProfilePage"
import CourseRegistrationPage from "./pages/student-dashboard/CourseRegistration"

// admin routes
import AdminPortalLayout from "./pages/admin-dashboard/AdminPortalLayout"
import AdminAnalyticsPage from "./pages/admin-dashboard/AdminAnalyticsPage"
import AdminApplicationsPage from "./pages/admin-dashboard/AdminApplicationsPage"
import AdminCoursesPage from "./pages/admin-dashboard/AdminCoursesPage"
import AdminDashboardPage  from "./pages/admin-dashboard/AdminDashboardPage"
import AdminFacultyPage from "./pages/admin-dashboard/AdminFacultyPage"
import AdminDepartmentManagementPage from "./pages/admin-dashboard/AdminDepartmentManagementPage"
import AdminNewsPage from "./pages/admin-dashboard/AdminNewsPage"
import AdminPaymentsPage from "./pages/admin-dashboard/AdminPaymentsPage"
import AdminResultsPage from "./pages/admin-dashboard/AdminResultsPage"
import AdminSettingsPage from "./pages/admin-dashboard/AdminSettingsPage"
import AdminStaffManagementPage from "./pages/admin-dashboard/AdminStaffManagementPage"
import AdminManageStudentsPage from "./pages/admin-dashboard/AdminManageStudentsPage"
import AdminStudentsPage from "./pages/admin-dashboard/AdminStudentsPage"
import AdminPortalManagementPage from "./pages/admin-dashboard/AdminPortalManagementPage"
import AdminHodLecturersPage from "./pages/admin-dashboard/AdminHodLecturersPage"
import { RequirePortalRole } from "./app/RequirePortalRole"
import { ScrollToTop } from "./app/ScrollToTop"
import {
  isAdmissionsSubdomain,
  isBlogSubdomain,
  isLocalDevelopment,
  isPortalSubdomain,
  getMainWebsitePath,
} from "./lib/portal-routing"

const OFFICER_LOGIN_PROPS = {
  fallbackRole: "admission_officer",
  allowedRoles: ["admission_officer", "bursary_officer"],
  title: "ADMISSION & BURSARY",
  subtitle: "Authorized Officer Access",
  heading: "Officer Login",
  description: "Login with your admission or bursary officer credentials to access the dashboard.",
  submitLabel: "Access Officer Dashboard",
}

const LECTURER_LOGIN_PROPS = {
  fallbackRole: "lecturer",
  allowedRoles: ["lecturer", "hod"],
  title: "ACADEMIC STAFF",
  subtitle: "Academic Staff Access",
  heading: "Academic Staff Login",
  description: "Login with your lecturer or HOD credentials to access academic portal tools.",
  submitLabel: "Access Academic Dashboard",
}

function MainDomainRedirect({ path }) {
  useEffect(() => {
    window.location.replace(getMainWebsitePath(path))
  }, [path])

  return null
}

function renderStudentPortalRoutes() {
  return (
    <>
      <Route index element={<StudentDashboardPage />} />
      <Route path="my-application" element={<StudentApplicationPage />} />
      <Route path="academic-fees" element={<StudentApplicationPage />} />
      <Route path="academic-fees/history" element={<StudentAcademicFeeHistoryPage />} />
      {/* <Route path="financial-statement" element={<StudentFinancialPage />} /> */}
      <Route path="documents" element={<StudentDocumentsPage />} />
      <Route path="profile-settings" element={<StudentProfilePage />} />
      <Route path="course-registration" element={<CourseRegistrationPage />} />
    </>
  )
}

function renderAdminPortalRoutes() {
  const sharedAdminRoles = ["superadmin", "admission_officer", "bursary_officer", "lecturer", "hod"]
  const superAdminRoles = ["superadmin"]
  const lecturerRoles = ["lecturer", "hod"]
  const hodRoles = ["hod"]
  const officerRoles = ["admission_officer", "bursary_officer"]

  return (
    <>
      <Route
        index
        element={
          <RequirePortalRole allowedRoles={sharedAdminRoles}>
            <AdminDashboardPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="courses"
        element={
          <RequirePortalRole allowedRoles={lecturerRoles}>
            <AdminCoursesPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="results"
        element={
          <RequirePortalRole allowedRoles={lecturerRoles}>
            <AdminResultsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="applications"
        element={
          <RequirePortalRole allowedRoles={[...officerRoles, ...hodRoles]}>
            <AdminApplicationsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="lecturers"
        element={
          <RequirePortalRole allowedRoles={hodRoles}>
            <AdminHodLecturersPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="portal-management"
        element={
          <RequirePortalRole allowedRoles={superAdminRoles}>
            <AdminPortalManagementPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="students"
        element={
          <RequirePortalRole allowedRoles={officerRoles}>
            <AdminStudentsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="students/manage"
        element={
          <RequirePortalRole allowedRoles={officerRoles}>
            <AdminManageStudentsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="payments"
        element={
          <RequirePortalRole allowedRoles={officerRoles}>
            <AdminPaymentsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="news"
        element={
          <RequirePortalRole allowedRoles={superAdminRoles}>
            <AdminNewsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="general-management"
        element={<Navigate to="departments" replace />}
      />
      <Route
        path="general-management/departments"
        element={
          <RequirePortalRole allowedRoles={superAdminRoles}>
            <AdminDepartmentManagementPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="general-management/staff"
        element={
          <RequirePortalRole allowedRoles={superAdminRoles}>
            <AdminStaffManagementPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="faculty"
        element={
          <RequirePortalRole allowedRoles={superAdminRoles}>
            <AdminFacultyPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="analytics"
        element={
          <RequirePortalRole allowedRoles={sharedAdminRoles}>
            <AdminAnalyticsPage />
          </RequirePortalRole>
        }
      />
      <Route
        path="settings"
        element={
          <RequirePortalRole allowedRoles={sharedAdminRoles}>
            <AdminSettingsPage />
          </RequirePortalRole>
        }
      />
    </>
  )
}

function renderStudentPortalShellRoutes(basePath = "") {
  const withBasePath = (path) => `${basePath}${path}`

  return (
    <>
      <Route path={withBasePath("/studentslogin")} element={<LoginPage />} />
      <Route
        path={withBasePath("/student-dashboard")}
        element={
          <RequirePortalRole allowedRoles={["student"]}>
            <StudentPortalLayout />
          </RequirePortalRole>
        }
      >
        {renderStudentPortalRoutes()}
      </Route>
    </>
  )
}

function renderAdminPortalShellRoutes(basePath = "") {
  const withBasePath = (path) => `${basePath}${path}`

  return (
    <>
      <Route path={withBasePath("/superadminlogin")} element={<SuperAdminLoginPage />} />
      <Route
        path={withBasePath("/admissionofficerlogin")}
        element={<SuperAdminLoginPage {...OFFICER_LOGIN_PROPS} />}
      />
      <Route
        path={withBasePath("/academicstafflogin")}
        element={<SuperAdminLoginPage {...LECTURER_LOGIN_PROPS} />}
      />
      <Route
        path={withBasePath("/admin-dashboard")}
        element={
          <RequirePortalRole allowedRoles={["superadmin", "admission_officer", "bursary_officer", "lecturer", "hod"]}>
            <AdminPortalLayout />
          </RequirePortalRole>
        }
      >
        {renderAdminPortalRoutes()}
      </Route>
    </>
  )
}

function App() {
  const localDevelopment = isLocalDevelopment()
  const portalHost = !localDevelopment && isPortalSubdomain()
  const admissionsHost = !localDevelopment && isAdmissionsSubdomain()
  const blogHost = !localDevelopment && isBlogSubdomain()

  return (
    <>
      <ScrollToTop />
      <Routes>
        {admissionsHost ? (
          <>
            <Route path="/" element={<AdmissionsPage />} />
          </>
        ) : blogHost ? (
          <>
            <Route path="/" element={<AdvertsPage />} />
          </>
        ) : portalHost ? (
          <>
            <Route path="/" element={<PortalPage />} />
            {renderStudentPortalShellRoutes()}
            <Route path="/superadminlogin" element={<MainDomainRedirect path="/superadminlogin" />} />
            <Route path="/admissionofficerlogin" element={<MainDomainRedirect path="/admissionofficerlogin" />} />
            <Route path="/academicstafflogin" element={<MainDomainRedirect path="/academicstafflogin" />} />
            <Route path="/admin-dashboard/*" element={<MainDomainRedirect path="/admin-dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicDetailPage />} />
            <Route path="/academics/:slug" element={<AcademicDetailPage />} />
            <Route path="/student-life" element={<StudentLifePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/adverts" element={<AdvertsPage />} />
            {localDevelopment ? <Route path="/blog" element={<AdvertsPage />} /> : null}
            {localDevelopment ? <Route path="/admissions" element={<AdmissionsPage />} /> : null}
            {localDevelopment ? <Route path="/portal" element={<PortalPage />} /> : null}
            {localDevelopment ? renderStudentPortalShellRoutes("/portal") : null}
            {renderAdminPortalShellRoutes()}
            <Route path="/contact" element={<ContactPage />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
