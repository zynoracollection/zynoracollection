"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  ChevronLeft,
  Check,
  Minus,
  Plus,
  Star,
  Sparkles,
  Scissors,
  Truck,
  ShieldCheck,
} from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import {
  formatPrice,
  getRelatedProducts,
  type Product,
} from "@/lib/products"
import { getProductOverride } from "@/lib/product-overrides"

const benefits = [
  { icon: Sparkles, label: "Boutique finish" },
  { icon: Scissors, label: "Unstitched 3-piece" },
  { icon: Truck, label: "Fast delivery" },
  { icon: ShieldCheck, label: "Easy exchange" },
]

type AccordionSection = "details" | "fabric" | "care" | "delivery"

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [displayProduct, setDisplayProduct] = useState(product)
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] =
    useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)
  const relatedProducts = getRelatedProducts(product.id)

  useEffect(() => {
    window.scrollTo(0, 0)
    const override = getProductOverride(product.id)
    if (override) queueMicrotask(() => setDisplayProduct({ ...product, ...override }))
  }, [product])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion((current) => (current === section ? null : section))
  }

  const addToCart = () => {
    addItem(
      {
        productId: product.id,
        name: displayProduct.name,
        description: displayProduct.description,
        price: displayProduct.price,
        image: displayProduct.image,
      },
      quantity,
    )
    setIsAdded(true)
    window.setTimeout(() => setIsAdded(false), 2000)
  }

  const accordionItems: {
    key: AccordionSection
    title: string
    content: string
  }[] = [
    { key: "details", title: "Details", content: displayProduct.details },
    { key: "fabric", title: "Fabric", content: displayProduct.fabric },
    { key: "care", title: "Care Guide", content: displayProduct.care },
    { key: "delivery", title: "Delivery & Exchange", content: displayProduct.delivery },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground boty-transition hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-card boty-shadow">
              <Image
                src={displayProduct.image}
                alt={displayProduct.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            {displayProduct.video && (
              <video
                className="mt-4 w-full rounded-3xl bg-card boty-shadow"
                controls
                preload="metadata"
                poster={displayProduct.image}
                playsInline
              >
                <source src={displayProduct.video} />
                Your browser does not support product video playback.
              </video>
            )}

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <span className="mb-2 block text-sm uppercase tracking-[0.3em] text-primary">
                  ZynoraCollection
                </span>
                <h1 className="mb-3 font-serif text-4xl text-foreground md:text-5xl">
                  {displayProduct.name}
                </h1>
                <p className="mb-4 text-lg italic text-muted-foreground">
                  {displayProduct.tagline}
                </p>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Loved by our customers
                  </span>
                </div>

                <p className="leading-relaxed text-foreground/80">
                  {displayProduct.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8 flex items-center gap-3">
                <span className="text-3xl font-medium text-foreground">
                  {formatPrice(displayProduct.price)}
                </span>
                {displayProduct.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(displayProduct.originalPrice)}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <span className="mb-3 block text-sm font-medium text-foreground">
                  Quantity
                </span>
                <div className="inline-flex items-center gap-4 rounded-full bg-card px-2 py-2 boty-shadow">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground/60 boty-transition hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground/60 boty-transition hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Buttons */}
              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={addToCart}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 text-sm tracking-wide boty-transition boty-shadow ${
                    isAdded
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>

              {/* Benefits */}
              <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex flex-col items-center gap-2 rounded-md p-4"
                  >
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span className="text-center text-xs text-muted-foreground">
                      {benefit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => {
                  const isOpen = openAccordion === item.key
                  return (
                    <div key={item.key} className="border-b border-border/50">
                      <button
                        type="button"
                        onClick={() => toggleAccordion(item.key)}
                        aria-expanded={isOpen}
                        aria-controls={`accordion-${item.key}`}
                        className="flex w-full items-center justify-between py-5 text-left"
                      >
                        <span className="font-medium text-foreground">
                          {item.title}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground boty-transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        id={`accordion-${item.key}`}
                        hidden={!isOpen}
                        className="overflow-hidden pb-5"
                      >
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 border-t border-border/50 pt-16">
              <div className="mb-10 flex items-end justify-between gap-4">
                <h2 className="font-serif text-3xl text-foreground md:text-4xl">
                  You may also like
                </h2>
                <Link
                  href="/shop"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/product/${related.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-top boty-transition group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-lg text-foreground">
                        {related.name}
                      </h3>
                      <span className="whitespace-nowrap text-sm font-medium text-foreground">
                        {formatPrice(related.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {related.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
