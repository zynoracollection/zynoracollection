import fs from "node:fs"
import { createClient } from "@supabase/supabase-js"

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/=(.*)/s).slice(0, 2)),
)

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required")
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)
const { data: existing } = await supabase.auth.admin.listUsers({ perPage: 1000 })
const user = existing.users.find((candidate) => candidate.email?.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase())

const result = user
  ? await supabase.auth.admin.updateUserById(user.id, { password: process.env.ADMIN_PASSWORD, email_confirm: true })
  : await supabase.auth.admin.createUser({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, email_confirm: true })

if (result.error) throw new Error(result.error.message)
console.log(user ? "Admin password updated." : "Admin user created.")
