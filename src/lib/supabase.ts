import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const isDeadPlaceholder = supabaseUrl.includes('gytottzymosgtsirugle') || supabaseUrl.includes('placeholder');
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !isDeadPlaceholder)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

