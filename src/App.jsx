import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/index/HomePage"
import AboutPage from "./pages/index/AboutPage"
import AdmissionsPage from "./pages/index/AdmissionsPage"
import PortalPage from "./pages/index/PortalPage"
import StudentLifePage from "./pages/index/StudentLifePage"
import GalleryPage from "./pages/index/GalleryPage"
import EventsPage from "./pages/index/EventsPage"
import ContactPage from "./pages/index/ContactPage"
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
import { RequirePortalRole } from "./app/RequirePortalRole"
import { ScrollToTop } from "./app/ScrollToTop"
import { isAdmissionsSubdomain, isPortalSubdomain } from "./lib/portal-routing"

function App() {
  const portalHost = isPortalSubdomain()
  const admissionsHost = isAdmissionsSubdomain()

  return (
    <>
      <ScrollToTop />
      <Routes>
        {admissionsHost ? (
          <>
            <Route path="/" element={<AdmissionsPage />} />
          </>
        ) : portalHost ? (
          <>
            <Route path="/" element={<PortalPage />} />
            <Route path="/studentslogin" element={<LoginPage />} />
            <Route path="/superadminlogin" element={<SuperAdminLoginPage />} />
            <Route
              path="/admissionofficerlogin"
              element={
                <SuperAdminLoginPage
                  fallbackRole="admission_officer"
                  allowedRoles={["admission_officer", "bursary_officer"]}
                  title="ADMISSION & BURSARY"
                  subtitle="Authorized Officer Access"
                  heading="Officer Login"
                  description="Login with your admission or bursary officer credentials to access the dashboard."
                  submitLabel="Access Officer Dashboard"
                />
              }
            />

            <Route
              path="/student-dashboard"
              element={
                <RequirePortalRole allowedRoles={["student"]}>
                  <StudentPortalLayout />
                </RequirePortalRole>
              }
            >
              <Route index element={<StudentDashboardPage />} />
              <Route path="my-application" element={<StudentApplicationPage />} />
              <Route path="academic-fees" element={<StudentApplicationPage />} />
              <Route path="academic-fees/history" element={<StudentAcademicFeeHistoryPage />} />
              {/* <Route path="financial-statement" element={<StudentFinancialPage />} /> */}
              <Route path="documents" element={<StudentDocumentsPage />} />
              <Route path="profile-settings" element={<StudentProfilePage />} />
              <Route path="course-registration" element={<CourseRegistrationPage />} />
            </Route>

            <Route
              path="/admin-dashboard"
              element={
                <RequirePortalRole allowedRoles={["superadmin", "admission_officer", "bursary_officer"]}>
                  <AdminPortalLayout />
                </RequirePortalRole>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="courses" element={<AdminCoursesPage />} />
              <Route path="results" element={<AdminResultsPage />} />
              <Route path="applications" element={<AdminApplicationsPage />} />
              <Route path="portal-management" element={<AdminPortalManagementPage />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="students/manage" element={<AdminManageStudentsPage />} />
              <Route path="payments" element={<AdminPaymentsPage />} />
              <Route path="news" element={<AdminNewsPage />} />
              <Route path="general-management" element={<AdminFacultyPage />} />
              <Route path="general-management/departments" element={<AdminDepartmentManagementPage />} />
              <Route path="general-management/staff" element={<AdminStaffManagementPage />} />
              <Route path="faculty" element={<AdminFacultyPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/student-life" element={<StudentLifePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
