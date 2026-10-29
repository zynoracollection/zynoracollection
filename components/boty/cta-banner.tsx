"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Leaf, Flower2, Globe } from "lucide-react"

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const banner = bannerRef.current
    if (banner) {
      observer.observe(banner)
    }

    return () => {
      if (banner) {
        observer.unobserve(banner)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={bannerRef}
          className={`rounded-3xl p-12 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[400px] transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background Image */}
          <Image
            src="/images/products/aurelia-silk-suit.png"
            alt="Aurelia silk suit in crimson and gold"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10 text-left max-w-2xl">
            <h3 className="text-4xl md:text-5xl text-white mb-4 lg:text-5xl">
              Boutique looks
            </h3>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white/70 mb-8">
              Up to 33% less
            </h3>
            
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-white/90">
                <Leaf className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Original price: Rs. 6,000</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Flower2 className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Zynora price: Rs. 4,000</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Globe className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Limited boutique collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
