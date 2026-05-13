import { Outlet } from "react-router-dom"
import { PortalShell } from "../../components/portal/PortalShell"
import { logoutItem, studentSidebarItems, studentTopbarLinks } from "../../lib/portal-data"
import { getPortalSession } from "../../lib/portal-auth"

export default function StudentPortalLayout() {
  const session = getPortalSession()

  return (
    <PortalShell
      title="LOAM POLYTECHNIC"
      subtitle="Student Portal"
      sessionLabel="Student Hub"
      links={studentTopbarLinks}
      items={studentSidebarItems}
      logoutItem={logoutItem}
      user={{
        name: session?.name || "Udo Thompson",
        role: "Student",
        avatar: "/student-avatar.jpeg",
      }}
      footer="Loam Polytechnic. Academic user access only."
    >
      <Outlet />
    </PortalShell>
  )
}
