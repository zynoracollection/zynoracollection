"use client"

import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

const footerLinks = {
  products: [
    { name: "All Suits", href: "/shop" },
    { name: "Festive Edit", href: "/shop?category=festive" },
    { name: "Embroidered", href: "/shop?category=embroidered" },
    { name: "Everyday", href: "/shop?category=everyday" },
  ],
  quick: [
    { name: "Our Story", href: "/info/about" },
    { name: "Contact Us", href: "/info/contact" },
    { name: "Shop All", href: "/shop" },
    { name: "FAQs", href: "/info/faqs" },
    { name: "Shipping & Delivery", href: "/info/shipping" },
  ],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black px-6 pb-8 pt-16 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-6">
            <h2 className="text-3xl font-bold tracking-tight">
              ZynoraCollection
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
              Pakistani fashion made accessible, with boutique-inspired suits at
              honest prices.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/90">
              <a
                className="block hover:text-white/70"
                href="mailto:hello@zynoracollection.com"
              >
                hello@zynoracollection.com
              </a>
              <a className="block hover:text-white/70" href="tel:+923000000000">
                +92 300 0000000
              </a>
              <p className="text-white/60">
                Cash on Delivery · Bank Transfer · JazzCash · Easypaisa
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Our Products</h3>
            <ul className="mt-7 space-y-5">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm uppercase tracking-wide text-white/65 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-7 space-y-5">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm uppercase tracking-wide text-white/65 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-7 flex gap-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 hover:border-white/60"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 hover:border-white/60"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Mon–Sat, 10am–7pm PKT
            </p>
          </div>
        </div>

        <div className="mt-20 overflow-hidden text-center sm:mt-24">
          <span className="block whitespace-nowrap text-[12vw] font-bold leading-[.75] tracking-[-.08em] text-white sm:text-[10vw] lg:text-[9rem]">
            ZynoraCollection
          </span>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8 text-center">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-wide text-white/80">
            <Link href="/info/privacy">Privacy Policy</Link>
            <Link href="/info/terms">Terms &amp; Conditions</Link>
            <Link href="/info/returns">Returns &amp; Exchange</Link>
          </div>
          <p className="mt-7 text-sm text-white/60">
            © {new Date().getFullYear()} ZynoraCollection. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
