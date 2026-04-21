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
      sessionLabel="Academic Session 2024 / 2025"
      links={studentTopbarLinks}
      items={studentSidebarItems}
      logoutItem={logoutItem}
      user={{
        name: session?.name || "Adewale John",
        role: "Student",
        avatar: "/IMG_3175.jpeg",
      }}
      footer="Loam Polytechnic. Academic user access only."
    >
      <Outlet />
    </PortalShell>
  )
}

