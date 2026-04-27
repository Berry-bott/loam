import { useEffect } from "react"
import { X } from "lucide-react"
import { ApplicationForm } from "./ApplicationForm"

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
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center bg-black/60 p-4 backdrop-blur-sm "
      onClick={onClose}
    >
      <div
        className="relative h-screen w-full max-w-4xl overflow-y-auto rounded-[28px] bg-background p-5 shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/95 text-foreground transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb- pr-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">Online Application</p>
          <h2 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Apply to Loam Polytechnic</h2>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Complete your application in four simple steps, then close this window to continue reading the admission information below.
          </p>
        </div>

        <ApplicationForm onClose={onClose} onReadGuideline={onReadGuideline} />
      </div>
    </div>
  )
}
