
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a safer client initialization
let supabase: any = null;
let supabaseError = false;

try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    supabaseError = true;
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabaseError = true;
}

export { supabase, supabaseError };
