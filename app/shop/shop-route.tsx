"use client"

import { useSearchParams } from "next/navigation"
import {
  collections,
  type CollectionId,
  type Product,
} from "@/lib/products"
import { ShopContent } from "./shop-content"

type FilterId = "all" | CollectionId

export function ShopRoute({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const requested = searchParams.get("category")
  const initialCategory: FilterId = collections.some(
    (collection) => collection.id === requested,
  )
    ? (requested as FilterId)
    : "all"

  return (
    <ShopContent
      key={initialCategory}
      initialCategory={initialCategory}
      products={products}
    />
  )
}
