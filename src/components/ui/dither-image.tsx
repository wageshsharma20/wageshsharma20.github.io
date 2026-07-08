"use client"

/**
 * `DitherImage` — compound figure that applies a CSS-only Bayer dither effect
 * to an image via the `dither-plugin` Tailwind utility.
 * 
 * Adapted from cult-ui's DitherImage component for static export (uses <img> instead of next/image).
 * 
 * @see https://github.com/nolly-studio/cult-ui
 * @see https://github.com/flornkm/dither-plugin
 */
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type CSSProperties,
  type HTMLAttributes,
  type ImgHTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

/** Cell size of the underlying dither matrix — maps to plugin `--dither-cell-*` theme tokens. */
export type DitherSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const NUMERIC_SIZE_RE = /^\d+$/

const DITHER_SIZE_CLASS: Record<DitherSize, string> = {
  xs: "dither-xs",
  sm: "dither-sm",
  md: "dither-md",
  lg: "dither-lg",
  xl: "dither-xl",
  "2xl": "dither-2xl",
}

/** Shorthand aspect-ratio values; pass any valid `aspect-ratio` string for custom. */
export type DitherAspectRatio =
  | "square"
  | "video"
  | "portrait"
  | "wide"
  | (string & {})
  | number

function resolveAspectRatio(ratio: DitherAspectRatio): string {
  if (typeof ratio === "number") return String(ratio)
  if (ratio === "square") return "1 / 1"
  if (ratio === "video") return "16 / 9"
  if (ratio === "portrait") return "3 / 4"
  if (ratio === "wide") return "21 / 9"
  return ratio
}

/** CSS custom properties exposed by `dither-plugin`. */
interface DitherVars {
  "--dither-gray"?: number | string
  "--dither-contrast"?: number | string
  "--dither-bright"?: number | string
  "--dither-blur"?: string
  "--dither-cell"?: string
  "--dither-opacity"?: number | string
  "--dither-image"?: string
}

/* ─── Frame context (invert on dark) ───────────────────────────────────── */

const DitherImageFrameContext = createContext<{ invertOnDark: boolean } | null>(
  null
)

/* ─── Root figure ──────────────────────────────────────────────────────── */

export type DitherImageProps = ComponentProps<"figure">

const DitherImage = forwardRef<HTMLElement, DitherImageProps>(
  function DitherImage({ className, ...props }, ref) {
    return (
      <figure
        className={cn("inline-flex flex-col gap-3", className)}
        data-slot="dither-image"
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImage.displayName = "DitherImage"

/* ─── Frame (the dither surface) ───────────────────────────────────────── */

export interface DitherImageFrameProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  size?: DitherSize
  aspectRatio?: DitherAspectRatio
  grayscale?: number
  contrast?: number
  brightness?: number
  blur?: number | string
  opacity?: number
  rounded?: boolean | string
  invertOnDark?: boolean
  style?: CSSProperties & DitherVars
}

const DitherImageFrame = forwardRef<HTMLDivElement, DitherImageFrameProps>(
  function DitherImageFrame(
    {
      className,
      size = "lg",
      aspectRatio,
      grayscale,
      contrast,
      brightness,
      blur,
      opacity,
      rounded = true,
      invertOnDark = false,
      style,
      ...props
    },
    ref
  ) {
    const vars: CSSProperties & DitherVars = { ...style }

    if (grayscale !== undefined) vars["--dither-gray"] = grayscale
    if (contrast !== undefined) vars["--dither-contrast"] = contrast
    if (brightness !== undefined) vars["--dither-bright"] = brightness
    if (blur !== undefined)
      vars["--dither-blur"] = typeof blur === "number" ? `${blur}px` : blur
    if (opacity !== undefined) vars["--dither-opacity"] = opacity
    if (aspectRatio !== undefined && vars.aspectRatio === undefined)
      vars.aspectRatio = resolveAspectRatio(aspectRatio)

    let roundedClass: string | undefined
    if (rounded === true) roundedClass = "rounded-xl"
    else if (typeof rounded === "string") roundedClass = rounded

    const frame = (
      <div
        className={cn(
          DITHER_SIZE_CLASS[size],
          "relative block w-full",
          roundedClass,
          className
        )}
        data-size={size}
        data-slot="dither-image-frame"
        ref={ref}
        style={vars}
        {...props}
      />
    )

    return (
      <DitherImageFrameContext.Provider value={{ invertOnDark }}>
        {invertOnDark ? <div className="dark:invert">{frame}</div> : frame}
      </DitherImageFrameContext.Provider>
    )
  }
)
DitherImageFrame.displayName = "DitherImageFrame"

/* ─── Reveal stage ─────────────────────────────────────────────────────── */

export type DitherImageRevealProps = ComponentProps<"div"> & {
  size?: number | string
}

const DitherImageReveal = forwardRef<HTMLDivElement, DitherImageRevealProps>(
  function DitherImageReveal({ className, size, ...props }, ref) {
    let sizeClass: string | undefined
    if (size !== undefined) {
      if (typeof size === "number" || NUMERIC_SIZE_RE.test(String(size))) {
        sizeClass = `size-${size}`
      } else {
        sizeClass = String(size)
      }
    }

    return (
      <div
        className={cn("relative overflow-hidden", sizeClass, className)}
        data-slot="dither-image-reveal"
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImageReveal.displayName = "DitherImageReveal"

/* ─── Overlay (masked clean copy) ─────────────────────────────────────── */

export type DitherRevealDirection =
  | "l"
  | "r"
  | "t"
  | "b"
  | "tl-br"
  | "tr-bl"
  | "bl-tr"
  | "br-tl"
  | "radial"

export type DitherImageOverlayProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "style"
> & {
  direction?: DitherRevealDirection
  from?: number
  to?: number
  maskClassName?: string
  style?: CSSProperties
  fill?: boolean
  sizes?: string
}

function revealMaskImage(
  direction: DitherRevealDirection,
  from: number,
  to: number
): string {
  const a = Math.min(from, to)
  const b = Math.max(from, to)
  switch (direction) {
    case "r":
      return `linear-gradient(to right, black ${a}%, transparent ${b}%)`
    case "l":
      return `linear-gradient(to left, black ${a}%, transparent ${b}%)`
    case "t":
      return `linear-gradient(to bottom, black ${a}%, transparent ${b}%)`
    case "b":
      return `linear-gradient(to top, black ${a}%, transparent ${b}%)`
    case "tl-br":
      return `linear-gradient(to bottom right, black ${a}%, transparent ${b}%)`
    case "tr-bl":
      return `linear-gradient(to bottom left, black ${a}%, transparent ${b}%)`
    case "bl-tr":
      return `linear-gradient(to top right, black ${a}%, transparent ${b}%)`
    case "br-tl":
      return `linear-gradient(to top left, black ${a}%, transparent ${b}%)`
    case "radial":
      return `radial-gradient(circle at center, black ${a}%, transparent ${b}%)`
    default:
      return `linear-gradient(to right, black ${a}%, transparent ${b}%)`
  }
}

function revealMaskStyle(
  direction: DitherRevealDirection,
  from: number,
  to: number
): CSSProperties {
  const img = revealMaskImage(direction, from, to)
  return {
    WebkitMaskImage: img,
    maskImage: img,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }
}

const DitherImageOverlay = forwardRef<
  HTMLImageElement,
  DitherImageOverlayProps
>(function DitherImageOverlay(
  {
    className,
    direction = "r",
    from = 0,
    to = 65,
    maskClassName,
    style,
    fill,
    sizes,
    ...props
  },
  ref
) {
  const typedMaskStyle =
    maskClassName === undefined ? revealMaskStyle(direction, from, to) : {}

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover",
        maskClassName === undefined && "mask",
        maskClassName,
        className
      )}
      data-slot="dither-image-overlay"
      ref={ref}
      style={{ ...typedMaskStyle, ...style }}
      {...props}
    />
  )
})
DitherImageOverlay.displayName = "DitherImageOverlay"

/* ─── Image content ────────────────────────────────────────────────────── */

export type DitherImageContentProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean
  sizes?: string
}

const DitherImageContent = forwardRef<
  HTMLImageElement,
  DitherImageContentProps
>(function DitherImageContent({ className, alt, fill, sizes, ...props }, ref) {
  const ctx = useContext(DitherImageFrameContext)
  const counterInvert = ctx?.invertOnDark === true ? "dark:invert" : undefined

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn(
        "block h-full w-full object-cover",
        counterInvert,
        className
      )}
      data-slot="dither-image-content"
      ref={ref}
      {...props}
    />
  )
})
DitherImageContent.displayName = "DitherImageContent"

/* ─── Caption ──────────────────────────────────────────────────────────── */

export type DitherImageCaptionProps = ComponentProps<"figcaption">

const DitherImageCaption = forwardRef<HTMLElement, DitherImageCaptionProps>(
  function DitherImageCaption({ className, ...props }, ref) {
    return (
      <figcaption
        className={cn(
          "text-pretty text-muted-foreground text-sm leading-relaxed",
          className
        )}
        data-slot="dither-image-caption"
        ref={ref}
        {...props}
      />
    )
  }
)
DitherImageCaption.displayName = "DitherImageCaption"

export {
  DitherImage,
  DitherImageCaption,
  DitherImageContent,
  DitherImageFrame,
  DitherImageOverlay,
  DitherImageReveal,
}
