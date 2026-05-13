import { Outlet } from "react-router-dom"
import { PortalShell } from "../../components/portal/PortalShell"
import { PortalButton } from "../../components/portal/PortalButton"
import { adminSidebarItems, adminTopbarLinks, logoutItem } from "../../lib/portal-data"
import { getPortalSession } from "../../lib/portal-auth"
import { Printer, Save } from "lucide-react"

const adminRoleConfig = {
  superadmin: {
    subtitle: "Super Admin Panel",
    sessionLabel: "Super Admin Portal",
    userRole: "Super Admin",
  },
  admission_officer: {
    subtitle: "Admission Officer Panel",
    sessionLabel: "Admissions Office",
    userRole: "Admission Officer",
  },
  bursary_officer: {
    subtitle: "Bursary Officer Panel",
    sessionLabel: "Bursary Office",
    userRole: "Bursary Officer",
  },
}

export default function AdminPortalLayout() {
  const session = getPortalSession()
  const roleConfig = adminRoleConfig[session?.role] || adminRoleConfig.superadmin

  return (
    <PortalShell
      title="LOAM POLYTECHNIC"
      subtitle={roleConfig.subtitle}
      sessionLabel={roleConfig.sessionLabel}
      links={adminTopbarLinks}
      items={adminSidebarItems}
      logoutItem={logoutItem}
      user={{
        name: session?.name || "Admin James Okafor",
        role: roleConfig.userRole,
        avatar: "/admin-avatar.jpeg",
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
