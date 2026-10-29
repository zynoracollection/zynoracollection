import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { TrustBadges } from "@/components/boty/trust-badges"
import { BrandIntro } from "@/components/boty/brand-intro"
import { FeatureSection } from "@/components/boty/feature-section"
import { ProductGrid } from "@/components/boty/product-grid"
import { Testimonials } from "@/components/boty/testimonials"
import { Footer } from "@/components/boty/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <BrandIntro />
      <ProductGrid />
      <FeatureSection />
      <TrustBadges />
      <Testimonials />
      <Footer />
    </main>
  )
}
