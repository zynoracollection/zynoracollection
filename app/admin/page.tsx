import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getAdminProducts } from "@/lib/store-products"

export const metadata = {
  title: "Admin Dashboard | ZynoraCollection",
  description: "Manage your ZynoraCollection product content.",
}

export default function AdminPage() {
  return <AdminGate />
}

async function AdminGate() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const products = await getAdminProducts()
  if (!products.length) redirect("/")
  return <AdminDashboard products={products} />
}
