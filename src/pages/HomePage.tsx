import React from 'react';
import { ArrowRight, MessageCircle, Truck, ShieldCheck, CheckCircle2, Star, Sparkles, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';
import { INITIAL_REVIEWS } from '../data/initialData';
import { TWENTY_TWO_FABRIC_COLORS } from '../data/fabricColors';
import { storageService } from '../services/storageService';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  onViewProduct: (product: Product) => void;
  onNavigateTab: (tab: string) => void;
  onSelectCategory: (category: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  onViewProduct,
  onNavigateTab,
  onSelectCategory
}) => {
  const settings = storageService.getSettings();

  const featuredProducts = products.filter(p => p.isFeatured && p.isPublished).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller && p.isPublished).slice(0, 4);

  const openWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent('Salam AL HAFIZ CLOTHS, I am visiting your store and would like to order premium unstitched suits with Karachi free delivery.')}`, '_blank');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative bg-[#141413] text-white overflow-hidden border-b border-[#2C2B29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Editorial Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059]">
                <span>Karachi's Benchmark in Eastern Menswear</span>
                <span aria-hidden="true">·</span>
                <span>Free Karachi Delivery</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
                Wear Elegance. <br />
                <span className="italic font-normal text-[#C5A059]">Experience</span> Premium Quality.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed">
                Discover Pakistan's finest unstitched suits in Pure Cotton, wrinkle-free Washing Wear, and Mix Cotton. Engineered for luxury, comfort, and backed by our signature Capry Guarantee.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigateTab('shop')}
                  className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#b08d48] text-[#141413] font-bold text-xs uppercase tracking-wider rounded shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={openWhatsApp}
                  className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border border-[#C5A059]/60 font-semibold text-xs rounded transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              {/* Micro Trust Points */}
              <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center gap-6 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  <span>Free Delivery in Karachi</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Capry Guarantee (No Lint/Fading)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Full 4.5m Cuts with Selvedge</span>
                </div>
              </div>
            </div>

            {/* Right Media (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-stone-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                <img
                  src="/src/assets/images/hero_unstitched_fabric_1794376205170.jpg"
                  alt="Premium Unstitched Pakistani Men's Suits"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A059]">
                    AL HAFIZ SIGNATURE SUITING
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1">
                    Authentic 4.5m Men's Unstitched Fabric
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Pre-inspected selvedge cuts · Prices starting from Rs. 1,650
                  </p>
                </div>
              </div>

              {/* Floating Quality Callout */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-[#141413]/95 border border-[#C5A059] p-3.5 rounded shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-serif text-lg font-bold">
                  ★
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white tracking-wide">100% Capry Guarantee</div>
                  <div className="text-stone-400 text-[11px]">Free Replacement if color fades</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Benefits Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-lg border border-[#E8E2D5] p-6 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-amber-50 text-[#8C6D2C] shrink-0 border border-amber-200">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Free Delivery in Karachi</h4>
              <p className="text-xs text-stone-500 mt-0.5">Same day & 24h dispatch across all Karachi neighborhoods.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-emerald-50 text-emerald-800 shrink-0 border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Signature Capry Guarantee</h4>
              <p className="text-xs text-stone-500 mt-0.5">Strict quality control against pilling, shrinkage, or dye bleed.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-blue-50 text-blue-700 shrink-0 border border-blue-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Affordable Luxury (Rs. 1.5k–5k)</h4>
              <p className="text-xs text-stone-500 mt-0.5">Direct mill rates without middleman retail markup.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-stone-100 text-[#25D366] shrink-0 border border-stone-200">
              <MessageCircle className="w-5 h-5 fill-[#25D366] text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Instant WhatsApp Order</h4>
              <p className="text-xs text-stone-500 mt-0.5">Send your address and order in 1 click without complicated checkouts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
              Fabric Varieties
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Explore Our Collections
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="text-xs font-bold uppercase tracking-wider text-[#8C6D2C] hover:text-[#141413] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigateTab('shop');
              }}
              className="group relative bg-white border border-[#E8E2D5] rounded-lg overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-white flex items-center justify-between text-xs font-semibold text-stone-700">
                <span className="text-stone-500">{cat.itemCount || 10}+ Suits in Collection</span>
                <span className="text-[#8C6D2C] group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Products (Best Suits) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
              Curated Selection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Featured Unstitched Suits
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Handpicked fabrics guaranteed under our Capry Promise with free Karachi delivery.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="text-xs font-bold uppercase tracking-wider text-[#8C6D2C] hover:text-[#141413] flex items-center gap-1 cursor-pointer"
          >
            <span>See Entire Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. The 22 Signature Shades of AL HAFIZ CLOTHS (رنگوں کی بہار) */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
                <span>22 Distinct Color Varieties</span>
                <span>·</span>
                <span className="font-serif italic text-stone-500">رنگوں کی بہار</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
                22 Exclusive Shades for Discerning Pakistani Men
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                From pure whites and royal navies to zaytuni olive, camel fawn, and festive haldi gold. Pre-dyed in color-fast reactive vat dyes with Capry Guarantee.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('shop')}
              className="px-5 py-2.5 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors shrink-0"
            >
              Explore All 22 Colors
            </button>
          </div>

          {/* Banner showing real stacked fabric image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-6 sm:p-8 rounded-xl border border-[#E8E2D5]">
            <div className="lg:col-span-5 rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-lg aspect-[4/3] bg-stone-900">
              <img
                src="/src/assets/images/fabric_palette_stack_1794377183333.jpg"
                alt="22 Folded Unstitched Men's Suits with Golden Selvedge"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C6D2C] bg-[#8C6D2C]/10 px-2 py-0.5 rounded">
                Master Dye-Fastness Standard
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Pick Your Signature Shade (Click to Explore)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Click any of our 22 colors below to view available fabrics tailored in that shade with our signature Capry Guarantee against shrinkage and color fading.
              </p>

              {/* 22 Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2">
                {TWENTY_TWO_FABRIC_COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      onSelectCategory('all');
                      onNavigateTab('shop');
                    }}
                    className="flex items-center gap-2 p-2 bg-white rounded border border-[#E8E2D5] hover:border-[#C5A059] hover:shadow-xs transition-all text-left cursor-pointer group"
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0 group-hover:scale-110 transition-transform shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-stone-900 truncate leading-tight">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-stone-500 font-serif leading-none mt-0.5">
                        {c.urduName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Craftsmanship & Karachi Fabric Story */}
      <section className="bg-[#1C1917] text-white py-16 sm:py-20 border-y border-[#2C2B29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-xl aspect-[4/3]">
                <img
                  src="/src/assets/images/luxury_suit_box_1794377184536.jpg"
                  alt="Pakistani Tailoring Craftsmanship and Luxury Boxed Fabric"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 text-[11px] text-[#C5A059] rounded border border-[#C5A059]/30">
                  Woven in Pakistan · Estd. Karachi
                </div>
              </div>
            </div>

            {/* Narrative (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="text-xs font-bold tracking-widest uppercase text-[#C5A059]">
                The AL HAFIZ Difference
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Why Discerning Men Trust Our Capry Guaranteed Suiting
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                In Pakistan, an unstitched suit is more than fabric—it is the foundation of a gentleman's presence at Friday prayers, family weddings, and executive meetings. We reject thin, adulterated cloth. Every AL HAFIZ CLOTHS cut undergoes rigorous pre-shrinkage testing and dye-fastness checks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-stone-900/90 rounded border border-stone-800">
                  <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>The Capry Guarantee</span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    No pilling, no fuzzing, and zero color bleeding. If your fabric fails within 7 days, we replace it with zero questions asked.
                  </p>
                </div>

                <div className="p-4 bg-stone-900/90 rounded border border-stone-800">
                  <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#C5A059]" />
                    <span>Free Delivery in Karachi</span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Direct door-to-door delivery across Clifton, DHA, Gulshan, Nazimabad, Malir, and all areas with Cash on Delivery.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openWhatsApp}
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat With Our Fabric Master (+92 326 2444991)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
              Customer Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('shop')}
            className="text-xs font-bold uppercase tracking-wider text-[#8C6D2C] hover:text-[#141413] flex items-center gap-1 cursor-pointer"
          >
            <span>View All Best Sellers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 7. Real Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
            Verified Feedback
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            What Gentlemen Say Across Pakistan
          </h2>
          <p className="text-xs text-stone-500">
            Real orders placed via WhatsApp & Cash on Delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-lg border border-[#E8E2D5] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <span>{rev.name}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                      Verified
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">{rev.city}</div>
                <div className="text-[10px] text-[#8C6D2C] mt-1 font-medium">{rev.productPurchased}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WhatsApp Direct Order Announcement Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#141413] via-[#1C1917] to-[#141413] rounded-xl p-8 sm:p-12 text-white border border-[#C5A059]/50 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold tracking-widest uppercase text-[#C5A059]">
              <Truck className="w-4 h-4" />
              <span>FREE DELIVERY IN KARACHI</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Prefer Ordering on WhatsApp?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Message us your favorite fabric name, color choice, and Karachi address. We will confirm your order within minutes and dispatch with Cash on Delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={openWhatsApp}
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Message +92-326-2444991</span>
            </button>
            <button
              onClick={() => onNavigateTab('shop')}
              className="px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-lg transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
