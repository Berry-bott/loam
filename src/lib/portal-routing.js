// export const PORTAL_SUBDOMAIN_HOST = "portal.loampolytechnic.edu.ng"
// export const PORTAL_LOCALHOST = "portal.localhost"
// export const PORTAL_SUBDOMAIN_URL = `https://${PORTAL_SUBDOMAIN_HOST}`
// export const ADMISSIONS_SUBDOMAIN_HOST = "admissions.loampolytechnic.edu.ng"
// export const ADMISSIONS_LOCALHOST = "admissions.localhost"
// export const ADMISSIONS_SUBDOMAIN_URL = `https://${ADMISSIONS_SUBDOMAIN_HOST}`
// export const BLOG_SUBDOMAIN_HOST = "blog.loampolytechnic.edu.ng"
// export const BLOG_LOCALHOST = "blog.localhost"
// export const BLOG_SUBDOMAIN_URL = `https://${BLOG_SUBDOMAIN_HOST}`
// const MAIN_WEBSITE_URL = "https://loampolytechnic.edu.ng"

// export function isPortalSubdomainHost(hostname) {
//   return hostname === PORTAL_SUBDOMAIN_HOST || hostname === PORTAL_LOCALHOST
// }

// export function isPortalSubdomain() {
//   if (typeof window === "undefined") return false
//   return isPortalSubdomainHost(window.location.hostname)
// }

// export function isAdmissionsSubdomainHost(hostname) {
//   return hostname === ADMISSIONS_SUBDOMAIN_HOST || hostname === ADMISSIONS_LOCALHOST
// }

// export function isAdmissionsSubdomain() {
//   if (typeof window === "undefined") return false
//   return isAdmissionsSubdomainHost(window.location.hostname)
// }

// export function isBlogSubdomainHost(hostname) {
//   return hostname === BLOG_SUBDOMAIN_HOST || hostname === BLOG_LOCALHOST
// }

// export function isBlogSubdomain() {
//   if (typeof window === "undefined") return false
//   return isBlogSubdomainHost(window.location.hostname)
// }

// export function getPortalHomeRoute() {
//   return isPortalSubdomain() ? "/" : "/portal"
// }

// export function getStudentLoginRoute() {
//   return isPortalSubdomain() ? "/studentslogin" : "/portal/studentslogin"
// }

// export function getMainWebsiteUrl() {
//   if (typeof window === "undefined") return MAIN_WEBSITE_URL
//   if (!isPortalSubdomain() && !isAdmissionsSubdomain() && !isBlogSubdomain()) return MAIN_WEBSITE_URL

//   const mainHost = window.location.hostname.replace(/^(portal|admissions|blog)\./, "")
//   return `${window.location.protocol}//${mainHost}`
// }

// export function getAdmissionsUrl() {
//   return isAdmissionsSubdomain() ? "/" : ADMISSIONS_SUBDOMAIN_URL
// }

// export function getBlogUrl() {
//   return isBlogSubdomain() ? "/" : BLOG_SUBDOMAIN_URL
// }

// export function getMainWebsitePath(path = "/") {
//   return `${getMainWebsiteUrl()}${path}`
// }







export const MAIN_DOMAIN =
  "loampolytechnic.edu.ng"
  

export const PORTAL_HOST =
  "portal.loampolytechnic.edu.ng"

export const ADMISSIONS_HOST =
  "admissions.loampolytechnic.edu.ng"

export const BLOG_HOST =
  "blog.loampolytechnic.edu.ng"

export function getHostname() {
  if (typeof window === "undefined") {
    return ""
  }

  return window.location.hostname
}

export const MAIN_WEBSITE_URL =
  `https://${MAIN_DOMAIN}`

export const PORTAL_SUBDOMAIN_URL =
  `https://${PORTAL_HOST}`

export const ADMISSIONS_SUBDOMAIN_URL =
  `https://${ADMISSIONS_HOST}`

export const BLOG_SUBDOMAIN_URL =
  `https://${BLOG_HOST}`

export function isLocalDevelopment() {
  const host = getHostname()

  return (
    host === "localhost" ||
    host === "127.0.0.1"
  )
}

/*
|--------------------------------------------------------------------------
| Current Subdomain Detection
|--------------------------------------------------------------------------
*/

export function isPortalSubdomain() {
  const host = getHostname()

  if (isLocalDevelopment()) {
    return window.location.pathname.startsWith(
      "/portal"
    )
  }

  return host === PORTAL_HOST
}

export function isAdmissionsSubdomain() {
  const host = getHostname()

  if (isLocalDevelopment()) {
    return window.location.pathname.startsWith(
      "/admissions"
    )
  }

  return host === ADMISSIONS_HOST
}

export function isBlogSubdomain() {
  const host = getHostname()

  if (isLocalDevelopment()) {
    return window.location.pathname.startsWith(
      "/blog"
    )
  }

  return host === BLOG_HOST
}

export function isAnySubdomain() {
  return (
    isPortalSubdomain() ||
    isAdmissionsSubdomain() ||
    isBlogSubdomain()
  )
}

/*
|--------------------------------------------------------------------------
| Main Website
|--------------------------------------------------------------------------
*/

export function getMainWebsiteUrl() {
  if (isLocalDevelopment()) {
    return `${window.location.protocol}//localhost:${window.location.port}`
  }

  return `https://${MAIN_DOMAIN}`
}

export function getMainWebsitePath(
  path = "/"
) {
  return `${getMainWebsiteUrl()}${path}`
}

/*
|--------------------------------------------------------------------------
| Subdomain URLs
|--------------------------------------------------------------------------
*/

export function getPortalUrl() {
  if (isLocalDevelopment()) {
    return "/portal"
  }

  return `https://${PORTAL_HOST}`
}

export function getAdmissionsUrl() {
  if (isLocalDevelopment()) {
    return "/admissions"
  }

  return `https://${ADMISSIONS_HOST}`
}

export function getBlogUrl() {
  if (isLocalDevelopment()) {
    return "/blog"
  }

  return `https://${BLOG_HOST}`
}

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

export function getHomeUrl() {
  return isAnySubdomain()
    ? getMainWebsiteUrl()
    : "/"
}

export function getAboutUrl() {
  return isAnySubdomain()
    ? getMainWebsitePath("/about")
    : "/about"
}

export function getContactUrl() {
  return isAnySubdomain()
    ? getMainWebsitePath("/contact")
    : "/contact"
}

export function getNewsUrl() {
  return isAnySubdomain()
    ? getMainWebsitePath("/news")
    : "/news"
}

/*
|--------------------------------------------------------------------------
| Portal Routes
|--------------------------------------------------------------------------
*/

export function getPortalHomeRoute() {
  if (isLocalDevelopment()) {
    return "/portal"
  }

  return isPortalSubdomain()
    ? "/"
    : "/portal"
}

export function getStudentLoginRoute() {
  if (isLocalDevelopment()) {
    return "/portal/studentslogin"
  }

  return isPortalSubdomain()
    ? "/studentslogin"
    : "/portal/studentslogin"
}

export function getAdminLoginRoute() {
  if (isLocalDevelopment()) {
    return "/portal/superadminlogin"
  }

  return isPortalSubdomain()
    ? "/superadminlogin"
    : "/portal/superadminlogin"
}

export function getStudentDashboardRoute(path = "") {
  return `${getPortalHomeRoute()}/student-dashboard${path}`
}

export function getAdminDashboardRoute(path = "") {
  return `${getPortalHomeRoute()}/admin-dashboard${path}`
}
