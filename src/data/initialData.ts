import { Category, Product, StoreSettings, CustomerReview, Order } from '../types';
import { TWENTY_TWO_FABRIC_COLORS } from './fabricColors';

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: 'AL HAFIZ CLOTHS',
  tagline: 'Premium Fabric. Perfect Elegance.',
  whatsappNumber: '+92-326-2444991',
  whatsappDirectLink: 'https://wa.me/923262444991',
  freeDeliveryCity: 'Karachi',
  otherCitiesDeliveryFee: 250,
  announcementBanner: 'FREE DELIVERY IN KARACHI • 22 SIGNATURE FABRIC SHADES • CAPRY GUARANTEE • WHATSAPP +92 326 2444991',
  capryGuaranteeDescription: 'Our signature Capry Guarantee guarantees no pilling, zero color fading, perfect drape, and shrinkage resistance on all suits.',
  adminPin: '1234',
  supabaseUrl: '',
  supabaseAnonKey: '',
  supabaseStorageBucket: 'product-images'
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-pure-cotton',
    name: 'Pure Cotton',
    slug: 'pure-cotton',
    description: '100% breathable pure cotton suits tailored for the Pakistani climate with a soft, natural handfeel.',
    image: '/src/assets/images/category_pure_cotton_1794376205562.jpg',
    itemCount: 16
  },
  {
    id: 'cat-washing-wear',
    name: 'Washing Wear',
    slug: 'washing-wear',
    description: 'Wrinkle-resistant luxury wash-and-wear fabrics with impeccable drape and rich sheen in 22 colors.',
    image: '/src/assets/images/washingwear_shades_1794377184365.jpg',
    itemCount: 22
  },
  {
    id: 'cat-mix-cotton',
    name: 'Mix Cotton',
    slug: 'mix-cotton',
    description: 'Blended poly-cotton suiting designed for daily executive wear, easy ironing and all-day crispness.',
    image: '/src/assets/images/hero_unstitched_fabric_1794376205170.jpg',
    itemCount: 14
  },
  {
    id: 'cat-premium-suits',
    name: 'Premium Unstitched Suits',
    slug: 'premium-unstitched-suits',
    description: 'Elite unstitched fabric cuts with golden selvedge, luxury gift packaging box, and Capry guarantee.',
    image: '/src/assets/images/luxury_suit_box_1794377184536.jpg',
    itemCount: 18
  },
  {
    id: 'cat-mens-suit-collection',
    name: "Men's Suit Collection",
    slug: 'mens-suit-collection',
    description: 'Classic Shalwar Kameez and Kurta suiting crafted for weddings, Friday prayers, and formal gatherings.',
    image: '/src/assets/images/fabric_palette_stack_1794377183333.jpg',
    itemCount: 12
  },
  {
    id: 'cat-new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Latest seasonal arrivals woven in 22 fresh trending shades and high-thread-count weaves.',
    image: '/src/assets/images/fabric_palette_stack_1794377183333.jpg',
    itemCount: 15
  },
  {
    id: 'cat-best-sellers',
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Customer favorites trusted by thousands of Pakistani men for superior durability and elegance.',
    image: '/src/assets/images/luxury_suit_box_1794377184536.jpg',
    itemCount: 11
  },
  {
    id: 'cat-other-varieties',
    name: 'Other Fabric Varieties',
    slug: 'other-fabric-varieties',
    description: 'Specialty textured karandi, tropical blends, and rich slub cotton suiting varieties.',
    image: '/src/assets/images/product_craft_detail_1794376205743.jpg',
    itemCount: 9
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ahc-001',
    name: 'Royal Sovereign 22-Shade Washing Wear',
    slug: 'royal-sovereign-washing-wear',
    category: 'Washing Wear',
    price: 2450,
    originalPrice: 3200,
    description: 'An elite wrinkle-free washing wear fabric engineered for hot Karachi summers and formal evenings. Available in all 22 signature Pakistani shades. Smooth fall, rich royal finish, with 4.5 meters unstitched cut sufficient for a full shalwar kameez.',
    fabricType: 'Tropical Washing Wear Wrinkle-Free',
    lengthMeters: 4.5,
    widthInches: 54,
    images: [
      '/src/assets/images/fabric_palette_stack_1794377183333.jpg',
      '/src/assets/images/category_washing_wear_1794376205950.jpg',
      '/src/assets/images/washingwear_shades_1794377184365.jpg'
    ],
    colors: TWENTY_TWO_FABRIC_COLORS.slice(0, 12),
    qualityBadge: 'Best Fabric',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: 100% color fastness, zero lint, and wrinkle-recovery promise.',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    stockQuantity: 42,
    season: 'All Season',
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'ahc-002',
    name: 'Imperial Giza Pure Cotton',
    slug: 'imperial-giza-pure-cotton',
    category: 'Pure Cotton',
    price: 3200,
    originalPrice: 3950,
    description: 'Handcrafted from long-staple combed cotton fibers. Breathable, exceptionally soft against sensitive skin, and pre-shrunk to retain crisp tailoring through countless washes.',
    fabricType: '100% Pure Combed Cotton',
    lengthMeters: 4.5,
    widthInches: 56,
    images: [
      '/src/assets/images/category_pure_cotton_1794376205562.jpg',
      '/src/assets/images/fabric_palette_stack_1794377183333.jpg',
      '/src/assets/images/product_craft_detail_1794376205743.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[0], // Off-White
      TWENTY_TWO_FABRIC_COLORS[1], // Pure White
      TWENTY_TWO_FABRIC_COLORS[2], // Pearl Cream
      TWENTY_TWO_FABRIC_COLORS[8], // Sky Blue
      TWENTY_TWO_FABRIC_COLORS[12], // Pistachio Mint
      TWENTY_TWO_FABRIC_COLORS[14], // Sand Khaki
      TWENTY_TWO_FABRIC_COLORS[21]  // Lilac Ash
    ],
    qualityBadge: 'Premium Quality',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Pre-tested fabric with guaranteed color stay and zero pilling.',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    stockQuantity: 28,
    season: 'Summer Breeze',
    createdAt: '2026-03-03T11:30:00Z'
  },
  {
    id: 'ahc-003',
    name: 'Executive Mix Cotton Daily Suiting',
    slug: 'executive-mix-cotton-suiting',
    category: 'Mix Cotton',
    price: 1850,
    originalPrice: 2400,
    description: 'A durable blended poly-cotton fabric designed for office, daily wear and harsh commutes. Holds its press without creasing, easy to wash, and offering unmatched value.',
    fabricType: 'Blended Mix Cotton (65/35)',
    lengthMeters: 4.5,
    widthInches: 54,
    images: [
      '/src/assets/images/hero_unstitched_fabric_1794376205170.jpg',
      '/src/assets/images/washingwear_shades_1794377184365.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[4], // Charcoal
      TWENTY_TWO_FABRIC_COLORS[5], // Steel Grey
      TWENTY_TWO_FABRIC_COLORS[6], // Royal Navy
      TWENTY_TWO_FABRIC_COLORS[13], // Camel Fawn
      TWENTY_TWO_FABRIC_COLORS[14], // Sand Khaki
      TWENTY_TWO_FABRIC_COLORS[15]  // Walnut Brown
    ],
    qualityBadge: 'Color Guaranteed',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Tested resistance against color bleeding in hard Karachi tap water.',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 60,
    season: 'All Season',
    createdAt: '2026-03-05T09:00:00Z'
  },
  {
    id: 'ahc-004',
    name: 'Karachi Heritage Boxed Suiting',
    slug: 'karachi-heritage-unstitched-suit',
    category: 'Premium Unstitched Suits',
    price: 3650,
    originalPrice: 4400,
    description: 'Our flagship men\'s unstitched suit cut with woven golden selvedge border, imported buttons included, and presented in a luxury AL HAFIZ CLOTHS presentation box. Perfect for weddings and gifting.',
    fabricType: 'Superfine Micro-Luster Cotton Silk',
    lengthMeters: 4.5,
    widthInches: 56,
    images: [
      '/src/assets/images/luxury_suit_box_1794377184536.jpg',
      '/src/assets/images/product_craft_detail_1794376205743.jpg',
      '/src/assets/images/fabric_palette_stack_1794377183333.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[3], // Jet Black
      TWENTY_TWO_FABRIC_COLORS[6], // Royal Navy
      TWENTY_TWO_FABRIC_COLORS[10], // Zaytuni Olive
      TWENTY_TWO_FABRIC_COLORS[17], // Burgundy Maroon
      TWENTY_TWO_FABRIC_COLORS[18], // Deep Plum
      TWENTY_TWO_FABRIC_COLORS[13]  // Camel Fawn
    ],
    qualityBadge: 'Premium Collection',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Complete fabric replacement guarantee if not 100% satisfied.',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 20,
    season: 'All Season',
    createdAt: '2026-03-06T14:15:00Z'
  },
  {
    id: 'ahc-005',
    name: 'Sultanate Imperial Brocade Suiting (Top Luxury)',
    slug: 'sultanate-imperial-brocade-suiting',
    category: 'Premium Unstitched Suits',
    price: 4950,
    originalPrice: 5800,
    description: 'The pinnacle of Pakistani menswear. Luxurious high-thread jacquard suiting with subtle golden thread borders and matching monogram packaging. Hand-finished for festive Nikkah and Eid wardrobes.',
    fabricType: 'Royal Jacquard Silk-Finish Luster',
    lengthMeters: 4.5,
    widthInches: 56,
    images: [
      '/src/assets/images/luxury_suit_box_1794377184536.jpg',
      '/src/assets/images/fabric_palette_stack_1794377183333.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[2], // Pearl Cream
      TWENTY_TWO_FABRIC_COLORS[3], // Jet Black
      TWENTY_TWO_FABRIC_COLORS[11], // Forest Green
      TWENTY_TWO_FABRIC_COLORS[17], // Burgundy Maroon
      TWENTY_TWO_FABRIC_COLORS[20]  // Haldi Mustard Gold
    ],
    qualityBadge: 'Premium Collection',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Presidential grade cloth with lifetime sheen and non-shrink assurance.',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 15,
    season: 'All Season',
    createdAt: '2026-03-09T08:00:00Z'
  },
  {
    id: 'ahc-006',
    name: 'Platinum Heavy-Fall Washing Wear',
    slug: 'platinum-heavy-fall-washing-wear',
    category: 'Washing Wear',
    price: 4500,
    originalPrice: 5200,
    description: 'High-density heavy-fall poly viscose. The suit falls effortlessly without a single crease. Woven in 22 authentic Pakistani masculine shades with immaculate color retention.',
    fabricType: 'Platinum Dense Heavy-Fall Suiting',
    lengthMeters: 4.5,
    widthInches: 54,
    images: [
      '/src/assets/images/washingwear_shades_1794377184365.jpg',
      '/src/assets/images/fabric_palette_stack_1794377183333.jpg'
    ],
    colors: TWENTY_TWO_FABRIC_COLORS.slice(3, 15),
    qualityBadge: 'Best Fabric',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Wrinkle-proof fabric with complete anti-crease memory.',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 24,
    season: 'All Season',
    createdAt: '2026-03-08T15:30:00Z'
  },
  {
    id: 'ahc-007',
    name: 'Pasha Egyptian Combed Pure Cotton',
    slug: 'pasha-egyptian-combed-cotton',
    category: 'Pure Cotton',
    price: 4200,
    originalPrice: 4800,
    description: 'Exquisite 120s count combed Egyptian cotton with cool-touch thermoregulation. Soft, breathable, and designed for discerning corporate executives and elite gatherings.',
    fabricType: '120s Ultra Combed Giza Egyptian Cotton',
    lengthMeters: 4.5,
    widthInches: 56,
    images: [
      '/src/assets/images/category_pure_cotton_1794376205562.jpg',
      '/src/assets/images/luxury_suit_box_1794377184536.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[0], // Off-White
      TWENTY_TWO_FABRIC_COLORS[1], // Pure White
      TWENTY_TWO_FABRIC_COLORS[2], // Pearl Cream
      TWENTY_TWO_FABRIC_COLORS[8], // Sky Blue
      TWENTY_TWO_FABRIC_COLORS[12] // Mint
    ],
    qualityBadge: 'Premium Quality',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: 100% pure combed cotton with guaranteed zero color fading.',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 18,
    season: 'Summer Breeze',
    createdAt: '2026-03-07T11:00:00Z'
  },
  {
    id: 'ahc-008',
    name: 'Al-Hafiz 22-Color Spectrum Suiting',
    slug: 'al-hafiz-22-color-spectrum-suiting',
    category: "Men's Suit Collection",
    price: 3850,
    originalPrice: 4600,
    description: 'Created specifically for gentlemen seeking rare and distinguished colors. Woven in all 22 Pakistani shades from Zaytuni Green and Ferozi to Camel Fawn and Haldi Gold.',
    fabricType: 'Multi-Color Luster Twill Blend',
    lengthMeters: 4.5,
    widthInches: 54,
    images: [
      '/src/assets/images/fabric_palette_stack_1794377183333.jpg',
      '/src/assets/images/washingwear_shades_1794377184365.jpg'
    ],
    colors: TWENTY_TWO_FABRIC_COLORS, // ALL 22 COLORS!
    qualityBadge: 'Color Guaranteed',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Full spectrum of 22 fast colors with zero color bleed.',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 50,
    season: 'All Season',
    createdAt: '2026-03-06T10:00:00Z'
  },
  {
    id: 'ahc-009',
    name: 'Classic White Friday Pure Cotton',
    slug: 'classic-white-friday-pure-cotton',
    category: 'Pure Cotton',
    price: 2150,
    originalPrice: 2800,
    description: 'A timeless bright white pure cotton fabric woven with subtle herringbone self-texture. Crisp fall, breathable and designed specifically for Jummah prayers and traditional celebrations.',
    fabricType: '100% Pure Egyptian Self-Texture Cotton',
    lengthMeters: 4.25,
    widthInches: 54,
    images: [
      '/src/assets/images/category_pure_cotton_1794376205562.jpg',
      '/src/assets/images/product_craft_detail_1794376205743.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[1], // Pure White
      TWENTY_TWO_FABRIC_COLORS[0]  // Off-White
    ],
    qualityBadge: 'Capry Guarantee',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Guaranteed bright white that does not yellow with washing.',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isPublished: true,
    stockQuantity: 55,
    season: 'Summer Breeze',
    createdAt: '2026-03-02T08:30:00Z'
  },
  {
    id: 'ahc-010',
    name: 'Desert Dune Mix Cotton Suiting',
    slug: 'desert-dune-mix-cotton-suiting',
    category: 'Mix Cotton',
    price: 1650,
    originalPrice: 2200,
    description: 'Affordable luxury unstitched suit fabric in earth tones. Resilient fabric blend that withstands heavy laundry without fading or losing softness.',
    fabricType: 'Comfort Mix Cotton Blend',
    lengthMeters: 4.5,
    widthInches: 54,
    images: [
      '/src/assets/images/hero_unstitched_fabric_1794376205170.jpg',
      '/src/assets/images/washingwear_shades_1794377184365.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[13], // Camel Fawn
      TWENTY_TWO_FABRIC_COLORS[14], // Sand Khaki
      TWENTY_TWO_FABRIC_COLORS[15], // Walnut Brown
      TWENTY_TWO_FABRIC_COLORS[10]  // Zaytuni Olive
    ],
    qualityBadge: 'Color Guaranteed',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: Color stay assurance across 50+ wash cycles.',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 40,
    season: 'All Season',
    createdAt: '2026-03-07T16:20:00Z'
  },
  {
    id: 'ahc-011',
    name: 'Royal Heritage Boski Finish Suiting',
    slug: 'royal-heritage-boski-finish-suiting',
    category: 'Premium Unstitched Suits',
    price: 5000,
    originalPrice: 5800,
    description: 'The premier heavyweight Boski-feel suiting for winter and festive grandeur. Impeccable smooth drape, silk-soft texture, and packaged in a collector gift box with custom buttons.',
    fabricType: 'Premium Heavy Boski-Feel Spun Silk',
    lengthMeters: 4.5,
    widthInches: 56,
    images: [
      '/src/assets/images/luxury_suit_box_1794377184536.jpg',
      '/src/assets/images/category_pure_cotton_1794376205562.jpg'
    ],
    colors: [
      TWENTY_TWO_FABRIC_COLORS[0], // Off-White
      TWENTY_TWO_FABRIC_COLORS[2], // Pearl Cream
      TWENTY_TWO_FABRIC_COLORS[3], // Jet Black
      TWENTY_TWO_FABRIC_COLORS[13] // Camel
    ],
    qualityBadge: 'Premium Collection',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: 100% Boski-finish guarantee with lifetime crease resilience.',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 12,
    season: 'All Season',
    createdAt: '2026-03-10T12:00:00Z'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    name: 'Tariq Mehmood',
    city: 'Karachi (Gulshan-e-Iqbal)',
    rating: 5,
    comment: 'Received the Royal Sovereign Washing Wear in Zaytuni Green in less than 24 hours with free Karachi delivery! The color selection with 22 shades is amazing. Tailor was very impressed.',
    productPurchased: 'Royal Sovereign 22-Shade Washing Wear',
    date: 'March 8, 2026',
    verified: true
  },
  {
    id: 'rev-02',
    name: 'Shahzaib Akhtar',
    city: 'Karachi (DHA Phase 6)',
    rating: 5,
    comment: 'The Capry Guarantee is real. I washed the fabric before giving it to my tailor, zero color bleed and absolutely no shrinkage. Ordered the Rs. 4,950 Sultanate Brocade box suit on WhatsApp immediately.',
    productPurchased: 'Sultanate Imperial Brocade Suiting',
    date: 'March 6, 2026',
    verified: true
  },
  {
    id: 'rev-03',
    name: 'Kamran Siddiqui',
    city: 'Karachi (North Nazimabad)',
    rating: 5,
    comment: 'Ordered through their WhatsApp button. The owner replied within 2 minutes, confirmed my order, and it arrived the very next afternoon. Beautiful packaging with buttons.',
    productPurchased: 'Karachi Heritage Boxed Suiting',
    date: 'March 4, 2026',
    verified: true
  },
  {
    id: 'rev-04',
    name: 'Bilal Hassan',
    city: 'Lahore (Model Town)',
    rating: 5,
    comment: 'The 22 color choices are unmatched. Bought Sky Blue and Camel Fawn. High quality and quick delivery across Punjab.',
    productPurchased: 'Al-Hafiz 22-Color Spectrum Suiting',
    date: 'March 1, 2026',
    verified: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'AHC-9421',
    customerName: 'Muhammad Salman',
    whatsappNumber: '+923001234567',
    city: 'Karachi',
    deliveryAddress: 'House 42, Block 5, Clifton, Karachi',
    deliveryFee: 0,
    items: [
      {
        productId: 'ahc-001',
        productName: 'Royal Sovereign 22-Shade Washing Wear',
        price: 2450,
        colorName: 'Zaytuni Olive Green',
        colorHex: '#48532B',
        quantity: 2,
        image: '/src/assets/images/fabric_palette_stack_1794377183333.jpg'
      }
    ],
    subtotal: 4900,
    total: 4900,
    status: 'Delivered',
    paymentMethod: 'COD',
    notes: 'Please call before arriving. Free Karachi delivery applied.',
    createdAt: '2026-03-08T14:20:00Z'
  },
  {
    id: 'AHC-9422',
    customerName: 'Usman Ghani',
    whatsappNumber: '+923339876543',
    city: 'Karachi',
    deliveryAddress: 'Flat 302, Al-Razi Heights, Gulistan-e-Jauhar Block 14, Karachi',
    deliveryFee: 0,
    items: [
      {
        productId: 'ahc-005',
        productName: 'Sultanate Imperial Brocade Suiting (Top Luxury)',
        price: 4950,
        colorName: 'Pearl Cream',
        colorHex: '#F6F0E6',
        quantity: 1,
        image: '/src/assets/images/luxury_suit_box_1794377184536.jpg'
      }
    ],
    subtotal: 4950,
    total: 4950,
    status: 'Shipped',
    paymentMethod: 'WhatsApp Direct',
    notes: 'Confirmed via WhatsApp chat.',
    createdAt: '2026-03-09T09:15:00Z'
  },
  {
    id: 'AHC-9423',
    customerName: 'Zubair Farooq',
    whatsappNumber: '+923214567890',
    city: 'Lahore',
    deliveryAddress: 'House 18, Sector Y, DHA Phase 3, Lahore',
    deliveryFee: 250,
    items: [
      {
        productId: 'ahc-008',
        productName: 'Al-Hafiz 22-Color Spectrum Suiting',
        price: 3850,
        colorName: 'Camel Fawn',
        colorHex: '#C29B6C',
        quantity: 1,
        image: '/src/assets/images/fabric_palette_stack_1794377183333.jpg'
      }
    ],
    subtotal: 3850,
    total: 4100,
    status: 'Confirmed',
    paymentMethod: 'COD',
    notes: 'Courier dispatch to Lahore with Rs. 250 delivery fee.',
    createdAt: '2026-03-10T11:45:00Z'
  }
];
