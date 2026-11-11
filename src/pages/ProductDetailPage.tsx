import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Scissors, Sparkles, Share2 } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatPKR } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onViewProduct
}) => {
  const { addToCart, openWhatsAppModal, setIsCheckoutOpen } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Standard', hex: '#000000', inStock: true }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'fabric' | 'capry' | 'delivery'>('fabric');
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.fabricType === product.fabricType))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleInstantBuy = () => {
    addToCart(product, selectedColor, quantity);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    openWhatsAppModal(product, selectedColor, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at AL HAFIZ CLOTHS with Free Karachi Delivery!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Suit'}</span>
        </button>
      </div>

      {/* Main PDP Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden border border-[#E8E2D5] shadow-sm">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-900 bg-white/95 px-3 py-1 rounded shadow-sm border border-stone-200">
                {product.qualityBadge}
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50/95 px-2.5 py-0.5 rounded border border-emerald-200">
                Free Delivery in Karachi
              </span>
            </div>
          </div>

          {/* Multiple Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Category & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-widest">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.fabricType}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price Box */}
          <div className="p-4 bg-stone-50 rounded-lg border border-[#E8E2D5] flex items-baseline justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                Per Unstitched Suit (4.5m)
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Truck className="w-3.5 h-3.5" />
                Karachi: Rs. 0
              </span>
            </div>
          </div>

          {/* Capry Guarantee Banner */}
          {product.capryGuarantee && (
            <div className="p-3.5 bg-amber-50/70 rounded-lg border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#8C6D2C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900">Capry Guarantee:</span>{' '}
                <span className="text-stone-700">{product.capryGuaranteeText}</span>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Fabric Specifications Summary */}
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 pt-2 border-t border-stone-200">
            <div className="flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-[#8C6D2C]" />
              <span>Cut: <strong className="text-stone-900">{product.lengthMeters} Meters</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8C6D2C]" />
              <span>Width: <strong className="text-stone-900">{product.widthInches} Inches Arzz</strong></span>
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-stone-800">
                Select Color: <span className="font-normal text-stone-600">{selectedColor.name}</span>
              </label>
              <span className="text-[11px] text-emerald-800 font-semibold">In Stock</span>
            </div>

            <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto p-1.5 bg-stone-50/60 border border-stone-200 rounded-lg">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border transition-all cursor-pointer ${
                    selectedColor.name === c.name
                      ? 'border-[#C5A059] bg-stone-900 text-white shadow-sm ring-1 ring-[#C5A059]'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Quantity:
            </label>
            <div className="flex items-center border border-stone-300 bg-white rounded-md">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-stone-700 hover:bg-stone-100 font-bold"
              >
                -
              </button>
              <span className="px-4 text-xs font-bold text-stone-900 tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-stone-700 hover:bg-stone-100 font-bold"
              >
                +
              </button>
            </div>
            <span className="text-xs text-stone-500">
              Total: <strong className="text-stone-900 tabular-nums">{formatPKR(product.price * quantity)}</strong>
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            {/* 1. Order on WhatsApp (Direct 1-Click Order) */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Instant Order on WhatsApp</span>
            </button>

            {/* 2. Add to Cart & Instant Checkout */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 bg-white hover:bg-stone-50 border border-stone-300 text-stone-900 font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleInstantBuy}
                className="py-3 px-4 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy Now (COD)</span>
              </button>
            </div>
          </div>

          {/* Tabbed Info Panels: Fabric, Capry Guarantee, Delivery */}
          <div className="pt-6 border-t border-stone-200 space-y-3">
            <div className="flex border-b border-stone-200">
              <button
                onClick={() => setActiveTab('fabric')}
                className={`pb-2 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'fabric'
                    ? 'border-[#C5A059] text-[#8C6D2C]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Fabric Details
              </button>
              <button
                onClick={() => setActiveTab('capry')}
                className={`pb-2 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'capry'
                    ? 'border-[#C5A059] text-[#8C6D2C]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Capry Guarantee
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-2 px-3 text-xs font-semibold cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'delivery'
                    ? 'border-[#C5A059] text-[#8C6D2C]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Karachi Delivery
              </button>
            </div>

            <div className="text-xs text-stone-600 leading-relaxed">
              {activeTab === 'fabric' && (
                <div className="space-y-1.5">
                  <p>• <strong>Fabric Composition:</strong> {product.fabricType}</p>
                  <p>• <strong>Suit Dimensions:</strong> {product.lengthMeters} Meters cut × {product.widthInches}" Arzz</p>
                  <p>• <strong>Recommended Season:</strong> {product.season || 'All Season'}</p>
                  <p>• <strong>Washing Instructions:</strong> Hand wash or gentle machine wash in cold water. Do not bleach. Mild iron.</p>
                </div>
              )}
              {activeTab === 'capry' && (
                <div className="space-y-1.5">
                  <p>• <strong>Lint & Pilling Free:</strong> Zero burr/lint even after continuous wear.</p>
                  <p>• <strong>Color Guarantee:</strong> Resistant to color fading or bleeding in standard laundry.</p>
                  <p>• <strong>7-Day Claim:</strong> If any manufacturing defect is discovered, AL HAFIZ CLOTHS provides instant replacement.</p>
                </div>
              )}
              {activeTab === 'delivery' && (
                <div className="space-y-1.5">
                  <p>• <strong>Karachi City:</strong> 100% Free Doorstep Delivery with Cash on Delivery (COD).</p>
                  <p>• <strong>Dispatch Timeline:</strong> 24 to 48 hours within Karachi.</p>
                  <p>• <strong>Other Cities:</strong> Dispatched via premium courier service with flat Rs. 250 fee.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Fabrics */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#E8E2D5] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-[#8C6D2C]">
                Matching Fabrics
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                Similar Unstitched Suits
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
