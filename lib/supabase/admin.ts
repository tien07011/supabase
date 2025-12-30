import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Admin client for privileged server-side operations (RLS bypass)
// Use ONLY inside server actions, route handlers, or scripts.
export function supabaseAdmin() {
  return createClient(url, serviceRoleKey)
}
