export type ProductQualityBadge = 
  | 'Premium Quality' 
  | 'Best Fabric' 
  | 'Color Guaranteed' 
  | 'Premium Collection'
  | 'Capry Guarantee';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number; // in PKR, between 1500 and 5000
  originalPrice?: number;
  description: string;
  fabricType: string; // e.g. "Pure Cotton", "Washing Wear", "Mix Cotton"
  lengthMeters: number; // standard 4.0 or 4.5 meters
  widthInches: number; // standard 54 or 56 inches
  images: string[];
  colors: ProductColor[];
  qualityBadge: ProductQualityBadge;
  capryGuarantee: boolean;
  capryGuaranteeText: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isPublished: boolean;
  stockQuantity: number;
  season?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  colorName: string;
  colorHex: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  whatsappNumber: string;
  email?: string;
  city: string; // 'Karachi' or other
  deliveryAddress: string;
  deliveryFee: number; // 0 for Karachi, e.g. 250 for others
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'COD' | 'WhatsApp Direct';
  notes?: string;
  createdAt: string;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappDirectLink: string;
  freeDeliveryCity: string;
  otherCitiesDeliveryFee: number;
  announcementBanner: string;
  capryGuaranteeDescription: string;
  adminPin: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseStorageBucket?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  productPurchased: string;
  date: string;
  verified: boolean;
}
