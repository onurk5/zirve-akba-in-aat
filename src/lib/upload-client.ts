"use client"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadImageClient(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || "jpg"
  const filename = `${Date.now()}-${Math.round(Math.random() * 10000)}.${ext}`

  const { data, error } = await supabaseClient
    .storage
    .from('images')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Resim yüklenemedi: ${error.message}`)
  }

  const { data: publicUrlData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(filename)

  return publicUrlData.publicUrl
}
