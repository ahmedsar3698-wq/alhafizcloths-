import { Product, Category, Order, StoreSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS, INITIAL_SETTINGS } from '../data/initialData';
import { getSupabaseClient, uploadToSupabaseStorage } from './supabaseClient';

const STORAGE_KEYS = {
  PRODUCTS: 'ahc_products_v2_22colors',
  CATEGORIES: 'ahc_categories_v2',
  ORDERS: 'ahc_orders_v2',
  SETTINGS: 'ahc_settings_v2',
  ADMIN_AUTH: 'ahc_admin_auth_v1'
};

class StorageService {
  // --- Products ---
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!data) {
        this.saveProducts(INITIAL_PRODUCTS);
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading products from storage:', e);
      return INITIAL_PRODUCTS;
    }
  }

  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      // Proactively sync with Supabase if connected
      this.syncProductToSupabaseAsync(products);
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id || p.slug === id);
  }

  saveProduct(product: Product): Product {
    const products = this.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);

    let updatedList: Product[];
    if (existingIndex >= 0) {
      updatedList = [...products];
      updatedList[existingIndex] = product;
    } else {
      updatedList = [product, ...products];
    }

    this.saveProducts(updatedList);
    return product;
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length !== products.length) {
      this.saveProducts(filtered);
      return true;
    }
    return false;
  }

  // --- Categories ---
  getCategories(): Category[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        this.saveCategories(INITIAL_CATEGORIES);
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading categories:', e);
      return INITIAL_CATEGORIES;
    }
  }

  saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  }

  saveCategory(category: Category): Category {
    const categories = this.getCategories();
    const existingIndex = categories.findIndex(c => c.id === category.id);

    let updatedList: Category[];
    if (existingIndex >= 0) {
      updatedList = [...categories];
      updatedList[existingIndex] = category;
    } else {
      updatedList = [...categories, category];
    }

    this.saveCategories(updatedList);
    return category;
  }

  deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    if (filtered.length !== categories.length) {
      this.saveCategories(filtered);
      return true;
    }
    return false;
  }

  // --- Orders ---
  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!data) {
        this.saveOrders(INITIAL_ORDERS);
        return INITIAL_ORDERS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading orders:', e);
      return INITIAL_ORDERS;
    }
  }

  saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `AHC-${randomNum}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['status']): boolean {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveOrders(orders);
      return true;
    }
    return false;
  }

  // --- Store Settings ---
  getSettings(): StoreSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        this.saveSettings(INITIAL_SETTINGS);
        return INITIAL_SETTINGS;
      }
      return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      console.error('Error loading settings:', e);
      return INITIAL_SETTINGS;
    }
  }

  saveSettings(settings: StoreSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }

  // --- Admin Authentication State ---
  isAdminAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  }

  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  }

  // --- Image Upload (Supabase Storage + Local Permanent Data URL fallback) ---
  async uploadImage(file: File): Promise<string> {
    // 1. Try Supabase Storage if configured
    try {
      const supabaseUrl = await uploadToSupabaseStorage(file);
      if (supabaseUrl) {
        return supabaseUrl;
      }
    } catch (e) {
      console.warn('Supabase storage upload skipped or failed, using permanent data URL:', e);
    }

    // 2. Fallback to permanent base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to data URL'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  // Reset to factory defaults
  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    this.saveProducts(INITIAL_PRODUCTS);
    this.saveCategories(INITIAL_CATEGORIES);
    this.saveOrders(INITIAL_ORDERS);
    this.saveSettings(INITIAL_SETTINGS);
  }

  // Async helper to attempt background sync with Supabase tables
  private async syncProductToSupabaseAsync(products: Product[]) {
    const client = getSupabaseClient();
    if (!client) return;

    try {
      // Upsert latest products to 'products' table
      const formatted = products.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        description: p.description,
        fabric_type: p.fabricType,
        images: p.images,
        colors: p.colors,
        quality_badge: p.qualityBadge,
        capry_guarantee: p.capryGuarantee,
        is_featured: p.isFeatured,
        is_best_seller: p.isBestSeller,
        is_new_arrival: p.isNewArrival,
        stock_quantity: p.stockQuantity,
        created_at: p.createdAt
      }));

      await client.from('products').upsert(formatted);
    } catch (err) {
      // Background sync error is non-blocking
      console.debug('Background Supabase upsert note:', err);
    }
  }
}

export const storageService = new StorageService();
