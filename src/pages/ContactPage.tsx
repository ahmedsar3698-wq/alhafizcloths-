import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Clock, Send, CheckCircle2, Truck } from 'lucide-react';
import { storageService } from '../services/storageService';

export const ContactPage: React.FC = () => {
  const settings = storageService.getSettings();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Suit Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const fullMsg = `*Salam AL HAFIZ CLOTHS,*\nName: ${name}\nPhone: ${phone}\nTopic: ${subject}\n\nMessage: ${message}`;
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(fullMsg)}`, '_blank');
    setSent(true);
  };

  const openDirectWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNum}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
          Get In Touch
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Contact AL HAFIZ CLOTHS
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          We are based in Karachi and provide personalized assistance on WhatsApp for fabric selection, color matching, and order inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Highlight Box */}
          <div className="bg-[#141413] text-white p-6 rounded-xl border border-[#C5A059]/40 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#25D366] text-white rounded-lg">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Official WhatsApp Desk</h3>
                <p className="text-xs text-stone-300">Fastest response for suit orders</p>
              </div>
            </div>

            <div className="text-sm text-stone-200">
              <span className="text-xs text-stone-400 block">WhatsApp Number:</span>
              <span className="font-mono font-bold text-[#C5A059] text-base">{settings.whatsappNumber}</span>
            </div>

            <button
              onClick={openDirectWhatsApp}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp Now</span>
            </button>
          </div>

          {/* Location & Timings */}
          <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] space-y-4 shadow-xs">
            <h4 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
              Dispatch & Store Information
            </h4>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8C6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Dispatch Hub:</strong>
                  Karachi Textile Market & Central Fulfillment Center, Karachi, Sindh, Pakistan.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Delivery Coverage:</strong>
                  FREE DOORSTEP DELIVERY across all areas of Karachi. Rider COD service available daily.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8C6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Operating Hours:</strong>
                  Monday – Saturday: 10:00 AM – 10:00 PM (PST)<br />
                  Sunday: 2:00 PM – 9:00 PM (WhatsApp orders processed 24/7)
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8C6D2C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Phone Support:</strong>
                  {settings.whatsappNumber}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E8E2D5] shadow-xs">
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
            Send an Inquiry
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            Fill out the details below and we will automatically open your query in WhatsApp for instant resolution.
          </p>

          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-800 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-emerald-900">Message Prepared</h4>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                WhatsApp was opened with your pre-filled inquiry. You can also message us directly at +92-326-2444991.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 px-4 py-2 text-xs font-semibold bg-emerald-800 text-white rounded"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan Siddiqui"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03262444991"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Subject / Inquiry Type
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Suit Availability">Inquire about fabric availability</option>
                  <option value="Karachi Delivery">Karachi free delivery question</option>
                  <option value="Bulk Order">Bulk unstitched suit inquiry (Events/Gifting)</option>
                  <option value="Capry Guarantee">Capry Guarantee verification</option>
                  <option value="Custom Order">Other question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what color, fabric type, or quantity you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#C5A059]" />
                <span>Submit Inquiry via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
