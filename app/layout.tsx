import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600']
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});

const raleway = Raleway({ 
  subsets: ["latin"],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zynoracollection.com"),
  title: {
    default: "ZynoraCollection - Boutique Style, Better Prices",
    template: "%s | ZynoraCollection",
  },
  description:
    "Discover boutique-inspired Pakistani suits, embroidered three-pieces and occasionwear at thoughtfully reduced prices from ZynoraCollection.",
  keywords: [
    "Pakistani suits",
    "boutique suits",
    "embroidered suits",
    "chikankari",
    "festive wear",
    "ZynoraCollection",
  ],
  openGraph: {
    title: "ZynoraCollection — Boutique Style, Better Prices",
    description:
      "Boutique-inspired Pakistani suits and occasionwear at prices that make luxury feel within reach.",
    type: "website",
    url: "https://zynoracollection.com",
    siteName: "ZynoraCollection",
    locale: "en_PK",
    images: [
      {
        url: "/images/products/noor-embroidered-suit.png",
        alt: "Noor Embroidered Suit by ZynoraCollection",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZynoraCollection — Boutique Style, Better Prices",
    description:
      "Boutique-inspired Pakistani suits and occasionwear at prices that make luxury feel within reach.",
    images: ["/images/products/noor-embroidered-suit.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://zynoracollection.com",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "ZynoraCollection",
    url: "https://zynoracollection.com",
    description:
      "Boutique-inspired Pakistani suits and occasionwear at thoughtfully reduced prices.",
    image: "https://zynoracollection.com/images/products/noor-embroidered-suit.png",
    priceRange: "Rs. 3,000 - Rs. 6,000",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@zynoracollection.com",
      telephone: "+92-300-0000000",
      contactType: "customer service",
    },
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} ${raleway.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
