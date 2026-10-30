"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { formatPrice, type Product } from "@/lib/products"
import { useCart } from "./cart-context"

export function ProductGrid({ products }: { products: Product[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.1 },
    )

    const grid = gridRef.current
    const header = headerRef.current
    if (grid) gridObserver.observe(grid)
    if (header) headerObserver.observe(header)

    return () => {
      if (grid) gridObserver.unobserve(grid)
      if (header) headerObserver.unobserve(header)
    }
  }, [])

  return (
    <section id="collection" className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 lg:mb-12">
          <span
            className={`mb-3 block text-xs uppercase tracking-[0.28em] text-primary ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={
              headerVisible
                ? { animationDelay: "0.2s", animationFillMode: "forwards" }
                : undefined
            }
          >
            Our Collection
          </span>
          <h2
            className={`max-w-2xl font-serif text-4xl leading-tight text-foreground text-balance lg:text-5xl ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={
              headerVisible
                ? { animationDelay: "0.4s", animationFillMode: "forwards" }
                : undefined
            }
          >
            Boutique styles, better prices
          </h2>
          <p
            className={`mt-4 max-w-xl text-base leading-7 text-muted-foreground ${headerVisible ? "animate-blur-in opacity-0" : "opacity-0"}`}
            style={
              headerVisible
                ? { animationDelay: "0.6s", animationFillMode: "forwards" }
                : undefined
            }
          >
            Boutique-inspired suits and occasionwear, selected for your wardrobe
            and priced for real life.
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-12"
        >
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={`group transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="group-hover:-translate-y-1 boty-transition">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover boty-transition group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs tracking-wide ${
                        product.badge === "Sale"
                          ? "bg-destructive text-destructive-foreground"
                          : product.badge === "New"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {/* Quick add button */}
                  <button
                    type="button"
                    className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 opacity-0 backdrop-blur-sm translate-y-2 boty-transition boty-shadow group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addItem({
                        productId: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                      })
                    }}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-4 h-4 text-foreground" />
                  </button>
                </div>

                {/* Info */}
                <div className="pt-4">
                  <h3 className="mb-1 font-serif text-base text-foreground lg:text-lg">
                    {product.name}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-medium text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-none bg-black px-8 py-4 text-sm tracking-wide text-white boty-transition boty-shadow hover:bg-black/90"
          >
            View All Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
