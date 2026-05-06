import { useState } from "react"
import { Bell, LifeBuoy, Menu, Moon, Search, Sun } from "lucide-react"
import { PortalDropdown } from "./PortalDropdown"

export function PortalTopbar({
  sessionLabel,
  links = [],
  user,
  onMenuClick,
  showThemeToggle = false,
  darkMode = false,
  onThemeToggle,
  searchPlaceholder = "",
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  const notifications = [
    { label: "New application batch assigned", meta: "Now" },
    { label: "Payment reconciliation report ready", meta: "12m" },
    { label: "Portal sync completed successfully", meta: "1h" },
  ]

  return (
    <header className="sticky top-0 z-[120] isolate border-b border-topbar-border bg-admin-registry-bg px-3 py-3 sm:px-5 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-staff-payload-border bg-white text-portal-brand-strong lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-topbar-accent">
              {sessionLabel}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-5 text-xs text-topbar-link lg:flex">
          {links.map((link) => (
            <button key={link} className="transition-colors hover:text-portal-brand-strong">
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {searchPlaceholder ? (
            <label className="hidden items-center gap-2 rounded-[6px] border border-staff-payload-border bg-white px-3 text-topbar-button-text md:flex">
              <Search className="h-4 w-4" />
              <input
                className="h-10 w-[170px] bg-transparent text-sm text-topbar-input-text outline-none placeholder:text-topbar-placeholder xl:w-[220px]"
                placeholder={searchPlaceholder}
              />
            </label>
          ) : (
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-staff-payload-border bg-white text-topbar-button-text">
              <Search className="h-4 w-4" />
            </button>
          )}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-staff-payload-border bg-white text-topbar-button-text md:hidden"
            onClick={() => setSearchOpen((value) => !value)}
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>
          <PortalDropdown
            label={<Bell className="h-4 w-4" />}
            items={notifications}
            className="hidden sm:block"
            menuClassName="w-[280px]"
            triggerClassName="w-10 justify-center px-0"
          />
          {showThemeToggle ? (
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-staff-payload-border bg-white text-topbar-button-text"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          ) : null}
          <PortalDropdown
            label={
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] sm:block">
                  Account
                </span>
              </div>
            }
            items={[
              { label: user.name, meta: user.role },
              { label: "Profile Settings" },
              { label: "Support Center" },
            ]}
            menuClassName="w-[250px]"
            triggerClassName="px-2 sm:px-3"
          />
        </div>
      </div>
      {searchPlaceholder && searchOpen ? (
        <div className="mt-3 md:hidden">
          <label className="flex items-center gap-2 rounded-[6px] border border-staff-payload-border bg-white px-3 text-topbar-button-text">
            <Search className="h-4 w-4" />
            <input
              className="h-10 w-full bg-transparent text-sm text-topbar-input-text outline-none placeholder:text-topbar-placeholder"
              placeholder={searchPlaceholder}
            />
          </label>
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-topbar-link lg:hidden">
        {links.map((link) => (
          <button key={link} className="rounded-full border border-staff-payload-border bg-white px-3 py-2 transition-colors hover:text-portal-brand-strong">
            {link}
          </button>
        ))}
        <button className="rounded-full border border-staff-payload-border bg-white px-3 py-2 text-topbar-link sm:hidden">
          <LifeBuoy className="mr-1 inline h-3.5 w-3.5" />
          Help
        </button>
      </div>
    </header>
  )
}
