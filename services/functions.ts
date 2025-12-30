import type { SupabaseClient } from '@supabase/supabase-js'
import { supabaseBrowser } from '../lib/supabase/browser'

function getClient(client?: SupabaseClient) {
  return client ?? supabaseBrowser
}

export async function invoke<T = any>(
  name: string,
  payload?: Record<string, any>,
  options?: { headers?: Record<string, string> },
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.functions.invoke<T>(name, {
    body: payload,
    headers: options?.headers,
  })
  if (error) throw error
  return data
}
