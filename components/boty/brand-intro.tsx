import { ShoppingBag, Tag, Sparkles } from "lucide-react"

const benefits = [
  { icon: ShoppingBag, label: "Curated Boutique Finds" },
  { icon: Tag, label: "Honest, Fair Pricing" },
  { icon: Sparkles, label: "Occasion-Ready Edits" },
]

export function BrandIntro() {
  return (
    <section className="w-full bg-black py-12 md:py-14 lg:py-[52px] lg:pb-[60px]">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-12">
        <h2
          className="text-center text-white font-[family-name:var(--font-raleway)] font-normal leading-[1.2] text-[32px] sm:text-[38px] md:text-[42px] lg:text-[50px]"
        >
          Hi, We&apos;re ZynoraCollection
        </h2>

        <p
          className="mx-auto mt-6 max-w-[1000px] text-center font-[family-name:var(--font-raleway)] text-[15px] sm:text-[17px] md:text-[18px] lg:text-[21px] font-normal leading-[1.7] text-[#D0D0D0]"
        >
          A boutique-inspired fashion brand, focused on real style - not trends.
        </p>

        <p
          className="mx-auto mt-5 max-w-[1000px] text-center font-[family-name:var(--font-raleway)] text-[15px] sm:text-[17px] md:text-[18px] lg:text-[21px] font-normal leading-[1.7] text-[#D0D0D0]"
        >
          We curate premium-looking Pakistani suits and occasionwear at honest, friendly prices — festive, wedding, and everyday edits — while keeping the boutique feel you love.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-12">
          {benefits.map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center">
              <b.icon
                className="h-10 w-10 text-white sm:h-11 sm:w-11"
                strokeWidth={1.6}
              />
              <span
                className="mt-5 font-[family-name:var(--font-raleway)] text-[16px] sm:text-[18px] md:text-[19px] lg:text-[21px] font-medium leading-[1.4] text-white"
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}