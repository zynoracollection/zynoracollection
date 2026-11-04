import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidateTag("products", { expire: 0 })
  revalidatePath("/", "layout")

  return NextResponse.json({ revalidated: true })
}
