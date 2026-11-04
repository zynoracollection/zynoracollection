import { Suspense } from "react"
import type { Metadata } from "next"
import { getStoreProducts } from "@/lib/store-products"
import { ShopRoute } from "./shop-route"

export const metadata: Metadata = {
  title: "Shop All Suits",
  description:
    "Browse boutique-inspired Pakistani suits, embroidered three-pieces and occasionwear from ZynoraCollection.",
}

export default async function ShopPage() {
  const products = await getStoreProducts()

  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopRoute products={products} />
    </Suspense>
  )
}

function ShopFallback() {
  return (
    <main className="min-h-screen">
      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 h-10 w-56 animate-pulse rounded bg-muted" />
          <div className="mx-auto mb-8 h-12 max-w-xl animate-pulse rounded-full bg-muted" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-3xl bg-card">
                <div className="aspect-[4/5] animate-pulse bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
