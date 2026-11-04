"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, Check, ExternalLink, ImageIcon, LogOut, Plus, Save, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/products"

type FormState = {
  id: string; image: string; video: string; name: string; tagline: string; description: string
  price: string; originalPrice: string; stockQuantity: string; badge: string; collections: string; details: string; fabric: string; care: string; delivery: string
}

function blankForm(): FormState {
  return { id: "", image: "", video: "", name: "", tagline: "", description: "", price: "", originalPrice: "", stockQuantity: "0", badge: "", collections: "everyday", details: "", fabric: "Three-piece suit fabric. See product description for details.", care: "Follow the care instructions on the garment.", delivery: "Free delivery on orders over Rs. 5,000. Orders dispatch within 1–2 working days." }
}

function productForm(product: Product): FormState {
  return { id: product.id, image: product.image, video: product.video ?? "", name: product.name, tagline: product.tagline, description: product.description, price: String(product.price), originalPrice: String(product.originalPrice ?? ""), stockQuantity: String(product.stockQuantity ?? 0), badge: product.badge ?? "", collections: product.collections.join(", "), details: product.details, fabric: product.fabric, care: product.care, delivery: product.delivery }
}

export function AdminDashboard({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [selectedId, setSelectedId] = useState<string | null>(initialProducts[0]?.id ?? null)
  const [form, setForm] = useState<FormState>(initialProducts[0] ? productForm(initialProducts[0]) : blankForm())
  const [saved, setSaved] = useState(false)
  const [status, setStatus] = useState("")
  const totalStock = products.reduce((sum, product) => sum + (product.stockQuantity ?? 0), 0)
  const lowStock = products.filter((product) => (product.stockQuantity ?? 0) < 5).length

  const update = (field: keyof FormState, value: string) => {
    setSaved(false)
    setForm((current) => ({ ...current, [field]: value }))
  }

  const revalidateStorefront = async () => {
    try {
      await fetch("/api/revalidate", { method: "POST" })
    } catch {
      // The storefront cache expires on its own if this request fails.
    }
  }
  const selectProduct = (product: Product) => { setSelectedId(product.id); setForm(productForm(product)); setSaved(false); setStatus("") }
  const addProduct = () => { setSelectedId(null); setForm(blankForm()); setSaved(false); setStatus("New product") }

  const upload = async (field: "image" | "video", file: File) => {
    if (!form.id) { setStatus("Add a product ID before uploading media."); return }
    setStatus(`Uploading ${field}…`)
    const extension = file.name.split(".").pop() || (field === "image" ? "jpg" : "mp4")
    const path = `${form.id}/${Date.now()}.${extension}`
    const { error } = await createClient().storage.from("product-media").upload(path, file, { upsert: true, contentType: file.type })
    if (error) { setStatus(error.message); return }
    const { data } = createClient().storage.from("product-media").getPublicUrl(path)
    update(field, data.publicUrl)
    setStatus(`${field === "image" ? "Image" : "Video"} uploaded.`)
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.id || !form.name || !form.image) { setStatus("Product ID, title and image are required."); return }
    setStatus("Saving…")
    const product = {
      id: form.id.trim().toLowerCase().replace(/\s+/g, "-"), name: form.name, tagline: form.tagline, description: form.description,
      price: Number(form.price) || 0, original_price: form.originalPrice ? Number(form.originalPrice) : null, image_url: form.image,
      video_url: form.video || null, stock_quantity: Math.max(0, Number(form.stockQuantity) || 0), badge: form.badge || null,
      collections: form.collections.split(",").map((item) => item.trim()).filter(Boolean), sizes: ["S", "M", "L", "XL"],
      details: form.details || form.description, fabric: form.fabric, care: form.care, delivery: form.delivery,
    }
    const { data, error } = await createClient().from("products").upsert(product).select("*").single()
    if (error) { setStatus(error.message); return }
    const savedProduct: Product = { ...product, image: product.image_url, video: product.video_url, originalPrice: product.original_price, stockQuantity: product.stock_quantity, collections: product.collections as Product["collections"], badge: product.badge }
    await revalidateStorefront()
    setProducts((current) => { const exists = current.some((item) => item.id === savedProduct.id); return exists ? current.map((item) => item.id === savedProduct.id ? savedProduct : item) : [savedProduct, ...current] })
    setSelectedId(savedProduct.id); setForm(productForm(savedProduct)); setSaved(true); setStatus(data ? "Saved to Supabase" : "Saved")
  }

  const removeProduct = async () => {
    if (!selectedId || !window.confirm("Delete this product permanently?")) return
    const { error } = await createClient().from("products").delete().eq("id", selectedId)
    if (error) { setStatus(error.message); return }
    await revalidateStorefront()
    const remaining = products.filter((product) => product.id !== selectedId)
    setProducts(remaining); setSelectedId(remaining[0]?.id ?? null); setForm(remaining[0] ? productForm(remaining[0]) : blankForm()); setStatus("Product deleted")
  }

  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6"><div><p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">ZynoraCollection</p><h1 className="font-serif text-4xl">Admin dashboard</h1><p className="mt-2 text-sm text-muted-foreground">Manage products, pricing and inventory.</p></div><div className="flex flex-wrap gap-3"><Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:bg-card">View shop <ExternalLink className="h-4 w-4" /></Link><button onClick={async () => { await createClient().auth.signOut(); window.location.assign("/admin/login") }} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm hover:bg-card"><LogOut className="h-4 w-4" /> Sign out</button></div></header>
    <div className="mb-8 grid gap-4 sm:grid-cols-3"><Stat label="Total suits" value={String(products.length)} /><Stat label="Units in stock" value={String(totalStock)} /><Stat label="Low stock items" value={String(lowStock)} /></div>
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]"><section className="rounded-3xl bg-card p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-serif text-2xl">Products</h2><button onClick={addProduct} className="rounded-full bg-primary p-2 text-primary-foreground" aria-label="Add product"><Plus className="h-4 w-4" /></button></div><div className="grid gap-2">{products.map((product) => <button key={product.id} onClick={() => selectProduct(product)} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm ${selectedId === product.id ? "bg-primary text-primary-foreground" : "hover:bg-background"}`}><span className="truncate pr-2">{product.name}</span><span className="shrink-0 text-xs opacity-70">{product.stockQuantity ?? 0}</span></button>)}{!products.length && <p className="py-6 text-sm text-muted-foreground">No products yet.</p>}</div></section>
      <form onSubmit={save} className="rounded-3xl bg-card p-6 sm:p-8"><div className="mb-8 flex items-start justify-between gap-4"><div className="flex items-start gap-3"><ImageIcon className="mt-1 h-5 w-5 text-primary" /><div><h2 className="font-serif text-2xl">{selectedId ? "Edit product" : "Add product"}</h2><p className="mt-1 text-sm text-muted-foreground">Only essential product and inventory fields are shown.</p></div></div>{selectedId && <button type="button" onClick={removeProduct} className="rounded-full p-2 text-destructive hover:bg-destructive/10" aria-label="Delete product"><Trash2 className="h-5 w-5" /></button>}</div>
        <div className="grid gap-5 sm:grid-cols-2"><Field label="Product ID" value={form.id} onChange={(value) => update("id", value)} placeholder="e.g. rose-silk-suit" disabled={Boolean(selectedId)} /><Field label="Title" value={form.name} onChange={(value) => update("name", value)} /><Field label="Image URL" value={form.image} onChange={(value) => update("image", value)} /><Field label="Video URL (optional)" value={form.video} onChange={(value) => update("video", value)} /><Field label="Price (Rs.)" type="number" value={form.price} onChange={(value) => update("price", value)} /><Field label="Compare-at price (Rs.)" type="number" value={form.originalPrice} onChange={(value) => update("originalPrice", value)} /><Field label="Units in stock" type="number" value={form.stockQuantity} onChange={(value) => update("stockQuantity", value)} /><Field label="Badge (optional)" value={form.badge} onChange={(value) => update("badge", value)} /><Field label="Collections" value={form.collections} onChange={(value) => update("collections", value)} placeholder="festive, signature" /><div className="hidden sm:block" /><label className="grid gap-2 text-sm font-medium sm:col-span-2">Short description<input value={form.tagline} onChange={(event) => update("tagline", event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label><label className="grid gap-2 text-sm font-medium sm:col-span-2">Description<textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows={5} className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label><UploadField label="Upload image" accept="image/*" onUpload={(file) => upload("image", file)} /><UploadField label="Upload video" accept="video/mp4,video/webm" onUpload={(file) => upload("video", file)} /></div>
        <div className="mt-8 flex flex-wrap items-center gap-4"><button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"><Save className="h-4 w-4" /> Save product</button>{saved && <span className="inline-flex items-center gap-2 text-sm text-primary"><Check className="h-4 w-4" /> Saved</span>}<span className="text-sm text-muted-foreground">{status}</span></div>
      </form></div><Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to storefront</Link>
  </div></main>
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-card p-5"><p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-medium">{value}</p></div> }
function Field({ label, value, onChange, type = "text", placeholder, disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; disabled?: boolean }) { return <label className="grid gap-2 text-sm font-medium">{label}<input disabled={disabled} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60" /></label> }
function UploadField({ label, accept, onUpload }: { label: string; accept: string; onUpload: (file: File) => void }) { return <label className="grid gap-2 text-sm font-medium">{label}<input type="file" accept={accept} onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file) }} className="rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm font-normal file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground" /></label> }
