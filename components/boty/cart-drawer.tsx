"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  FREE_SHIPPING_THRESHOLD,
  formatPrice,
  getShipping,
} from "@/lib/products"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import { useCart } from "./cart-context"

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isOpen,
    setIsOpen,
    itemCount,
    subtotal,
  } = useCart()

  const shipping = getShipping(subtotal)
  const total = subtotal + shipping

  const checkoutOnWhatsApp = () => {
    if (items.length === 0) return

    const origin = window.location.origin
    const lines = ["*New Order — ZynoraCollection*", "", "*Items*"]

    items.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.name}`,
        `   Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`,
        `   ${origin}/product/${item.productId}`,
      )
    })

    lines.push(
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}`,
      `*Total: ${formatPrice(total)}*`,
      "",
      "Please share your name, phone number and delivery address in this chat to confirm the order.",
    )

    const whatsappUrl = getWhatsAppUrl(lines.join("\n"))
    setIsOpen(false)

    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    if (!opened) window.location.assign(whatsappUrl)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-[440px]">
        <DrawerHeader className="border-b border-border/50 p-6 py-2.5">
          <DrawerTitle className="font-serif text-2xl">Cart</DrawerTitle>
          <DrawerDescription>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </DrawerDescription>
        </DrawerHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <DrawerClose asChild>
                <Link
                  href="/shop"
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Continue Shopping
                </Link>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 font-serif text-base font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="mb-1 text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-l-full p-1.5 boty-transition hover:bg-muted"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-r-full p-1.5 boty-transition hover:bg-muted"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground boty-transition hover:text-destructive"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="gap-4 border-t border-border/50 p-6">
            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-muted-foreground">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for
                  free delivery.
                </p>
              )}
              <div className="flex justify-between border-t border-border/50 pt-2 text-base font-medium text-foreground">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={checkoutOnWhatsApp}
              className="w-full rounded-full bg-primary py-4 text-center font-medium text-primary-foreground boty-transition hover:bg-primary/90"
            >
              Checkout
            </button>

            <DrawerClose asChild>
              <button
                type="button"
                className="w-full rounded-full border border-border py-4 font-medium text-foreground boty-transition hover:bg-muted"
              >
                Continue Shopping
              </button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
