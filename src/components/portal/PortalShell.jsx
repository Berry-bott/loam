import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PortalSidebar } from "./PortalSidebar"
import { PortalTopbar } from "./PortalTopbar"
import { clearPortalSession, getPortalSession, isAdminPortalRole } from "../../lib/portal-auth"
import { getPortalHomeRoute } from "../../lib/portal-routing"
import { useAuthStore } from "../../store/admin/authStore"

export function PortalShell({
  title,
  subtitle,
  sessionLabel,
  links,
  items,
  logoutItem,
  user,
  children,
  footer,
  showThemeToggle = false,
  searchPlaceholder = "",
}) {
  const navigate = useNavigate()
  const { logoutAdmin } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const shellClassName = useMemo(
    () =>
      darkMode
        ? "bg-stone-900 text-stone-100"
        : "bg-[radial-gradient(circle,_rgba(137,110,86,0.18)_1.2px,_transparent_1.2px)] [background-size:28px_28px] bg-stone-100 text-red-950",
    [darkMode],
  )

  const panelClassName = darkMode ? "bg-stone-900 border-stone-800" : "bg-stone-50 border-stone-200"
  const contentClassName = darkMode ? "bg-stone-900" : "bg-portal-surface"

  const handleLogout = async () => {
    const session = getPortalSession()

    try {
      if (isAdminPortalRole(session?.role)) {
        await logoutAdmin()
      }
    } catch {
      // Always clear local session and continue to login screen.
    } finally {
      clearPortalSession()
      navigate(isAdminPortalRole(session?.role) ? "/superadminlogin" : getPortalHomeRoute())
    }
  }

  return (
<div className={`h-screen w-full ${shellClassName}`}>
  <div className="h-full w-full">
    <div  className={`h-full w-full overflow-hidden border shadow-[0_30px_70px_rgba(75,21,12,0.12)] sm:rounded-[16px] ${panelClassName}`}
    >
      <div className="flex h-full min-h-0">
        <PortalSidebar
          title={title}
          subtitle={subtitle}
          items={items}
          logoutItem={logoutItem}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />

        <div
          className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto ${contentClassName}`}
        >
          <PortalTopbar
            sessionLabel={sessionLabel}
            links={links}
            user={user}
            onMenuClick={() => setSidebarOpen(true)}
            showThemeToggle={showThemeToggle}
            darkMode={darkMode}
            onThemeToggle={() => setDarkMode((value) => !value)}
            searchPlaceholder={searchPlaceholder}
          />

          <main className="flex-1 px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
            {children}
          </main>

          {footer ? (
            <footer className="border-t border-topbar-border px-3 py-3 text-[10px] uppercase tracking-[0.12em] text-staff-meta-soft sm:px-5 lg:px-6">
              {typeof footer === "string" ? (
                footer
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {footer}
                </div>
              )}
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

