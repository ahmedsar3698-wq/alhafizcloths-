import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Eye, ShieldCheck } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatPKR } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart, openWhatsAppModal } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Standard', hex: '#000000', inStock: true }
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppModal(product, selectedColor, 1);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-white border border-[#E8E2D5] rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#C5A059]/60 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quality text marker (Anti-slop: subtle quiet tag, not bulky pill sandwich) */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="text-[10px] font-bold tracking-wider uppercase text-stone-900 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs border border-stone-200">
            {product.qualityBadge}
          </span>
        </div>

        {/* Free Karachi Delivery tag */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50/95 backdrop-blur-xs px-1.5 py-0.5 rounded border border-emerald-200">
            Free Delivery KHI
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-2.5 bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold rounded shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="py-2 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded shadow-md flex items-center justify-center gap-1 transition-colors cursor-pointer"
            title="Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fabricType}</span>
            <span aria-hidden="true">·</span>
            <span>4.5m</span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 mt-1 line-clamp-1 group-hover:text-[#8C6D2C] transition-colors">
            {product.name}
          </h3>

          {/* Capry Guarantee note */}
          {product.capryGuarantee && (
            <div className="flex items-center gap-1 text-[11px] text-[#8C6D2C] mt-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Capry Guarantee: Color & Lint Free</span>
            </div>
          )}
        </div>

        {/* Color swatches & Price */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Color Dots */}
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c)}
                aria-label={`Select ${c.name}`}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === c.name
                    ? 'scale-125 border-stone-900 ring-1 ring-[#C5A059]'
                    : 'border-black/20 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-stone-400 font-semibold">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-stone-400 line-through mr-1.5 tabular-nums">
                {formatPKR(product.originalPrice)}
              </span>
            )}
            <span className="font-serif text-base font-bold text-stone-900 tabular-nums">
              {formatPKR(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
