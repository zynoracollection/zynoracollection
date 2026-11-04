import { createClient } from "@supabase/supabase-js"

/**
 * Public, cookie-free Supabase client for catalog reads.
 * Keeps storefront routes cacheable instead of forcing dynamic rendering.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  )
}
