import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { storageService } from '../services/storageService';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAdmin: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAdmin,
  onSelectCategory
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = storageService.getSettings();

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsAppDirect = () => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent('Salam AL HAFIZ CLOTHS, I am visiting your website and would like to inquire about your men\'s unstitched suits and Karachi free delivery.')}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#141413] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#2C2B29]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] tracking-wider uppercase font-medium">
            <span className="text-[#C5A059] flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 inline" />
              FREE DELIVERY IN KARACHI
            </span>
            <span className="text-stone-500">·</span>
            <span>CAPRY GUARANTEE</span>
            <span className="text-stone-500">·</span>
            <span className="hidden sm:inline">100% COLOR FASTNESS & NO SHRINKAGE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] tracking-wide shrink-0">
            <button
              onClick={openWhatsAppDirect}
              className="text-[#25D366] hover:text-[#2fe671] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">WhatsApp:</span> {settings.whatsappNumber}
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-[#C5A059] transition-colors cursor-pointer font-medium"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering to Top Bar Contract: 
          [Brand title, one line] — [4-5 nav links, single-line] — [1 primary action] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-[#141413] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                AH
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#141413] group-hover:text-[#8C6D2C] transition-colors whitespace-nowrap">
                  AL HAFIZ CLOTHS
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8C6D2C] font-semibold -mt-1">
                  ESTD. KARACHI · MEN'S FABRIC
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentTab === 'home'
                ? 'text-[#8C6D2C] border-b-2 border-[#C5A059] font-semibold'
                : 'hover:text-[#141413]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentTab === 'shop'
                ? 'text-[#8C6D2C] border-b-2 border-[#C5A059] font-semibold'
                : 'hover:text-[#141413]'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('Pure Cotton');
              handleNavClick('shop');
            }}
            className="hover:text-[#141413] transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0"
          >
            Pure Cotton
          </button>
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('Washing Wear');
              handleNavClick('shop');
            }}
            className="hover:text-[#141413] transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0"
          >
            Washing Wear
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentTab === 'about'
                ? 'text-[#8C6D2C] border-b-2 border-[#C5A059] font-semibold'
                : 'hover:text-[#141413]'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
              currentTab === 'contact'
                ? 'text-[#8C6D2C] border-b-2 border-[#C5A059] font-semibold'
                : 'hover:text-[#141413]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions (WhatsApp Quick Order & Cart Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openWhatsAppDirect}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#141413] hover:bg-[#25D366] hover:text-[#141413] border border-[#C5A059]/50 rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-[#141413]" />
            <span>Order on WhatsApp</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping bag"
            className="relative p-2.5 text-stone-800 hover:text-[#8C6D2C] border border-[#E8E2D5] bg-white rounded-md hover:bg-stone-50 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2.5 text-stone-800 hover:text-[#8C6D2C] border border-[#E8E2D5] bg-white rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E8E2D5] px-4 py-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-[#E8E2D5]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-white rounded"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-white rounded"
            >
              All Products
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Pure Cotton');
                handleNavClick('shop');
              }}
              className="text-left px-3 py-2 text-sm text-stone-700 hover:bg-white rounded"
            >
              Pure Cotton
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Washing Wear');
                handleNavClick('shop');
              }}
              className="text-left px-3 py-2 text-sm text-stone-700 hover:bg-white rounded"
            >
              Washing Wear
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Mix Cotton');
                handleNavClick('shop');
              }}
              className="text-left px-3 py-2 text-sm text-stone-700 hover:bg-white rounded"
            >
              Mix Cotton
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('Premium Unstitched Suits');
                handleNavClick('shop');
              }}
              className="text-left px-3 py-2 text-sm text-stone-700 hover:bg-white rounded"
            >
              Premium Suits
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 text-sm text-stone-700 hover:bg-white rounded"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 text-sm text-stone-700 hover:bg-white rounded"
            >
              Contact
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={openWhatsAppDirect}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold text-sm rounded-md shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: +92 326 2444991
            </button>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 px-1">
              <span>Delivery: Free in Karachi</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-[#8C6D2C] underline font-medium"
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
