import type { Metadata } from "next"
import { CheckoutForm } from "./checkout-form"

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your ZynoraCollection order with cash on delivery, bank transfer, JazzCash or Easypaisa.",
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
