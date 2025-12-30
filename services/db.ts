import type { SupabaseClient } from '@supabase/supabase-js'
import { supabaseBrowser } from '../lib/supabase/browser'

// Generic CRUD helpers. Pass a client for server/admin use.
function getClient(client?: SupabaseClient) {
  return client ?? supabaseBrowser
}

export async function select<T = any>(
  table: string,
  columns: string = '*',
  filter?: (q: ReturnType<SupabaseClient['from']>['select']) => ReturnType<SupabaseClient['from']>['select'],
  client?: SupabaseClient
) {
  const sb = getClient(client)
  let query = sb.from(table).select(columns)
  if (filter) {
    query = filter(query)
  }
  const { data, error } = await query
  if (error) throw error
  return data as T[]
}

export async function findById<T = any>(
  table: string,
  id: string | number,
  idColumn: string = 'id',
  columns: string = '*',
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.from(table).select(columns).eq(idColumn, id).limit(1).single()
  if (error) throw error
  return data as T
}

export async function insert<T = any>(
  table: string,
  rows: Partial<T> | Partial<T>[],
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.from(table).insert(rows).select()
  if (error) throw error
  return data as T[]
}

export async function updateById<T = any>(
  table: string,
  id: string | number,
  values: Partial<T>,
  idColumn: string = 'id',
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.from(table).update(values).eq(idColumn, id).select()
  if (error) throw error
  return data as T[]
}

export async function upsert<T = any>(
  table: string,
  rows: Partial<T> | Partial<T>[],
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { data, error } = await sb.from(table).upsert(rows).select()
  if (error) throw error
  return data as T[]
}

export async function deleteById(
  table: string,
  id: string | number,
  idColumn: string = 'id',
  client?: SupabaseClient
) {
  const sb = getClient(client)
  const { error } = await sb.from(table).delete().eq(idColumn, id)
  if (error) throw error
}
