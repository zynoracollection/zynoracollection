import { products, type Product } from "@/lib/products"
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

export async function getStoreProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("products").select("*").order("updated_at", { ascending: false }).returns<ProductRow[]>()
    if (!error) return (data ?? []).map(fromRow)
  } catch {
    // Fall back to the bundled catalog while Supabase is unavailable.
  }
  return products
}

export async function getStoreProduct(id: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle<ProductRow>()
    if (!error) return data ? fromRow(data) : undefined
  } catch {
    // Keep the storefront available before Supabase is configured or during an outage.
  }
  return products.find((product) => product.id === id)
}
