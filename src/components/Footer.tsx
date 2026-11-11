import React from 'react';
import { MessageCircle, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Clock } from 'lucide-react';
import { storageService } from '../services/storageService';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  onOpenAdmin,
  onSelectCategory
}) => {
  const settings = storageService.getSettings();

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const clean = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}`, '_blank');
  };

  return (
    <footer className="bg-[#141413] text-stone-300 pt-16 pb-12 border-t border-[#2C2B29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-stone-900 border border-[#C5A059]/30 text-[#C5A059] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Free Delivery in Karachi</h4>
              <p className="text-xs text-stone-400 mt-0.5">Prompt 24-48h dispatch across Karachi. Courier across Pakistan.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-stone-900 border border-[#C5A059]/30 text-[#C5A059] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">Capry Guarantee</h4>
              <p className="text-xs text-stone-400 mt-0.5">Signature guarantee: zero pilling, no color fading & pre-shrunk finish.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-stone-900 border border-[#C5A059]/30 text-[#C5A059] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">7-Day Easy Exchange</h4>
              <p className="text-xs text-stone-400 mt-0.5">Uncut fabric can be swapped hassle-free if shade doesn't match expectation.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-stone-900 border border-[#C5A059]/30 text-[#C5A059] shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide">WhatsApp Order Assist</h4>
              <p className="text-xs text-stone-400 mt-0.5">Direct 1-on-1 human order confirmation & real fabric videos on request.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#C5A059] text-[#141413] flex items-center justify-center font-serif text-base font-bold">
                AH
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                AL HAFIZ CLOTHS
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Premium men's unstitched suits and exquisite eastern suiting fabrics. Rooted in Karachi, serving discerning gentlemen with uncompromised quality, elegant colors, and genuine Capry Guarantee.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Karachi Textile Market & Dispatch Hub, Karachi, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>+92 326 2444991 (Call & WhatsApp)</span>
              </p>
            </div>
          </div>

          {/* Fabric Categories */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-[#C5A059]">
              Fabric Categories
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('Washing Wear');
                    handleNavClick('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Washing Wear Fabric
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('Pure Cotton');
                    handleNavClick('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Pure Cotton Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('Mix Cotton');
                    handleNavClick('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mix Cotton Suiting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('Premium Unstitched Suits');
                    handleNavClick('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Premium Unstitched Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory("Men's Suit Collection");
                    handleNavClick('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Men's Suit Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('Other Fabric Varieties');
                    handleNavClick('shop');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Other Fabric Varieties
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4 text-[#C5A059]">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('shop')} className="hover:text-white transition-colors">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors">
                  About AL HAFIZ CLOTHS
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors">
                  Contact & Store Location
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('exchange-policy')} className="hover:text-white transition-colors">
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Order Box */}
          <div className="bg-stone-900/80 p-4 rounded-lg border border-stone-800 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
              Live WhatsApp Desk
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Have questions about fabric weight, colors or bulk orders? Connect directly with our textile specialist.
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat: +92 326 2444991
            </button>
            <div className="text-[11px] text-stone-400 text-center font-medium">
              Free Delivery Across All Areas of Karachi
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} AL HAFIZ CLOTHS. All Rights Reserved. Crafted for Pakistani Gentlemen.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavClick('privacy-policy')} className="hover:text-stone-300">
              Privacy
            </button>
            <span>·</span>
            <button onClick={() => handleNavClick('exchange-policy')} className="hover:text-stone-300">
              Exchange Terms
            </button>
            <span>·</span>
            <button onClick={onOpenAdmin} className="text-[#C5A059] hover:underline">
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
