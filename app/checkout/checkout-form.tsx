"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ChevronLeft } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart, type CartItem } from "@/components/boty/cart-context"
import {
  formatPrice,
  getShipping,
} from "@/lib/products"

interface PlacedOrder {
  id: string
  items: CartItem[]
  total: number
  name: string
}

const paymentMethods = [
  "Cash on Delivery",
  "Bank Transfer",
  "JazzCash",
  "Easypaisa",
]

export function CheckoutForm() {
  const { items, subtotal, clearCart, isHydrated } = useCart()
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const [payment, setPayment] = useState(paymentMethods[0])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [notes, setNotes] = useState("")

  const shipping = getShipping(subtotal)
  const total = subtotal + shipping

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (items.length === 0) return

    setOrder({
      id: `ZC-${Date.now().toString().slice(-6)}`,
      items,
      total,
      name: name.trim().split(" ")[0] || "there",
    })
    clearCart()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {!isHydrated ? (
            <div className="py-20 text-center text-muted-foreground">
              Loading your cart…
            </div>
          ) : order ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 text-center boty-shadow md:p-12">
              <CheckCircle2 className="mx-auto mb-6 h-14 w-14 text-primary" />
              <h1 className="mb-3 font-serif text-3xl text-foreground md:text-4xl">
                Thank you, {order.name}!
              </h1>
              <p className="mb-6 text-muted-foreground">
                Your order{" "}
                <span className="font-medium text-foreground">
                  {order.id}
                </span>{" "}
                has been placed. We will call you shortly to confirm delivery
                details.
              </p>
              <div className="mb-8 space-y-2 rounded-2xl bg-background p-5 text-left text-sm">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-muted-foreground"
                  >
                    <span>
                      {item.name}
                      {item.size ? ` (${item.size})` : ""} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border/60 pt-2 font-medium text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
              <Link
                href="/shop"
                className="inline-flex rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground boty-transition hover:bg-primary/90"
              >
                Continue Shopping
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-card p-12 text-center boty-shadow">
              <h1 className="mb-3 font-serif text-3xl text-foreground">
                Your cart is empty
              </h1>
              <p className="mb-8 text-muted-foreground">
                Add a suit to your cart before checking out.
              </p>
              <Link
                href="/shop"
                className="inline-flex rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground boty-transition hover:bg-primary/90"
              >
                Browse the collection
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/shop"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground boty-transition hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
                Continue shopping
              </Link>

              <div className="mb-10">
                <h1 className="mb-3 font-serif text-4xl text-foreground md:text-5xl">
                  Checkout
                </h1>
                <p className="text-muted-foreground">
                  Fill in your delivery details and we will confirm your order
                  by phone.
                </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Full name"
                      value={name}
                      onChange={setName}
                    />
                    <Field
                      id="phone"
                      label="Phone number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="03XX XXXXXXX"
                    />
                  </div>
                  <Field
                    id="address"
                    label="Delivery address"
                    value={address}
                    onChange={setAddress}
                    placeholder="House, street, area"
                  />
                  <Field
                    id="city"
                    label="City"
                    value={city}
                    onChange={setCity}
                  />

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Order notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      rows={3}
                      className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
                      placeholder="Any delivery instructions?"
                    />
                  </div>

                  <fieldset>
                    <legend className="mb-3 block text-sm font-medium text-foreground">
                      Payment method
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {paymentMethods.map((method) => (
                        <label
                          key={method}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 text-sm boty-transition ${
                            payment === method
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border bg-card text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method}
                            checked={payment === method}
                            onChange={() => setPayment(method)}
                            className="accent-primary"
                          />
                          {method}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-4 font-medium text-primary-foreground boty-transition hover:bg-primary/90"
                  >
                    Place Order · {formatPrice(total)}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    This is a demo storefront. No payment is taken online.
                  </p>
                </form>

                <aside className="h-fit rounded-3xl bg-card p-6 boty-shadow">
                  <h2 className="mb-5 font-serif text-2xl text-foreground">
                    Order summary
                  </h2>
                  <div className="space-y-5">
                    {items.map((item) => (
                      <CheckoutLine key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="mt-6 space-y-2 border-t border-border/60 pt-4 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-medium text-foreground">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  )
}

function CheckoutLine({ item }: { item: CartItem }) {
  return (
    <div className="flex gap-3">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover object-top"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {item.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.size ? `Size ${item.size} · ` : ""}Qty {item.quantity}
        </p>
      </div>
      <span className="whitespace-nowrap text-sm text-foreground">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  )
}
