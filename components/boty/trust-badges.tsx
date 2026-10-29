"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Droplets, Sparkles, Flower2 } from "lucide-react"

const badges = [
  {
    icon: Leaf,
    title: "Boutique Inspired",
    description: "Handpicked statement styles"
  },
  {
    icon: Droplets,
    title: "Better Value",
    description: "Premium looks at friendly prices"
  },
  {
    icon: Sparkles,
    title: "Occasion Ready",
    description: "Festive, wedding and everyday edits"
  },
  {
    icon: Flower2,
    title: "Fresh Collections",
    description: "New boutique finds added often"
  }
]

export function TrustBadges() {
  const track = [...badges, ...badges]

  return (
    <section className="bg-background pt-8 pb-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 overflow-hidden">
        <div className="relative">
          <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {track.map((badge, index) => (
            <div
              key={`${badge.title}-${index}`}
              className="flex items-center gap-3 shrink-0 px-6"
            >
              <badge.icon className="text-primary size-8 shrink-0" strokeWidth={1} />
              <div className="flex flex-col">
                <h3 className="font-serif text-foreground text-lg">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
