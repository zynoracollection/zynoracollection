"use client"

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ayesha K.",
    location: "Lahore",
    rating: 5,
    text: "The Noor suit arrived stitched and ready to wear, and the embroidery looks even better in person. I wore it to a mehndi and got so many compliments.",
    product: "Noor Embroidered Suit",
  },
  {
    id: 2,
    name: "Hira M.",
    location: "Karachi",
    rating: 5,
    text: "I was worried about ordering online, but the fabric quality is lovely and the size guide was accurate. The dupatta is my favourite part.",
    product: "Aurelia Silk Suit",
  },
  {
    id: 3,
    name: "Sana R.",
    location: "Islamabad",
    rating: 5,
    text: "Meher is so light and comfortable. I have worn it to lunch twice already and it still looks crisp after a gentle wash.",
    product: "Meher Chikankari Suit",
  },
  {
    id: 4,
    name: "Mariam T.",
    location: "Rawalpindi",
    rating: 4,
    text: "Beautiful print and true to the photos. Delivery took two days and the team confirmed my address on WhatsApp before dispatch.",
    product: "Zara Printed Suit",
  },
  {
    id: 5,
    name: "Fatima A.",
    location: "Faisalabad",
    rating: 5,
    text: "The finishing is what surprised me most. It genuinely feels like a boutique piece, not something rushed. Already eyeing my second order.",
    product: "Noor Embroidered Suit",
  },
  {
    id: 6,
    name: "Zainab S.",
    location: "Multan",
    rating: 5,
    text: "Cash on delivery made it easy to try the brand. The suit was packed carefully and the colours matched the website exactly.",
    product: "Aurelia Silk Suit",
  },
  {
    id: 7,
    name: "Nimra H.",
    location: "Peshawar",
    rating: 5,
    text: "Finally a suit that works for a daytime event without feeling overdressed. The chikankari detail is delicate and so pretty.",
    product: "Meher Chikankari Suit",
  },
  {
    id: 8,
    name: "Rida B.",
    location: "Sialkot",
    rating: 5,
    text: "Ordered the Zara suit for Eid lunch and it was perfect. Comfortable, colourful and the dupatta drapes beautifully.",
    product: "Zara Printed Suit",
  },
  {
    id: 9,
    name: "Amna J.",
    location: "Gujranwala",
    rating: 5,
    text: "The team helped me pick a size over the phone. That kind of service is rare, and the suit fits exactly as promised.",
    product: "Noor Embroidered Suit",
  },
]

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) => (
  <div
    className="mb-4 flex-shrink-0 rounded-3xl bg-white p-6"
    style={{
      boxShadow:
        "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
    }}
  >
    {/* Stars */}
    <div className="mb-4 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
      {Array.from({ length: testimonial.rating }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>

    {/* Quote */}
    <p className="mb-4 font-serif text-xl font-medium tracking-wide text-foreground/80 text-pretty">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
      </div>
      <span className="whitespace-nowrap rounded-full bg-primary/5 px-2 py-1 text-xs tracking-wide text-primary/70">
        {testimonial.product}
      </span>
    </div>
  </div>
)

export function Testimonials() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const column1 = [testimonials[0], testimonials[3], testimonials[6]]
  const column2 = [testimonials[1], testimonials[4], testimonials[7]]
  const column3 = [testimonials[2], testimonials[5], testimonials[8]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const header = headerRef.current
    if (header) observer.observe(header)

    return () => {
      if (header) observer.unobserve(header)
    }
  }, [])

  return (
    <section className="overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span
            className={`mb-4 block text-sm uppercase tracking-[0.3em] text-primary ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={
              headerVisible
                ? { animationDelay: "0.2s", animationFillMode: "forwards" }
                : undefined
            }
          >
            Kind Words
          </span>
          <h2
            className={`font-serif text-4xl leading-tight text-foreground text-balance md:text-7xl ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={
              headerVisible
                ? { animationDelay: "0.4s", animationFillMode: "forwards" }
                : undefined
            }
          >
            Loved by our customers
          </h2>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

          {/* Mobile - Single Column */}
          <div className="h-[600px] md:hidden">
            <div className="relative h-full overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard
                    key={`mobile-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop - Three Columns */}
          <div className="hidden h-[600px] gap-4 md:grid md:grid-cols-3">
            {/* Column 1 - Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard
                    key={`col1-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>

            {/* Column 2 - Scrolling Up */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-up hover:animate-scroll-up-slow">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard
                    key={`col2-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>

            {/* Column 3 - Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column3, ...column3].map((testimonial, index) => (
                  <TestimonialCard
                    key={`col3-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        .animate-scroll-down-slow {
          animation: scroll-down 60s linear infinite;
        }

        .animate-scroll-up-slow {
          animation: scroll-up 60s linear infinite;
        }
      `}</style>
    </section>
  )
}
