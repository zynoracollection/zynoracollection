"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/shop?category=festive", label: "Festive" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsOpen, itemCount } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className="mx-auto max-w-7xl rounded-lg border border-[rgba(255,255,255,0.32)] bg-[rgba(255,255,255,0.65)] px-4 backdrop-blur-md animate-scale-fade-in lg:px-8"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}
      >
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Mobile menu button */}
          <button
            type="button"
            className="justify-self-start p-2 text-foreground/80 boty-transition hover:text-foreground lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm tracking-wide text-foreground/70 boty-transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="justify-self-center whitespace-nowrap font-serif text-lg tracking-wider text-foreground sm:text-2xl lg:text-3xl"
            aria-label="ZynoraCollection home"
          >
            ZynoraCollection
          </Link>

          {/* Right Actions */}
          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            <Link
              href="/shop#search"
              className="p-2 text-foreground/70 boty-transition hover:text-foreground"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-foreground/70 boty-transition hover:text-foreground"
              aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <CartDrawer />

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden boty-transition lg:hidden ${
            isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 border-t border-border/50 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm tracking-wide text-foreground/70 boty-transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/info/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm tracking-wide text-foreground/70 boty-transition hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
