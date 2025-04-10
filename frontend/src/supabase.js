import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmethktyezhadmugkegk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZXRoa3R5ZXpoYWRtdWdrZWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNDQ1OTQsImV4cCI6MjA1OTgyMDU5NH0.MYaGbDIoCCegxu6FmnDIifxKJzjgKjyoIUeRF7t39BQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
