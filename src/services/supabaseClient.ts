import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default to env variables if available
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (customUrl?: string, customKey?: string): SupabaseClient | null => {
  const url = customUrl || localStorage.getItem('ahc_supabase_url') || envUrl;
  const key = customKey || localStorage.getItem('ahc_supabase_key') || envKey;

  if (!url || !key) {
    return null;
  }

  try {
    if (!clientInstance) {
      clientInstance = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    }
    return clientInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const updateSupabaseCredentials = (url: string, key: string) => {
  if (url && key) {
    localStorage.setItem('ahc_supabase_url', url.trim());
    localStorage.setItem('ahc_supabase_key', key.trim());
    try {
      clientInstance = createClient(url.trim(), key.trim());
      return true;
    } catch {
      return false;
    }
  } else {
    localStorage.removeItem('ahc_supabase_url');
    localStorage.removeItem('ahc_supabase_key');
    clientInstance = null;
    return true;
  }
};

export const testSupabaseConnection = async (url?: string, key?: string): Promise<{ success: boolean; message: string }> => {
  const client = getSupabaseClient(url, key);
  if (!client) {
    return { success: false, message: 'Supabase URL or Anon Key is missing.' };
  }

  try {
    const { error } = await client.from('products').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      return { success: false, message: `Database check: ${error.message}` };
    }
    return { success: true, message: 'Connected to Supabase successfully!' };
  } catch (err: unknown) {
    return { success: false, message: (err as Error)?.message || 'Failed to connect to Supabase.' };
  }
};

export const uploadToSupabaseStorage = async (file: File, bucket = 'product-images'): Promise<string | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await client.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.warn('Supabase storage upload error:', uploadError.message);
      return null;
    }

    const { data } = client.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.warn('Supabase upload exception:', err);
    return null;
  }
};
