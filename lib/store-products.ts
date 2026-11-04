import { unstable_cache } from "next/cache"
import { products, type Product } from "@/lib/products"
import { createPublicClient } from "@/lib/supabase/public"
import { createClient } from "@/lib/supabase/server"

type ProductRow = Omit<Product, "image" | "originalPrice"> & {
  image_url: string
  video_url: string | null
  stock_quantity: number
  original_price: number | null
}

function fromRow(row: ProductRow): Product {
  return {
    ...row,
    image: row.image_url,
    video: row.video_url,
    stockQuantity: row.stock_quantity,
    originalPrice: row.original_price,
  }
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("updated_at", { ascending: false })
      .returns<ProductRow[]>()

    if (!error) return (data ?? []).map(fromRow)
  } catch {
    // Fall back to the bundled catalog while Supabase is unavailable.
  }
  return products
}

async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle<ProductRow>()

    if (!error) return data ? fromRow(data) : null
  } catch {
    // Fall back to the bundled catalog while Supabase is unavailable.
  }
  return products.find((product) => product.id === id) ?? null
}

// Catalog reads are cached and revalidated on demand from the admin dashboard.
export const getStoreProducts = unstable_cache(fetchProducts, ["store-products"], {
  revalidate: 300,
  tags: ["products"],
})

export const getStoreProduct = unstable_cache(fetchProduct, ["store-product"], {
  revalidate: 300,
  tags: ["products"],
})

/**
 * Admin views read fresh data and include the session cookies.
 * They intentionally bypass the public catalog cache.
 */
export async function getAdminProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("updated_at", { ascending: false })
      .returns<ProductRow[]>()

    if (!error) return (data ?? []).map(fromRow)
  } catch {
    // Keep the dashboard usable if the request fails.
  }
  return products
}
