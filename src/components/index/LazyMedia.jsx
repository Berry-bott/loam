import { useEffect, useRef, useState } from "react"

export function LazyImage({
  src,
  alt,
  className = "",
  eager = false,
  fetchPriority,
  decoding,
  ...props
}) {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={fetchPriority || (eager ? "high" : undefined)}
      decoding={decoding || (eager ? "sync" : "async")}
      {...props}
    />
  )
}

export function LazyVideo({
  src,
  type = "video/mp4",
  lazy = true,
  rootMargin = "200px",
  preload,
  children,
  ...props
}) {
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(!lazy)

  useEffect(() => {
    if (!lazy || shouldLoad || !videoRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(videoRef.current)

    return () => observer.disconnect()
  }, [lazy, rootMargin, shouldLoad])

  return (
    <video ref={videoRef} preload={shouldLoad ? preload : "none"} {...props}>
      {shouldLoad ? (src ? <source src={src} type={type} /> : children) : null}
    </video>
  )
}
