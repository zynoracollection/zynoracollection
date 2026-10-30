import type { Metadata } from "next"
import { collections, type CollectionId } from "@/lib/products"
import { getStoreProducts } from "@/lib/store-products"
import { ShopContent } from "./shop-content"

export const metadata: Metadata = {
  title: "Shop All Suits",
  description:
    "Browse boutique-inspired Pakistani suits, embroidered three-pieces and occasionwear from ZynoraCollection.",
}

type FilterId = "all" | CollectionId

interface ShopPageProps {
  searchParams: Promise<{ category?: string | string[] }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const requested = Array.isArray(params.category)
    ? params.category[0]
    : params.category
  const initialCategory: FilterId = collections.some(
    (collection) => collection.id === requested,
  )
    ? (requested as FilterId)
    : "all"

  return <ShopContent initialCategory={initialCategory} products={await getStoreProducts()} />
}
