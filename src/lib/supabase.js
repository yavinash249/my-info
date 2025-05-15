import { createClient } from '@supabase/supabase-js';

// Add validation for environment variables
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error(
    'Supabase URL and Anon Key must be provided in environment variables'
  );
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the client with additional configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Test connection (optional)
supabase.auth.getSession()
  .then(({ data }) => {
    console.log('Supabase connection established');
  })
  .catch((error) => {
    console.error('Supabase connection failed:', error);
  });