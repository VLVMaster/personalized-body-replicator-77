
// This file is kept for compatibility but doesn't initialize Supabase anymore
// We're using a GitHub-based approach for form submissions instead

let supabase: any = null;
let supabaseError = true;
let errorMessage = 'Supabase integration is not enabled. Using alternative form submission method.';

console.log('Alternative form submission is active');

export { supabase, supabaseError, errorMessage };
