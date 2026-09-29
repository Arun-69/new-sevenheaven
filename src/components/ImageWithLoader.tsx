"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Drop-in replacement for next/image (use it with `fill` inside a
 * `relative` parent). Shows a placeholder with the studio logo centered
 * (gently pulsing + shimmer) until the photo has loaded, then the photo
 * "develops" in like a freshly taken picture (blur -> sharp, fade in).
 *
 * Images are lazy-loaded by default (only fetched when they come near the
 * viewport). Pass `priority` for above-the-fold images.
 *
 * Works everywhere: public site, story pages and the admin panel.
 */
export default function ImageWithLoader({
  className,
  onLoad,
  onError,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const srcKey =
    typeof props.src === "string"
      ? props.src
      : "src" in props.src
      ? props.src.src
      : props.src.default.src;

  // Reset when the src changes (e.g. admin uploads a replacement image) and
  // handle images that were already cached before React hydrated.
  useEffect(() => {
    setFailed(false);
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
    else setLoaded(false);
  }, [srcKey]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center bg-[#1a140c] transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {!failed && <div className="absolute inset-0 shimmer" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.logo}
          alt=""
          className={`relative w-[38%] max-w-[56px] aspect-square h-auto rounded-full object-contain opacity-90 ${
            failed ? "" : "animate-pulse-soft"
          }`}
        />
      </div>
      <Image
        {...props}
        ref={imgRef}
        className={`${className || ""} transition-all duration-700 ease-out ${
          loaded ? "opacity-100 blur-none scale-100" : "opacity-0 blur-lg scale-[1.04]"
        }`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setFailed(true);
          onError?.(e);
        }}
      />
    </>
  );
}
