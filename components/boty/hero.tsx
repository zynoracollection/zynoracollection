"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#e3e1e2]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.png"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            <span
              className="mb-6 block text-sm uppercase tracking-normal text-black animate-blur-in opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Curated boutique fashion
            </span>
            <h2 className="mb-6 font-serif text-5xl leading-[1.1] text-black text-balance md:text-6xl lg:text-7xl">
              <span
                className="block font-semibold animate-blur-in opacity-0"
                style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
              >
                Style beautifully.
              </span>
              <span
                className="block font-semibold text-7xl animate-blur-in opacity-0 xl:text-9xl"
                style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
              >
                Made for you.
              </span>
            </h2>
            <p
              className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-black animate-blur-in opacity-0 lg:mx-0"
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              Discover famous boutique suits at ZynoraCollection—beautifully
              curated styles at prices that make luxury feel within reach.
            </p>
            <div
              className="flex flex-col justify-center gap-4 animate-blur-in opacity-0 sm:flex-row lg:justify-start"
              style={{ animationDelay: "1s", animationFillMode: "forwards" }}
            >
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-3 rounded-none bg-black px-8 py-4 text-sm tracking-wide text-white boty-transition boty-shadow hover:bg-black/90"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 boty-transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-black">
        <span className="text-xs font-bold uppercase tracking-widest">
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-foreground/20">
          <div className="absolute left-0 top-0 h-1/2 w-full animate-pulse bg-foreground/60" />
        </div>
      </div>
    </section>
  )
}
