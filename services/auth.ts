import type { User, Session } from '@supabase/supabase-js'
import { supabaseBrowser } from '../lib/supabase/browser'
import { supabaseServer } from '../lib/supabase/server'

// Client-side auth actions
export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const { data, error } = await supabaseBrowser.auth.signUp({
    email,
    password,
    options: { data: metadata },
  })
  if (error) throw error
  return data
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabaseBrowser.auth.signOut()
  if (error) throw error
}

// Server-side helpers (use in RSC, server actions, or route handlers)
export async function getServerSession(): Promise<Session | null> {
  const supabase = supabaseServer()
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session ?? null
}

export async function getServerUser(): Promise<User | null> {
  const supabase = supabaseServer()
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user ?? null
}
