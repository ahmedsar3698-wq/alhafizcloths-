import React from 'react';
import { ShieldCheck, Truck, Sparkles, MessageCircle, Award, HeartHandshake } from 'lucide-react';
import { storageService } from '../services/storageService';

export const AboutPage: React.FC<{ onNavigateShop: () => void }> = ({ onNavigateShop }) => {
  const settings = storageService.getSettings();

  const openWhatsApp = () => {
    const clean = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent('Salam AL HAFIZ CLOTHS, I read your story and would like to learn more about your fabric collections.')}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
          The Heritage of Eastern Menswear
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Crafting Affordable Luxury for the Discerning Pakistani Gentleman
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Rooted in Karachi's bustling textile traditions, AL HAFIZ CLOTHS was founded on a singular conviction: premium fabric must never be an overpriced luxury.
        </p>
      </div>

      {/* Grid: Image and Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-xl overflow-hidden border border-[#E8E2D5] shadow-xl aspect-[4/3] bg-stone-900">
            <img
              src="/src/assets/images/product_craft_detail_1794376205743.jpg"
              alt="Pakistani Men's Fabric Craftsmanship"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-[#141413] text-[#C5A059] p-4 rounded-lg shadow-xl border border-[#C5A059]/40 text-xs hidden sm:block">
            <div className="font-serif text-base font-bold text-white">Karachi, Pakistan</div>
            <div className="text-stone-300">Hub of South Asian Suiting Weaves</div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 text-stone-700 text-sm leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Unstitched Perfection, Every Single Meter
          </h2>
          <p>
            For generations, men across Karachi, Lahore, Peshawar, and Islamabad have treasured the ritual of selecting their unstitched cloth, choosing their tailor, and donning a bespoke Shalwar Kameez for Friday prayers, weddings, or Eid festivities.
          </p>
          <p>
            Yet too often, men faced frustrating trade-offs: cheap fabrics that pilled within three washes, stiff blends that trapped heat, or exorbitant boutique markups.
          </p>
          <p>
            <strong>AL HAFIZ CLOTHS</strong> changed that equation. By partnering directly with master weaving mills, we inspect and curate genuine long-staple cotton, wrinkle-free washing wear, and executive mix-cotton blends in 22 signature shades, priced transparently between <strong>Rs. 1,500 and Rs. 5,000</strong>.
          </p>

          <div className="pt-2">
            <button
              onClick={onNavigateShop}
              className="px-6 py-3 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs rounded transition-colors cursor-pointer"
            >
              Explore Our Fabrics
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-[#E8E2D5]">
        <div className="p-6 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#8C6D2C]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">The Capry Guarantee</h3>
          <p className="text-xs text-stone-600">
            Our gold standard: zero linting, shrinkage stability, and dye fastness across hundreds of washes.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
          <Truck className="w-6 h-6 text-[#8C6D2C]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Free Karachi Delivery</h3>
          <p className="text-xs text-stone-600">
            Direct doorstep courier service across all districts of Karachi with zero shipping surcharge.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
          <Award className="w-6 h-6 text-[#8C6D2C]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Full 4.5m Cuts</h3>
          <p className="text-xs text-stone-600">
            Generous fabric length with preserved woven selvedge suitable for tall gentlemen and classic tailoring.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-[#E8E2D5] space-y-2">
          <MessageCircle className="w-6 h-6 text-[#25D366]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">WhatsApp First Service</h3>
          <p className="text-xs text-stone-600">
            Personalized guidance, real video swatches upon request, and 1-click ordering at +92-326-2444991.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#141413] text-white p-8 sm:p-12 rounded-xl border border-[#C5A059]/40 text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">
          Experience the Feel of True Eastern Elegance
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
          Contact our fabric masters on WhatsApp or browse our seasonal catalogue with prompt Karachi dispatch.
        </p>
        <button
          onClick={openWhatsApp}
          className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat on WhatsApp: +92 326 2444991</span>
        </button>
      </div>
    </div>
  );
};
