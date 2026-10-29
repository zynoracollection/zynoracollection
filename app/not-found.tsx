import Link from "next/link"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="flex min-h-[70vh] items-center pb-20 pt-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-primary">
            404
          </span>
          <h1 className="mb-4 font-serif text-4xl text-foreground md:text-5xl">
            This page has moved on
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            The piece you are looking for is no longer here. Browse the current
            collection instead.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground boty-transition hover:bg-primary/90"
            >
              Shop the collection
            </Link>
            <Link
              href="/"
              className="rounded-full border border-foreground/20 px-8 py-4 text-sm text-foreground boty-transition hover:bg-foreground/5"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
