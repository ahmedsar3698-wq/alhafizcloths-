import React from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/formatters';
import { storageService } from '../services/storageService';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryCity,
    setDeliveryCity,
    deliveryFee,
    total,
    setIsCheckoutOpen
  } = useCart();

  const settings = storageService.getSettings();

  if (!isCartOpen) return null;

  const isKarachi = deliveryCity.trim().toLowerCase().includes('karachi');

  const handleOrderAllOnWhatsApp = () => {
    if (cart.length === 0) return;

    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let msg = `*Salam AL HAFIZ CLOTHS,*\nI would like to order the following suits:\n\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n`;
      msg += `   • Color: ${item.selectedColor.name}\n`;
      msg += `   • Qty: ${item.quantity} Suit(s) (4.5m each)\n`;
      msg += `   • Price: ${formatPKR(item.product.price * item.quantity)}\n\n`;
    });

    const deliveryNote = isKarachi
      ? 'Karachi (FREE DELIVERY)'
      : `${deliveryCity} (Courier: ${formatPKR(deliveryFee)})`;

    msg += `• *City:* ${deliveryNote}\n`;
    msg += `• *Subtotal:* ${formatPKR(subtotal)}\n`;
    msg += `• *Total Amount:* ${formatPKR(total)}\n\n`;
    msg += `Please send me payment / COD confirmation and estimated delivery time. Thank you!`;

    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-l border-[#E8E2D5] animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#141413] text-white flex items-center justify-between border-b border-[#2C2B29]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="text-stone-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-[#C5A059]/15 border-b border-[#C5A059]/30 px-4 py-2 text-xs text-stone-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <Truck className="w-4 h-4 text-[#8C6D2C]" />
            {isKarachi ? (
              <span className="text-emerald-800 font-semibold">Free Delivery applied for Karachi!</span>
            ) : (
              <span>Karachi: Free Delivery · Other Cities: Rs. 250</span>
            )}
          </span>
          <select
            value={deliveryCity}
            onChange={(e) => setDeliveryCity(e.target.value)}
            className="text-xs bg-white border border-[#C5A059]/40 rounded px-2 py-0.5 font-medium text-stone-800 focus:outline-none"
          >
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Other">Other City</option>
          </select>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <ShoppingBag className="w-12 h-12 text-stone-300 mb-3" />
              <h4 className="font-serif text-lg font-semibold text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Explore our unstitched pure cotton and washing wear fabrics to fill your wardrobe with Pakistani elegance.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-5 py-2 text-xs font-semibold bg-[#141413] text-white rounded hover:bg-stone-800 transition-colors"
              >
                Browse Fabrics
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor.hex}`}
                className="p-3 bg-white rounded-lg border border-[#E8E2D5] flex gap-3 relative shadow-xs"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover rounded bg-stone-100 shrink-0 border border-stone-200"
                />
                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="font-semibold text-stone-900 text-xs sm:text-sm truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-0.5">
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    />
                    <span>{item.selectedColor.name}</span>
                    <span className="text-stone-400">·</span>
                    <span>4.5m</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-serif font-bold text-stone-900 text-sm tabular-nums">
                      {formatPKR(item.product.price * item.quantity)}
                    </div>

                    <div className="flex items-center border border-stone-300 rounded bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.hex, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-stone-700 hover:bg-stone-200"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor.hex, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-stone-700 hover:bg-stone-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                  aria-label="Remove item"
                  className="absolute top-3 right-3 text-stone-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8E2D5] space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-900 tabular-nums">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery ({deliveryCity}):</span>
                <span className={`font-semibold tabular-nums ${isKarachi ? 'text-emerald-800' : 'text-stone-900'}`}>
                  {isKarachi ? 'FREE' : formatPKR(deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900">
                <span className="text-sm">Total:</span>
                <span className="text-lg font-serif text-[#8C6D2C] tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleOrderAllOnWhatsApp}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Order Bag on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Checkout (Cash on Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[10px] text-center text-stone-500">
              All items covered under our 7-Day Replacement Capry Guarantee.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
