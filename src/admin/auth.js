import { supabase } from '../lib/supabase';

export const loginAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error.message);
      throw error;
    }

    // For debugging in production
    if (import.meta.env.MODE === 'production') {
      console.log('Login successful - User:', data.user?.email);
    }

    return { 
      user: data.user, 
      session: data.session 
    };
    
  } catch (error) {
    // Handle network errors specifically
    if (error.message.includes('NetworkError')) {
      throw new Error('Connection failed. Check your network or CORS settings.');
    }
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any residual session data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sb-auth-token');
    }
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session fetch error:', error.message);
      throw error;
    }

    // Debugging for Vercel deployments
    if (!session && import.meta.env.MODE === 'production') {
      console.warn('No active session found - Check CORS and cookie settings');
    }

    return session;
    
  } catch (error) {
    // Handle JWT/refresh token issues
    if (error.message.includes('JWT')) {
      console.error('Authentication token error - Try logging in again');
    }
    return null;
  }
};

// Additional helper for Vercel edge functions
export const verifySession = async (request) => {
  if (typeof window === 'undefined') {
    // Server-side session check
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const { data: { user }, error } = await supabase.auth.getUser(token);
      return { user, error };
    }
    return { user: null, error: 'No token provided' };
  }
  return getSession();
};