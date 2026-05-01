import { Outlet } from "react-router-dom"
import { PortalShell } from "../../components/portal/PortalShell"
import { PortalButton } from "../../components/portal/PortalButton"
import { adminSidebarItems, adminTopbarLinks, logoutItem } from "../../lib/portal-data"
import { getPortalSession } from "../../lib/portal-auth"
import { Printer, Save } from "lucide-react"

export default function AdminPortalLayout() {
  const session = getPortalSession()

  return (
    <PortalShell
      title="LOAM POLYTECHNIC"
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
      footer={
        <>
          <span>Registry operations. Authorized personnel only.</span>
          <div className="flex flex-wrap gap-3">
            <PortalButton variant="outline" size="sm">
              <Printer className="h-4 w-4" />
              Print Ledger
            </PortalButton>
            <PortalButton size="sm">
              <Save className="h-4 w-4" />
              Save Upload
            </PortalButton>
          </div>
        </>
      }
      showThemeToggle
      searchPlaceholder="Search records..."
    >
      <Outlet />
    </PortalShell>
  )
}
