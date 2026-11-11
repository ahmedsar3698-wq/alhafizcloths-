import { ProductColor } from '../types';

export interface FabricColorDetail extends ProductColor {
  urduName: string;
  category: 'Classic Whites & Creams' | 'Dark & Royal' | 'Earth & Tones' | 'Festive & Pastels';
  description: string;
}

export const TWENTY_TWO_FABRIC_COLORS: FabricColorDetail[] = [
  // 1. Off-White
  {
    name: 'Off-White Ivory',
    urduName: 'آف وائٹ',
    hex: '#FDFBF7',
    inStock: true,
    category: 'Classic Whites & Creams',
    description: 'Subtle warm natural shade, timeless for formal Eastern poise.'
  },
  // 2. Pure White
  {
    name: 'Pure White (Chitta)',
    urduName: 'چٹا سفید',
    hex: '#FFFFFF',
    inStock: true,
    category: 'Classic Whites & Creams',
    description: 'Crisp bright white preferred for Friday prayers and Jummah.'
  },
  // 3. Pearl Cream
  {
    name: 'Pearl Cream (Makhan)',
    urduName: 'مکھن کریم',
    hex: '#F6F0E6',
    inStock: true,
    category: 'Classic Whites & Creams',
    description: 'Rich buttery luster cream with elegant warmth.'
  },
  // 4. Jet Black
  {
    name: 'Jet Black (Siyah)',
    urduName: 'جیٹ بلیک',
    hex: '#0D0D0D',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Deep midnight obsidian black with color-lock guarantee.'
  },
  // 5. Charcoal Slate Grey
  {
    name: 'Charcoal Grey',
    urduName: 'چارکول گرے',
    hex: '#2B2D31',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Distinguished executive tone with heavy fall.'
  },
  // 6. Steel Metal Grey
  {
    name: 'Steel Grey',
    urduName: 'اسٹیل گرے',
    hex: '#606770',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Modern metallic grey suitable for office wear.'
  },
  // 7. Royal Navy Blue
  {
    name: 'Royal Navy Blue',
    urduName: 'رائل نیوی',
    hex: '#152238',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Regal navy blue with deep saturation.'
  },
  // 8. Midnight Blue
  {
    name: 'Midnight Blue',
    urduName: 'مڈ نائٹ بلیو',
    hex: '#0C1427',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Near-black deep blue with rich evening presence.'
  },
  // 9. Sky Blue
  {
    name: 'Sky Blue (Ferozi)',
    urduName: 'آسمانی فیروزی',
    hex: '#82A7C3',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Refreshing cool blue tailored for sunny Pakistani summers.'
  },
  // 10. Teal Peacock
  {
    name: 'Teal Peacock (Mor Pankhi)',
    urduName: 'مور پنکھی ٹیل',
    hex: '#0F5B66',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Unique peacock teal that commands understated respect.'
  },
  // 11. Zaytuni Olive Green
  {
    name: 'Zaytuni Olive Green',
    urduName: 'زیتونی گرین',
    hex: '#48532B',
    inStock: true,
    category: 'Earth & Tones',
    description: 'Top seller olive green with earthy depth.'
  },
  // 12. Forest Bottle Green
  {
    name: 'Forest Bottle Green',
    urduName: 'بوتل گرین',
    hex: '#193828',
    inStock: true,
    category: 'Dark & Royal',
    description: 'Traditional Pakistani festive green for celebrations.'
  },
  // 13. Pistachio Mint Green
  {
    name: 'Pistachio Mint',
    urduName: 'پستہ منٹ',
    hex: '#A6C1AD',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Gentle pastel sage mint, soothing and lightweight.'
  },
  // 14. Camel Fawn
  {
    name: 'Camel Fawn (Oont)',
    urduName: 'کیمل فون',
    hex: '#C29B6C',
    inStock: true,
    category: 'Earth & Tones',
    description: 'Signature camel shade favored for executive suits.'
  },
  // 15. Sand Khaki
  {
    name: 'Sand Khaki (Retila)',
    urduName: 'خاکی بیج',
    hex: '#D4BA95',
    inStock: true,
    category: 'Earth & Tones',
    description: 'Versatile neutral khaki that pairs with any waistcoat.'
  },
  // 16. Walnut Badami Brown
  {
    name: 'Walnut Brown (Badami)',
    urduName: 'بادامی براؤن',
    hex: '#5C4033',
    inStock: true,
    category: 'Earth & Tones',
    description: 'Warm medium brown with rich textural depth.'
  },
  // 17. Dark Chocolate Brown
  {
    name: 'Chocolate Brown',
    urduName: 'ڈارک چاکلیٹ',
    hex: '#3A231C',
    inStock: true,
    category: 'Earth & Tones',
    description: 'Deep espresso roast shade with immaculate luster.'
  },
  // 18. Burgundy Maroon
  {
    name: 'Burgundy Maroon',
    urduName: 'شاہی مرون',
    hex: '#541525',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Royal maroon crafted for Nikkah, Eid, and evening events.'
  },
  // 19. Deep Plum Jamuni
  {
    name: 'Deep Plum (Jamuni)',
    urduName: 'جامنی پلم',
    hex: '#3D1B34',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Rare sophisticated plum hue with rich fabric fall.'
  },
  // 20. Rust Copper
  {
    name: 'Rust Copper (Taanba)',
    urduName: 'تانبا رسٹ',
    hex: '#A84A28',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Warm copper terracotta tone that stands out distinctly.'
  },
  // 21. Haldi Mustard Gold
  {
    name: 'Haldi Mustard Gold',
    urduName: 'ہلدی مسٹرڈ',
    hex: '#D49D1C',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Golden mustard tint ideal for Mayun, Mehndi, and festivities.'
  },
  // 22. Lilac Ash Smoke
  {
    name: 'Lilac Ash Smoke',
    urduName: 'ایش سموک',
    hex: '#8F8A98',
    inStock: true,
    category: 'Festive & Pastels',
    description: 'Subtle smokey lavender grey for modern trendsetters.'
  }
];
