import { useState } from "react"
import { GraduationCap, X } from "lucide-react"
import { Button } from "../../ui/button"

export function FloatingScholarshipIcon() {
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-2">
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxWidth: hovered && !showModal ? "240px" : "0px", opacity: hovered && !showModal ? 1 : 0 }}
        >
          <div className="whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg">
            Loam Polytechnic Scholarship
          </div>
        </div>

        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setShowModal(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-foreground text-background shadow-xl transition-all duration-300 hover:scale-110"
        >
          <GraduationCap className="h-6 w-6" />
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-background p-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
              <GraduationCap className="h-9 w-9 text-amber-600" />
            </div>

            <h3 className="mb-2 font-serif text-2xl font-bold">Scholarship Portal</h3>
            <p className="mb-6 text-sm text-muted-foreground">Loam Polytechnic Tuition-Free Scholarship</p>

            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="mb-1 text-base font-semibold text-amber-800">Portal Not Available Yet</p>
              <p className="text-sm text-amber-700">
                The scholarship portal is currently closed. Please check back later or subscribe to be notified when applications open.
              </p>
            </div>

            <Button variant="outline" className="w-full rounded-full" onClick={() => setShowModal(false)}>
              Try Again Later
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
