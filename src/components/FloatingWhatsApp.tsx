import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { storageService } from '../services/storageService';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const settings = storageService.getSettings();

  const handleOpenWhatsApp = () => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      'Salam AL HAFIZ CLOTHS,\nI am browsing your collection and would like to inquire about fabric availability and Karachi free delivery.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Informative bubble */}
      {showTooltip && (
        <div className="mb-2 bg-[#141413] text-white text-xs py-2 px-3.5 rounded-lg shadow-xl border border-[#C5A059]/40 flex items-center gap-2.5 animate-fadeIn max-w-xs">
          <div>
            <div className="font-semibold text-[#C5A059] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
              AL HAFIZ CLOTHS WhatsApp
            </div>
            <div className="text-[11px] text-stone-300">
              Free Delivery in Karachi · Order in 1 minute
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Close notification"
            className="text-stone-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleOpenWhatsApp}
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-white"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="font-semibold text-xs tracking-wide hidden sm:inline">
          Order on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600"></span>
        </span>
      </button>
    </div>
  );
};
