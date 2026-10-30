"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export interface CartItemInput {
  productId: string
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem extends CartItemInput {
  id: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItemInput, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  itemCount: number
  subtotal: number
  isHydrated: boolean
}

const STORAGE_KEY = "zynora-cart"

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartLineId(productId: string) {
  return productId
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Restore the cart after hydration so the server and client markup match.
  useEffect(() => {
    let cancelled = false

    const restore = () => {
      if (cancelled) return
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed: unknown = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setItems(
              parsed.filter(
                (item): item is CartItem =>
                  typeof item === "object" &&
                  item !== null &&
                  typeof (item as CartItem).id === "string" &&
                  typeof (item as CartItem).quantity === "number",
              ),
            )
          }
        }
      } catch {
        // A corrupt or unavailable storage entry should never break the shop.
        window.localStorage.removeItem(STORAGE_KEY)
      } finally {
        setIsHydrated(true)
      }
    }

    queueMicrotask(restore)

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage may be disabled (private mode); the cart still works in memory.
    }
  }, [items, isHydrated])

  const addItem = (newItem: CartItemInput, quantity = 1) => {
    const id = cartLineId(newItem.productId)
    const safeQuantity = Math.max(1, Math.floor(quantity))

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        )
      }
      return [...currentItems, { ...newItem, id, quantity: safeQuantity }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        itemCount,
        subtotal,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
