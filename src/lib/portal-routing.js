export const PORTAL_SUBDOMAIN_HOST = "portal.loampolytechnic.edu.ng"
export const PORTAL_SUBDOMAIN_URL = `https://${PORTAL_SUBDOMAIN_HOST}`
const MAIN_WEBSITE_URL = "https://loampolytechnic.edu.ng"

export function isPortalSubdomainHost(hostname) {
  return hostname === PORTAL_SUBDOMAIN_HOST
}

export function isPortalSubdomain() {
  if (typeof window === "undefined") return false
  return isPortalSubdomainHost(window.location.hostname)
}

export function getPortalHomeRoute() {
  return isPortalSubdomain() ? "/" : "/portal"
}

export function getStudentLoginRoute() {
  return isPortalSubdomain() ? "/studentslogin" : "/portal/studentslogin"
}

export function getMainWebsiteUrl() {
  if (!isPortalSubdomain() || typeof window === "undefined") return MAIN_WEBSITE_URL

  const mainHost = window.location.hostname.replace(/^portal\./, "")
  return `${window.location.protocol}//${mainHost}`
}

export function getAdmissionsUrl() {
  return isPortalSubdomain() ? `${getMainWebsiteUrl()}/admissions` : "/admissions"
}
