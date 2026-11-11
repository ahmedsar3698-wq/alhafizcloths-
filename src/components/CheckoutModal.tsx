import React, { useState } from 'react';
import { X, CheckCircle, Truck, ShieldCheck, MessageCircle, Copy, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/formatters';
import { storageService } from '../services/storageService';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryCity,
    setDeliveryCity,
    deliveryFee,
    total
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const settings = storageService.getSettings();

  if (!isCheckoutOpen) return null;

  const isKarachi = deliveryCity.trim().toLowerCase().includes('karachi');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim() || !whatsappPhone.trim() || !customerName.trim()) {
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      colorName: item.selectedColor.name,
      colorHex: item.selectedColor.hex,
      quantity: item.quantity,
      image: item.product.images[0]
    }));

    const newOrder = storageService.createOrder({
      customerName: customerName.trim(),
      whatsappNumber: whatsappPhone.trim(),
      city: deliveryCity,
      deliveryAddress: deliveryAddress.trim(),
      deliveryFee,
      items: orderItems,
      subtotal,
      total,
      status: 'Pending',
      paymentMethod: 'COD',
      notes: notes.trim()
    });

    setIsSubmitting(false);
    setPlacedOrder(newOrder);
    clearCart();
  };

  const copyOrderId = () => {
    if (placedOrder) {
      navigator.clipboard.writeText(placedOrder.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const notifyOnWhatsApp = () => {
    if (!placedOrder) return;
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let msg = `*Salam AL HAFIZ CLOTHS,*\nI have placed an order on your website:\n\n`;
    msg += `• *Order ID:* #${placedOrder.id}\n`;
    msg += `• *Customer:* ${placedOrder.customerName}\n`;
    msg += `• *Phone:* ${placedOrder.whatsappNumber}\n`;
    msg += `• *City:* ${placedOrder.city} (${placedOrder.deliveryFee === 0 ? 'FREE DELIVERY' : `Delivery Rs. ${placedOrder.deliveryFee}`})\n`;
    msg += `• *Address:* ${placedOrder.deliveryAddress}\n\n`;
    msg += `*Items:*\n`;
    placedOrder.items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.productName} (${item.colorName}) - Qty: ${item.quantity} (Rs. ${item.price * item.quantity})\n`;
    });
    msg += `\n*Total Payable on Delivery:* ${formatPKR(placedOrder.total)}\n`;
    msg += `Please confirm dispatch. Thank you!`;

    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="bg-[#141413] text-white p-5 flex items-center justify-between border-b border-[#2C2B29]">
          <div>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              {placedOrder ? 'Order Confirmed' : 'Checkout & Free Karachi Delivery'}
            </h3>
            <p className="text-xs text-stone-300">
              {placedOrder ? 'Your order is recorded successfully' : 'Cash on Delivery (COD) across Pakistan'}
            </p>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setPlacedOrder(null);
            }}
            aria-label="Close modal"
            className="text-stone-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {placedOrder ? (
          /* Success Screen */
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Shukriya, {placedOrder.customerName}!
              </h4>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Your order has been received by AL HAFIZ CLOTHS dispatch team. We will contact you on WhatsApp to verify your delivery before courier dispatch.
              </p>
            </div>

            {/* Order Slip */}
            <div className="bg-white p-4 rounded-lg border border-[#E8E2D5] text-left text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Order Reference:</span>
                <button
                  onClick={copyOrderId}
                  className="font-mono font-bold text-stone-900 flex items-center gap-1.5 hover:text-[#8C6D2C] cursor-pointer"
                >
                  <span>#{placedOrder.id}</span>
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Delivery City:</span>
                <span className="font-medium text-stone-900">{placedOrder.city}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Fee:</span>
                <span className="font-semibold text-emerald-800">
                  {placedOrder.deliveryFee === 0 ? 'FREE (Karachi)' : formatPKR(placedOrder.deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between pt-1 border-t border-stone-100 font-bold text-stone-900">
                <span>Total Amount to Pay on Delivery:</span>
                <span className="text-sm font-serif text-[#8C6D2C]">{formatPKR(placedOrder.total)}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={notifyOnWhatsApp}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Track / Confirm on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setPlacedOrder(null);
                }}
                className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-xs rounded-md transition-colors"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Ullah"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03212345678"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* City Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Destination City *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryCity('Karachi')}
                  className={`p-2.5 rounded-md border text-left flex items-start justify-between cursor-pointer ${
                    isKarachi
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-stone-900 ring-1 ring-[#C5A059]'
                      : 'border-[#E8E2D5] bg-white text-stone-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">Karachi</div>
                    <div className="text-[11px] text-emerald-800 font-semibold">FREE DELIVERY</div>
                  </div>
                  {isKarachi && <Check className="w-4 h-4 text-[#8C6D2C]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryCity('Other Cities')}
                  className={`p-2.5 rounded-md border text-left flex items-start justify-between cursor-pointer ${
                    !isKarachi
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-stone-900 ring-1 ring-[#C5A059]'
                      : 'border-[#E8E2D5] bg-white text-stone-600'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">Other Cities</div>
                    <div className="text-[11px] text-stone-500">Rs. 250 Flat Courier</div>
                  </div>
                  {!isKarachi && <Check className="w-4 h-4 text-[#8C6D2C]" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Complete Delivery Address in {isKarachi ? 'Karachi' : 'Pakistan'} *
              </label>
              <textarea
                required
                rows={2}
                placeholder="House/Apartment #, Street, Block, Area, Landmark"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Order Notes / Tailor Details (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Please deliver between 2 PM and 6 PM"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D5] rounded-md focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Total calculation */}
            <div className="p-3.5 bg-stone-100 rounded-lg space-y-1.5 text-xs text-stone-700 border border-stone-200">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-900 tabular-nums">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charges:</span>
                <span className={`font-semibold tabular-nums ${isKarachi ? 'text-emerald-800' : 'text-stone-900'}`}>
                  {isKarachi ? 'FREE IN KARACHI (Rs. 0)' : formatPKR(deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline font-bold text-stone-900">
                <span className="text-sm">Payable on Cash on Delivery:</span>
                <span className="text-base font-serif text-[#8C6D2C] tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#C5A059]" />
              <span>Confirm Order (Cash on Delivery)</span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                Capry Guarantee
              </span>
              <span>·</span>
              <span>Open Parcel Verification</span>
              <span>·</span>
              <span>Zero Risk</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
