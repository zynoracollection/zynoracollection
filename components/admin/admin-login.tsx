"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    const { error: signInError } = await createClient().auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }
    router.push("/admin")
    router.refresh()
  }

  return <main className="flex min-h-screen items-center justify-center bg-background px-6"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-card p-8"><p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">ZynoraCollection</p><h1 className="font-serif text-4xl">Admin login</h1><p className="mt-2 text-sm text-muted-foreground">Sign in with a Supabase Auth user to manage your store.</p><div className="mt-8 grid gap-5"><label className="grid gap-2 text-sm font-medium">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" /></label><label className="grid gap-2 text-sm font-medium">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" /></label>{error && <p className="text-sm text-destructive">{error}</p>}<button disabled={loading} className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button></div><Link href="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">Back to storefront</Link></form></main>
}
