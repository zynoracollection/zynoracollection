import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/boty/product-detail"
import { getProduct, products } from "@/lib/products"

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
  const product = getProduct(id)

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
  const product = getProduct(id)

  if (!product) {
    notFound()
  }

  return <ProductDetail key={product.id} product={product} />
}
