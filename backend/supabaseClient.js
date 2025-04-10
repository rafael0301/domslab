import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmethktyezhadmugkegk.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZXRoa3R5ZXpoYWRtdWdrZWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDI0NDU5NCwiZXhwIjoyMDU5ODIwNTk0fQ.gulyLluU8G-atfTj-Y7WfuHm4NrhkXcTs8pv8ARmU7w'

export const supabase = createClient(supabaseUrl, supabaseServiceKey)
