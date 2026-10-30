export type CollectionId = "festive" | "embroidered" | "everyday" | "signature"

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  video?: string | null
  stockQuantity?: number
  badge: string | null
  collections: CollectionId[]
  sizes: string[]
  details: string
  fabric: string
  care: string
  delivery: string
}

export const products: Product[] = [
  {
    id: "noor-embroidered-suit",
    name: "Noor Embroidered Suit",
    tagline: "Ivory and emerald, made for celebrations",
    description:
      "A three-piece embroidered suit in soft ivory lawn, finished with antique gold threadwork and a deep emerald dupatta.",
    price: 4000,
    originalPrice: 6000,
    image: "/images/products/noor-embroidered-suit.png",
    badge: "33% Off",
    collections: ["festive", "embroidered"],
    sizes: ["S", "M", "L", "XL"],
    details:
      "The Noor suit pairs a straight-cut ivory shirt with tonal trousers and a sheer emerald dupatta. Antique gold embroidery runs along the neckline, sleeves and hem, giving you a traditional look that never feels heavy.",
    fabric:
      "Shirt: embroidered lawn. Dupatta: embroidered chiffon. Trouser: cambric. The suit is stitched and ready to wear.",
    care:
      "Dry clean only. Store the dupatta wrapped in tissue to protect the embroidery. Warm iron on the reverse side.",
    delivery:
      "Free delivery on orders over Rs. 5,000. Orders are dispatched within 1–2 working days. Cash on delivery, bank transfer, JazzCash and Easypaisa accepted. Unused, unwashed items can be exchanged within 7 days.",
  },
  {
    id: "aurelia-silk-suit",
    name: "Aurelia Silk Suit",
    tagline: "Crimson silk with regal gold detailing",
    description:
      "A statement three-piece in rich crimson silk, with intricate gold embroidery and a matching organza dupatta.",
    price: 4000,
    originalPrice: 6000,
    image: "/images/products/aurelia-silk-suit.png",
    badge: "Limited Deal",
    collections: ["festive", "signature"],
    sizes: ["S", "M", "L", "XL"],
    details:
      "Aurelia is a three-piece unstitched suit for your own tailor to shape. The deep crimson fabric is covered in gold paisley embroidery and paired with a lightweight organza dupatta.",
    fabric:
      "Shirt: embroidered raw silk. Dupatta: embroidered organza. Trouser: raw silk. The three-piece suit is unstitched.",
    care:
      "Dry clean only. Do not wring or tumble dry. Iron on low heat with a cloth between the iron and the embroidery.",
    delivery:
      "Free delivery on orders over Rs. 5,000. Orders are dispatched within 1–2 working days. Cash on delivery, bank transfer, JazzCash and Easypaisa accepted. Unused, unwashed items can be exchanged within 7 days.",
  },
  {
    id: "meher-chikankari-suit",
    name: "Meher Chikankari Suit",
    tagline: "Soft ivory chikankari for quieter occasions",
    description:
      "A breathable ivory lawn suit with delicate chikankari threadwork and a matching embroidered dupatta.",
    price: 3500,
    originalPrice: 5200,
    image: "/images/products/meher-chikankari-suit.png",
    badge: "New",
    collections: ["everyday", "embroidered"],
    sizes: ["S", "M", "L", "XL"],
    details:
      "Meher is made for daytime events and long lunches. Tonal chikankari embroidery covers the front panel and sleeves, while the light lawn fabric keeps the silhouette comfortable through the day.",
    fabric:
      "Shirt: embroidered lawn. Dupatta: embroidered lawn. Trouser: cambric. The suit is stitched and ready to wear.",
    care:
      "Gentle hand wash in cold water or dry clean. Do not bleach. Line dry in shade and iron on low heat.",
    delivery:
      "Free delivery on orders over Rs. 5,000. Orders are dispatched within 1–2 working days. Cash on delivery, bank transfer, JazzCash and Easypaisa accepted. Unused, unwashed items can be exchanged within 7 days.",
  },
  {
    id: "zara-printed-suit",
    name: "Zara Printed Suit",
    tagline: "A blue floral print for everyday plans",
    description:
      "A vibrant blue three-piece with a hand-painted floral print and a lightly embellished neckline.",
    price: 2800,
    originalPrice: 4200,
    image: "/images/products/zara-printed-suit.png",
    badge: "Sale",
    collections: ["everyday"],
    sizes: ["S", "M", "L", "XL"],
    details:
      "Zara brings colour to the everyday wardrobe. The relaxed straight shirt is printed with coral and gold florals, finished with a decorated neckline and a coordinated printed dupatta.",
    fabric:
      "Shirt: printed lawn. Dupatta: printed lawn. Trouser: cambric. The suit is stitched and ready to wear.",
    care:
      "Hand wash separately in cold water for the first wash. Do not bleach. Dry in shade and iron on the reverse side.",
    delivery:
      "Free delivery on orders over Rs. 5,000. Orders are dispatched within 1–2 working days. Cash on delivery, bank transfer, JazzCash and Easypaisa accepted. Unused, unwashed items can be exchanged within 7 days.",
  },
]

export const collections: { id: "all" | CollectionId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "festive", label: "Festive" },
  { id: "embroidered", label: "Embroidered" },
  { id: "everyday", label: "Everyday" },
  { id: "signature", label: "Signature" },
]

export const FREE_SHIPPING_THRESHOLD = 5000
export const SHIPPING_FEE = 250

const priceFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
})

export function formatPrice(value: number) {
  return `Rs. ${priceFormatter.format(value)}`
}

export function getShipping(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
    ? 0
    : SHIPPING_FEE
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(id: string, limit = 3) {
  return products.filter((product) => product.id !== id).slice(0, limit)
}
