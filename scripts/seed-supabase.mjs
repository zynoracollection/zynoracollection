import fs from "node:fs"
import { createClient } from "@supabase/supabase-js"

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/=(.*)/s).slice(0, 2)),
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const base = {
  sizes: ["S", "M", "L", "XL"],
  stock_quantity: 10,
  delivery: "Free delivery on orders over Rs. 5,000. Orders dispatch within 1–2 working days. Unused, unwashed items can be exchanged within 7 days.",
}
const products = [
  { id: "noor-embroidered-suit", name: "Noor Embroidered Suit", tagline: "Ivory and emerald, made for celebrations", description: "A three-piece embroidered suit in soft ivory lawn, finished with antique gold threadwork and a deep emerald dupatta.", price: 4000, original_price: 6000, image_url: "/images/products/noor-embroidered-suit.png", badge: "33% Off", collections: ["festive", "embroidered"], details: "The Noor suit pairs a straight-cut ivory shirt with tonal trousers and a sheer emerald dupatta. Antique gold embroidery runs along the neckline, sleeves and hem.", fabric: "Shirt: embroidered lawn. Dupatta: embroidered chiffon. Trouser: cambric. The suit is stitched and ready to wear.", care: "Dry clean only. Store the dupatta wrapped in tissue. Warm iron on the reverse side." },
  { id: "aurelia-silk-suit", name: "Aurelia Silk Suit", tagline: "Crimson silk with regal gold detailing", description: "A statement three-piece unstitched suit in rich crimson silk, with intricate gold embroidery and a matching organza dupatta.", price: 4000, original_price: 6000, image_url: "/images/products/aurelia-silk-suit.png", badge: "Limited Deal", collections: ["festive", "signature"], details: "Aurelia is a three-piece unstitched suit for your own tailor to shape. The deep crimson fabric is covered in gold paisley embroidery and paired with a lightweight organza dupatta.", fabric: "Shirt: embroidered raw silk. Dupatta: embroidered organza. Trouser: raw silk. The three-piece suit is unstitched.", care: "Dry clean only. Do not wring or tumble dry. Iron on low heat with a cloth between the iron and the embroidery." },
  { id: "meher-chikankari-suit", name: "Meher Chikankari Suit", tagline: "Soft ivory chikankari for quieter occasions", description: "A breathable ivory lawn suit with delicate chikankari threadwork and a matching embroidered dupatta.", price: 3500, original_price: 5200, image_url: "/images/products/meher-chikankari-suit.png", badge: "New", collections: ["everyday", "embroidered"], details: "Meher is made for daytime events and long lunches. Tonal chikankari embroidery covers the front panel and sleeves.", fabric: "Shirt: embroidered lawn. Dupatta: embroidered lawn. Trouser: cambric. The suit is stitched and ready to wear.", care: "Gentle hand wash in cold water or dry clean. Do not bleach. Line dry in shade." },
  { id: "zara-printed-suit", name: "Zara Printed Suit", tagline: "A blue floral print for everyday plans", description: "A vibrant blue three-piece with a hand-painted floral print and a lightly embellished neckline.", price: 2800, original_price: 4200, image_url: "/images/products/zara-printed-suit.png", badge: "Sale", collections: ["everyday"], details: "Zara brings colour to the everyday wardrobe with coral and gold florals, a decorated neckline and a coordinated printed dupatta.", fabric: "Shirt: printed lawn. Dupatta: printed lawn. Trouser: cambric. The suit is stitched and ready to wear.", care: "Hand wash separately in cold water. Do not bleach. Dry in shade." },
].map((product) => ({ ...base, ...product }))

const { error } = await supabase.from("products").upsert(products)
if (error) { console.error(error.message); process.exit(1) }
console.log(`Seeded ${products.length} products into Supabase.`)
