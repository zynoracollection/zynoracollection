import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

interface InfoSection {
  heading: string
  body: string[]
}

interface InfoPage {
  title: string
  intro: string
  sections: InfoSection[]
}

const pages: Record<string, InfoPage> = {
  about: {
    title: "Our Story",
    intro:
      "ZynoraCollection began with a simple idea: the boutique pieces we save on our phones should not stay out of reach.",
    sections: [
      {
        heading: "Boutique style, honest prices",
        body: [
          "We work with trusted suppliers to bring you the silhouettes, embroidery and finishes you would expect from a boutique — without the boutique markup. Every piece is selected for its fabric, stitching and how it feels to wear.",
          "Our collection focuses on Pakistani suits that move easily between family lunches, Eid plans and wedding-season events. Small, considered edits rather than endless pages of options.",
        ],
      },
      {
        heading: "What we look for",
        body: [
          "Soft, breathable fabrics. Neat finishing inside and out. Embroidery that survives real life. And a price that still leaves room for the dupatta.",
          "If a sample does not meet that bar, it does not make it to the shop.",
        ],
      },
      {
        heading: "Here when you need us",
        body: [
          "Questions about sizing, fabric or delivery? Message us on WhatsApp or email hello@zynoracollection.com. A real person replies during shop hours, Monday to Saturday, 10am–7pm PKT.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact Us",
    intro:
      "We are happy to help with sizing, orders, exchanges or anything else on your mind.",
    sections: [
      {
        heading: "Reach us",
        body: [
          "Email: hello@zynoracollection.com",
          "Phone / WhatsApp: +92 300 0000000",
          "Hours: Monday–Saturday, 10am–7pm PKT",
        ],
      },
      {
        heading: "Order support",
        body: [
          "Please include your order number (it starts with ZC-) when asking about an existing order. We usually reply within one working day.",
          "For exchanges, keep the suit unused and unwashed with its original packing so we can process your request quickly.",
        ],
      },
    ],
  },
  faqs: {
    title: "FAQs",
    intro: "The questions we hear most often, answered plainly.",
    sections: [
      {
        heading: "Are the suits stitched?",
        body: [
          "Yes. Every suit in the collection is stitched and ready to wear. Sizes S to XL are listed on each product page, and the fabric and dupatta details are in the Fabric section.",
        ],
      },
      {
        heading: "How do I choose a size?",
        body: [
          "Our sizes follow standard Pakistani boutique measurements. If you are between sizes or unsure, message us with your bust, waist and height and we will recommend one.",
        ],
      },
      {
        heading: "What payment methods do you accept?",
        body: [
          "Cash on delivery, bank transfer, JazzCash and Easypaisa. You can choose your method at checkout and we will confirm the details by phone.",
        ],
      },
      {
        heading: "Can I exchange an item?",
        body: [
          "Unused, unwashed items with original packing can be exchanged within 7 days of delivery. Delivery charges for the return are paid by the customer unless the item arrived damaged or incorrect.",
        ],
      },
    ],
  },
  shipping: {
    title: "Shipping & Delivery",
    intro:
      "Orders are packed carefully and dispatched from our studio within 1–2 working days.",
    sections: [
      {
        heading: "Delivery charges",
        body: [
          "Free delivery on orders over Rs. 5,000. Orders below that are charged a flat Rs. 250.",
          "We deliver across Pakistan through trusted courier partners. Larger cities usually receive orders in 2–4 working days; smaller towns may take 4–6.",
        ],
      },
      {
        heading: "Tracking your order",
        body: [
          "Once your parcel is booked, we send the tracking number by SMS or WhatsApp. You can also contact us with your ZC- order number for a status update.",
        ],
      },
      {
        heading: "Cash on delivery",
        body: [
          "COD orders are confirmed by phone before dispatch. Please keep your number reachable — unconfirmed orders may be held for 24 hours.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "We collect only the information needed to process and deliver your order.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you place an order we collect your name, phone number, delivery address and order notes. Payment is completed through the method you choose; we do not store card numbers.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "Your details are used to confirm orders, arrange delivery, handle exchanges and respond to support requests. We do not sell or rent customer information.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to update or delete your order details by emailing hello@zynoracollection.com. Newsletter subscribers can unsubscribe at any time using the link in each email.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "By ordering from ZynoraCollection you agree to the terms below.",
    sections: [
      {
        heading: "Orders",
        body: [
          "All orders are subject to availability and confirmation. We may contact you to verify your address or payment method before dispatch. Prices are listed in Pakistani Rupees and include applicable taxes.",
        ],
      },
      {
        heading: "Product colours",
        body: [
          "We photograph every suit in natural light, but screens and lighting can shift colour slightly. Minor differences in embroidery placement are normal for boutique-produced pieces.",
        ],
      },
      {
        heading: "Returns and exchanges",
        body: [
          "Unused, unwashed items with original packing may be exchanged within 7 days. Sale items are exchange-only. See our Returns & Exchange page for the full process.",
        ],
      },
    ],
  },
  returns: {
    title: "Returns & Exchange",
    intro:
      "If something is not right, we will help you sort it out within 7 days of delivery.",
    sections: [
      {
        heading: "Eligibility",
        body: [
          "Items must be unused, unwashed and returned with their original packing and tags. Sale items can be exchanged but not refunded. We cannot accept returns on worn, altered or damaged-by-customer pieces.",
        ],
      },
      {
        heading: "How to start an exchange",
        body: [
          "Email hello@zynoracollection.com or message +92 300 0000000 with your ZC- order number and a photo of the item. We will reply with the return address and next steps.",
          "Once the item reaches us and passes inspection, we dispatch your replacement size or style. Return delivery charges are paid by the customer unless the item was damaged or incorrect.",
        ],
      },
      {
        heading: "Damaged or incorrect items",
        body: [
          "Please contact us within 48 hours of delivery with photos of the parcel and item. We will arrange a replacement or refund at no extra delivery cost.",
        ],
      },
    ],
  },
}

interface InfoPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: InfoPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = pages[slug]

  if (!page) {
    return { title: "Page not found" }
  }

  return {
    title: page.title,
    description: page.intro,
  }
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params
  const page = pages[slug]

  if (!page) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pb-24 pt-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground boty-transition hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-primary">
            ZynoraCollection
          </span>
          <h1 className="mb-5 font-serif text-4xl text-foreground md:text-5xl">
            {page.title}
          </h1>
          <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
            {page.intro}
          </p>

          <div className="space-y-10">
            {page.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-3xl bg-card p-6 boty-shadow md:p-8"
              >
                <h2 className="mb-4 font-serif text-2xl text-foreground">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
