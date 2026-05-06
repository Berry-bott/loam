import { useEffect } from "react"
import { X } from "lucide-react"
import { AdmissionsApplicationForm } from "./AdmissionsApplicationForm"

export function ApplicationModal({ isOpen, onClose, onReadGuideline }) {
  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow

    if (isOpen) {
      body.style.overflow = "hidden"
    }

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/60 p-2 backdrop-blur-sm ">
      <div
        data-application-scroll-container="true"
        className="relative max-h-[100dvh] w-full max-w-4xl overflow-y-auto bg-background shadow-2xl [scrollbar-width:none] 
        [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:max-h-[95vh] rounded-lg sm:p-4 md:p-4"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/95
           text-foreground transition-colors hover:bg-secondary sm:right-4 sm:top-4"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 pr-12 p-2  md:p-0">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent ">Online Application</p>
          <h2 className="mb- pr-2 font-serif text-xl font-bold md:text-3xl">Apply to Loam Polytechnic</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Complete your application in four simple steps
          </p>
        </div>

        <AdmissionsApplicationForm onClose={onClose} onViewGuide={onReadGuideline} />
      </div>
    </div>
  )
}
