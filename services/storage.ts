import type { SupabaseClient } from '@supabase/supabase-js'
import { supabaseBrowser } from '../lib/supabase/browser'

function getClient(client?: SupabaseClient) {
  return client ?? supabaseBrowser
}

export async function upload(
  bucket: string,
  path: string,
  file: File | Blob | ArrayBuffer,
  options?: { contentType?: string; upsert?: boolean },
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.storage.from(bucket).upload(path, file as any, options)
  if (error) throw error
  return data
}

export async function remove(bucket: string, paths: string[], client?: SupabaseClient) {
  const sb = getClient(client)
  const { data, error } = await sb.storage.from(bucket).remove(paths)
  if (error) throw error
  return data
}

export function getPublicUrl(bucket: string, path: string, client?: SupabaseClient) {
  const sb = getClient(client)
  const { data } = sb.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function list(
  bucket: string,
  path: string = '',
  options?: { limit?: number; offset?: number; search?: string },
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.storage.from(bucket).list(path, options)
  if (error) throw error
  return data
}
