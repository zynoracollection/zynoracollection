"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, SlidersHorizontal, ShoppingBag, X } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import {
  collections,
  formatPrice,
  type CollectionId,
  type Product,
} from "@/lib/products"

type FilterId = "all" | CollectionId

export function ShopContent({
  initialCategory,
  products,
}: {
  initialCategory: FilterId
  products: Product[]
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterId>(initialCategory)
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.collections.includes(selectedCategory)
      const matchesSearch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.collections.some((collection) => collection.includes(search))

      return matchesCategory && matchesSearch
    })
  }, [query, selectedCategory])

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-primary">
              Our Collection
            </span>
            <h1 className="mb-4 font-serif text-4xl text-foreground text-balance md:text-5xl lg:text-6xl">
              Shop All Suits
            </h1>
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              Boutique-inspired suits and occasionwear, ready for your next
              celebration or everyday plan.
            </p>
          </div>

          {/* Search */}
          <div id="search" className="mx-auto mb-8 max-w-xl scroll-mt-28">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search suits, colours or collections"
                className="w-full rounded-full border border-border bg-card py-4 pl-14 pr-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mb-10 flex items-center justify-between border-b border-border/50 pb-6">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-2 text-sm text-foreground lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Categories */}
            <div className="hidden items-center gap-2 lg:flex">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => setSelectedCategory(collection.id)}
                  aria-pressed={selectedCategory === collection.id}
                  className={`rounded-full px-4 py-2 text-sm capitalize boty-transition ${
                    selectedCategory === collection.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 boty-shadow hover:text-foreground"
                  }`}
                >
                  {collection.label}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground" aria-live="polite">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-background lg:hidden">
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-foreground">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {collections.map((collection) => (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(collection.id)
                        setShowFilters(false)
                      }}
                      className={`w-full rounded-2xl px-6 py-4 text-left capitalize boty-transition ${
                        selectedCategory === collection.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground boty-shadow"
                      }`}
                    >
                      {collection.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border/60 bg-card/60 px-6 py-20 text-center">
              <h2 className="mb-2 font-serif text-2xl text-foreground">
                No suits found
              </h2>
              <p className="text-muted-foreground">
                Try a different search or choose another collection.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setSelectedCategory("all")
                }}
                className="mt-6 rounded-full border border-foreground/20 px-6 py-3 text-sm text-foreground boty-transition hover:bg-foreground/5"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ShopProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <Link
      href={`/product/${product.id}`}
      className="group transition-all duration-500 ease-out"
    >
      <div className="overflow-hidden rounded-3xl bg-card boty-shadow boty-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top boty-transition group-hover:scale-105"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs tracking-wide ${
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
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/90 opacity-0 backdrop-blur-sm translate-y-2 boty-transition boty-shadow group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
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
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="mb-1 font-serif text-xl text-foreground">
            {product.name}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {product.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">
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
  )
}
