import { supabase } from '../lib/supabase';

export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { user: data?.user, error };
};

export const logoutAdmin = async () => {
  await supabase.auth.signOut();
};

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};