import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/boty/product-detail"
import { products } from "@/lib/products"
import { getStoreProduct, getStoreProducts } from "@/lib/store-products"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getStoreProduct(id)

  if (!product) {
    return { title: "Product not found" }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ZynoraCollection`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getStoreProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = (await getStoreProducts())
    .filter((item) => item.id !== product.id)
    .slice(0, 3)

  return (
    <ProductDetail
      key={product.id}
      product={product}
      relatedProducts={relatedProducts}
    />
  )
}
