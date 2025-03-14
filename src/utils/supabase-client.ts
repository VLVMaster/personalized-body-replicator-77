
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a safer client initialization
let supabase: any = null;
let supabaseError = false;
let errorMessage = '';

try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client initialized successfully');
  } else {
    supabaseError = true;
    errorMessage = 'Missing Supabase URL or key in environment variables';
    console.error(errorMessage);
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  supabaseError = true;
  errorMessage = 'Failed to initialize Supabase client';
}

export { supabase, supabaseError, errorMessage };
