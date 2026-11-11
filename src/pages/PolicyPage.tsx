import React, { useState } from 'react';
import { ShieldCheck, Truck, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

interface PolicyPageProps {
  initialTab?: 'exchange' | 'privacy';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'exchange' }) => {
  const [activePolicy, setActivePolicy] = useState<'exchange' | 'privacy'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Policy Switcher */}
      <div className="flex border-b border-[#E8E2D5]">
        <button
          onClick={() => setActivePolicy('exchange')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activePolicy === 'exchange'
              ? 'border-[#C5A059] text-[#8C6D2C]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Return & Exchange Policy (Capry Guarantee)</span>
        </button>

        <button
          onClick={() => setActivePolicy('privacy')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-colors border-b-2 cursor-pointer flex items-center gap-2 ${
            activePolicy === 'privacy'
              ? 'border-[#C5A059] text-[#8C6D2C]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>
      </div>

      {activePolicy === 'exchange' ? (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E8E2D5] space-y-8 shadow-xs">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C6D2C]">
              Customer Assurance
            </span>
            <h1 className="font-serif text-3xl font-bold text-stone-900">
              Return, Exchange & Capry Guarantee Policy
            </h1>
            <p className="text-xs text-stone-500">
              Last updated: March 2026 · AL HAFIZ CLOTHS Karachi
            </p>
          </div>

          {/* Capry Guarantee Highlight */}
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-2">
            <h3 className="font-bold text-sm text-[#8C6D2C] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              The Signature Capry Guarantee
            </h3>
            <p className="leading-relaxed">
              Every unstitched suit sold by AL HAFIZ CLOTHS is guaranteed against fabric pilling (burr), shrinkage outside standard limits, and dye color bleeding. If you experience any of these defects before tailor cutting or during the initial pre-shrink soak, we provide an immediate 100% replacement or exchange.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-stone-900 text-sm mb-1.5">1. 7-Day Exchange Window</h3>
              <p>
                You may request an exchange within 7 days of receiving your order. Whether you prefer a different color shade, a different fabric type (e.g. switching from Mix Cotton to Pure Cotton), or another suit design, our Karachi support team will facilitate the exchange smoothly.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-sm mb-1.5">2. Uncut Fabric Condition</h3>
              <p>
                To qualify for an exchange, the fabric must remain unstitched and uncut by your tailor, with original tags and packaging intact. Once a suit has been tailored or scissors applied, it cannot be returned unless a clear manufacturing defect under the Capry Guarantee is verified.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-sm mb-1.5">3. Karachi Doorstep Exchange Process</h3>
              <p>
                For our Karachi customers enjoying Free Delivery: our rider can pick up the exchange suit and hand over your replacement directly at your doorstep for maximum convenience.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-sm mb-1.5">4. How to Initiate an Exchange</h3>
              <p>
                Simply send a WhatsApp message to <strong>+92-326-2444991</strong> with your Order ID (e.g. #AHC-9421) and a photo of the fabric. Our representative will schedule the pickup or courier dispatch promptly.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E8E2D5] space-y-6 shadow-xs text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C6D2C]">
              Data Protection
            </span>
            <h1 className="font-serif text-3xl font-bold text-stone-900">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500">
              Last updated: March 2026 · AL HAFIZ CLOTHS
            </p>
          </div>

          <p>
            At AL HAFIZ CLOTHS, we respect your privacy. This policy outlines how we collect and protect your customer information during your shopping experience.
          </p>

          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">1. Information We Collect</h3>
            <p>
              When placing an order or using WhatsApp checkout, we collect your Name, WhatsApp Mobile Number, Delivery City, and Complete Shipping Address strictly for processing and delivering your fabrics.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">2. No Third-Party Data Selling</h3>
            <p>
              We do not sell, rent, or trade your personal details with third-party advertising companies. Your contact details are solely used by our Karachi dispatch team and delivery riders to fulfill orders.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">3. WhatsApp Communications</h3>
            <p>
              By opting into WhatsApp ordering, you consent to receive direct order confirmations, dispatch receipts, and customer service updates on WhatsApp from +92-326-2444991. You can unsubscribe from seasonal updates at any time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
