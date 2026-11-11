import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Truck, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR, generateWhatsAppOrderUrl } from '../utils/formatters';
import { storageService } from '../services/storageService';

export const WhatsAppOrderModal: React.FC = () => {
  const { activeWhatsAppModal, closeWhatsAppModal } = useCart();
  const { isOpen, product, color, quantity = 1 } = activeWhatsAppModal;

  const [customerName, setCustomerName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Karachi');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedColor, setSelectedColor] = useState(color || product?.colors[0]);
  const [orderQty, setOrderQty] = useState(quantity);
  const [orderNotes, setOrderNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const settings = storageService.getSettings();

  useEffect(() => {
    if (product) {
      setSelectedColor(color || product.colors[0]);
      setOrderQty(quantity);
    }
  }, [product, color, quantity]);

  if (!isOpen || !product) return null;

  const isKarachi = deliveryCity.trim().toLowerCase().includes('karachi');
  const deliveryFee = isKarachi ? 0 : settings.otherCitiesDeliveryFee || 250;
  const subtotal = product.price * orderQty;
  const grandTotal = subtotal + deliveryFee;

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryAddress.trim()) {
      setErrorMsg('Please enter your complete delivery address.');
      return;
    }

    // 1. Record the order in database/admin storage
    const newOrder = storageService.createOrder({
      customerName: customerName.trim() || 'Valued Customer',
      whatsappNumber: whatsappPhone.trim() || settings.whatsappNumber,
      city: deliveryCity,
      deliveryAddress: deliveryAddress.trim(),
      deliveryFee,
      items: [
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          colorName: selectedColor?.name || 'Standard',
          colorHex: selectedColor?.hex || '#141413',
          quantity: orderQty,
          image: product.images[0]
        }
      ],
      subtotal,
      total: grandTotal,
      status: 'Confirmed',
      paymentMethod: 'WhatsApp Direct',
      notes: orderNotes.trim()
    });

    // 2. Generate WhatsApp URL
    const targetUrl = generateWhatsAppOrderUrl(
      {
        customerName: customerName.trim() || 'Valued Customer',
        whatsappNumber: whatsappPhone.trim(),
        productName: product.name,
        colorName: selectedColor?.name,
        quantity: orderQty,
        unitPrice: product.price,
        city: deliveryCity,
        address: deliveryAddress.trim(),
        deliveryFee,
        totalAmount: grandTotal,
        notes: `Order Ref: #${newOrder.id}. ${orderNotes ? `Notes: ${orderNotes}` : ''}`
      },
      settings.whatsappNumber
    );

    // 3. Open WhatsApp in new tab
    window.open(targetUrl, '_blank');
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="bg-[#141413] text-white p-5 flex items-center justify-between border-b border-[#2C2B29]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#25D366] text-white rounded-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                Direct WhatsApp Order
              </h3>
              <p className="text-xs text-stone-300">
                Pre-fills order message to AL HAFIZ CLOTHS (+92 326 2444991)
              </p>
            </div>
          </div>
          <button
            onClick={closeWhatsAppModal}
            aria-label="Close modal"
            className="text-stone-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLaunchWhatsApp} className="p-6 space-y-5">
          {/* Product Summary */}
          <div className="flex gap-4 p-3.5 bg-white rounded-lg border border-[#E8E2D5]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-16 h-20 object-cover rounded bg-stone-100 shrink-0 border border-stone-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D2C]">
                  {product.category}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {product.qualityBadge}
                </span>
              </div>
              <h4 className="font-semibold text-stone-900 text-sm truncate mt-0.5">
                {product.name}
              </h4>
              <p className="text-xs text-stone-500">{product.fabricType} · 4.5m Cut</p>
              <div className="mt-1 font-serif text-stone-900 font-bold text-sm">
                {formatPKR(product.price)} <span className="text-xs font-sans font-normal text-stone-500">per unstitched suit</span>
              </div>
            </div>
          </div>

          {/* Color & Quantity Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Fabric Color
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border transition-all cursor-pointer ${
                      selectedColor?.name === c.name
                        ? 'border-[#C5A059] bg-stone-900 text-white shadow-sm'
                        : 'border-[#E8E2D5] bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Quantity (Suits)
              </label>
              <div className="flex items-center border border-[#E8E2D5] bg-white rounded-md w-32">
                <button
                  type="button"
                  onClick={() => setOrderQty(Math.max(1, orderQty - 1))}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm font-semibold text-stone-900 tabular-nums">
                  {orderQty}
                </span>
                <button
                  type="button"
                  onClick={() => setOrderQty(orderQty + 1)}
                  className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-3 pt-2 border-t border-[#E8E2D5]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Your WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 03211234567"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Delivery City
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryCity('Karachi')}
                  className={`p-2.5 rounded-md border text-left flex items-start justify-between cursor-pointer ${
                    deliveryCity === 'Karachi'
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-stone-900'
                      : 'border-[#E8E2D5] bg-white text-stone-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">Karachi</div>
                    <div className="text-[11px] text-emerald-800 font-semibold">FREE DELIVERY</div>
                  </div>
                  {deliveryCity === 'Karachi' && <Check className="w-4 h-4 text-[#8C6D2C]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryCity('Other Cities in Pakistan')}
                  className={`p-2.5 rounded-md border text-left flex items-start justify-between cursor-pointer ${
                    deliveryCity !== 'Karachi'
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-stone-900'
                      : 'border-[#E8E2D5] bg-white text-stone-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">Other Cities</div>
                    <div className="text-[11px] text-stone-500">Rs. 250 Flat Courier</div>
                  </div>
                  {deliveryCity !== 'Karachi' && <Check className="w-4 h-4 text-[#8C6D2C]" />}
                </button>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Complete Delivery Address
              </label>
              <textarea
                required
                rows={2}
                placeholder="House / Flat #, Street, Area / Sector, Landmark"
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
              />
              {errorMsg && <p className="text-xs text-red-600 mt-1">{errorMsg}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Special Tailoring / Delivery Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before delivery, extra matching buttons"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Pricing Calculation */}
          <div className="bg-stone-100 p-3.5 rounded-lg space-y-1.5 text-xs text-stone-700 border border-stone-200">
            <div className="flex justify-between">
              <span>Fabric Price ({orderQty} suit{orderQty > 1 ? 's' : ''}):</span>
              <span className="font-semibold text-stone-900 tabular-nums">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery Charges ({deliveryCity}):</span>
              <span className={`font-semibold tabular-nums ${isKarachi ? 'text-emerald-800' : 'text-stone-900'}`}>
                {isKarachi ? 'FREE (Rs. 0)' : formatPKR(deliveryFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline text-stone-900 font-bold">
              <span className="text-sm">Total Payable on Delivery:</span>
              <span className="text-base font-serif text-[#8C6D2C] tabular-nums">{formatPKR(grandTotal)}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>Open WhatsApp to Confirm Order</span>
          </button>

          <p className="text-[11px] text-center text-stone-500">
            Clicking will open WhatsApp with your customized order message pre-typed. Capry Guarantee & Free Karachi delivery included.
          </p>
        </form>
      </div>
    </div>
  );
};
