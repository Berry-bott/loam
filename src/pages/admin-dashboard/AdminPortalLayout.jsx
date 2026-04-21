import { Outlet } from "react-router-dom"
import { PortalShell } from "../../components/portal/PortalShell"
import { adminSidebarItems, adminTopbarLinks, logoutItem } from "../../lib/portal-data"
import { getPortalSession } from "../../lib/portal-auth"

export default function AdminPortalLayout() {
  const session = getPortalSession()

  return (
    <PortalShell
      title="LOAM POLY"
      subtitle="Super Admin Panel"
      sessionLabel="Super Admin Portal"
      links={adminTopbarLinks}
      items={adminSidebarItems}
      logoutItem={logoutItem}
      user={{
        name: session?.name || "Admin James Okafor",
        role: "Super Admin",
        avatar: "/IMG_3173.jpeg",
      }}
      footer="Registry operations. Authorized personnel only."
      showThemeToggle
      searchPlaceholder="Search records..."
    >
      <Outlet />
    </PortalShell>
  )
}
