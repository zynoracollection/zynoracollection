import type { Product } from "@/lib/products"

export type ProductOverride = Partial<
  Pick<Product, "name" | "tagline" | "description" | "image" | "price" | "originalPrice">
>

const STORAGE_KEY = "zynora-product-overrides"

export function getProductOverride(id: string): ProductOverride | null {
  if (typeof window === "undefined") return null
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const overrides = JSON.parse(stored) as Record<string, ProductOverride>
    return overrides[id] ?? null
  } catch {
    return null
  }
}

export function saveProductOverride(id: string, override: ProductOverride) {
  if (typeof window === "undefined") return
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const overrides = stored
      ? (JSON.parse(stored) as Record<string, ProductOverride>)
      : {}
    overrides[id] = override
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  } catch {
    // Storage may be disabled; the editor remains usable for the current session.
  }
}
