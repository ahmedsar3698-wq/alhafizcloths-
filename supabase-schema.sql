-- ====================================================================
-- AL HAFIZ CLOTHS - Complete Supabase PostgreSQL Schema & Storage Setup
-- Brand: AL HAFIZ CLOTHS (Men's Unstitched Suits & Premium Fabric)
-- ====================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image TEXT,
    item_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL CHECK (price >= 1500 AND price <= 5000),
    original_price NUMERIC,
    description TEXT NOT NULL,
    fabric_type TEXT NOT NULL,
    length_meters NUMERIC DEFAULT 4.5,
    width_inches NUMERIC DEFAULT 54,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    colors JSONB NOT NULL DEFAULT '[]'::jsonb,
    quality_badge TEXT DEFAULT 'Premium Quality',
    capry_guarantee BOOLEAN DEFAULT true,
    capry_guarantee_text TEXT DEFAULT 'Capry Guarantee: No lint, no shrinkage, 100% color fastness',
    is_featured BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 25,
    season TEXT DEFAULT 'All Season',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT,
    city TEXT NOT NULL DEFAULT 'Karachi',
    delivery_address TEXT NOT NULL,
    delivery_fee NUMERIC DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
    payment_method TEXT NOT NULL DEFAULT 'COD' CHECK (payment_method IN ('COD', 'WhatsApp Direct')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Store Settings Table
CREATE TABLE IF NOT EXISTS public.store_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    brand_name TEXT DEFAULT 'AL HAFIZ CLOTHS',
    tagline TEXT DEFAULT 'Premium Fabric. Perfect Elegance.',
    whatsapp_number TEXT DEFAULT '+92-326-2444991',
    whatsapp_direct_link TEXT DEFAULT 'https://wa.me/923262444991',
    free_delivery_city TEXT DEFAULT 'Karachi',
    other_cities_delivery_fee NUMERIC DEFAULT 250,
    announcement_banner TEXT DEFAULT 'FREE DELIVERY IN KARACHI • ORDER ON WHATSAPP +92 326 2444991',
    capry_guarantee_description TEXT DEFAULT 'Our signature Capry Guarantee guarantees no pilling, zero color fading, and shrinkage resistance.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Row Level Security (RLS) Configuration
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Public can read published products, categories, and settings
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Settings" ON public.store_settings FOR SELECT USING (true);

-- Anyone can insert an order (Guest checkout / WhatsApp checkout)
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Authenticated Admins have full access
CREATE POLICY "Admin All Categories" ON public.categories USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Products" ON public.products USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Orders" ON public.orders USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Settings" ON public.store_settings USING (auth.role() = 'authenticated');

-- 7. Supabase Storage Bucket Setup for Product Images
-- In Supabase Dashboard -> Storage:
-- 1. Create a public bucket named: "product-images"
-- 2. Add public read policy:
--    CREATE POLICY "Public can view product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
-- 3. Add authenticated insert/update/delete policy:
--    CREATE POLICY "Admins can upload product images" ON storage.objects FOR ALL USING (bucket_id = 'product-images');

-- 8. Helpful Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);
