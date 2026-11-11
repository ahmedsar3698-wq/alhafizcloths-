import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown, Check, RefreshCw, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';
import { formatPKR } from '../utils/formatters';

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onViewProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  onViewProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minPrice, setMinPrice] = useState<number>(1500);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedFabricType, setSelectedFabricType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique fabric types & colors
  const availableFabricTypes = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.fabricType) set.add(p.fabricType);
    });
    return Array.from(set);
  }, [products]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach(p => {
      p.colors?.forEach(c => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!p.isPublished) return false;

      // Category check
      if (selectedCategory && selectedCategory !== 'all') {
        if (selectedCategory === 'New Arrivals') {
          if (!p.isNewArrival) return false;
        } else if (selectedCategory === 'Best Sellers') {
          if (!p.isBestSeller) return false;
        } else {
          if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesFabric = p.fabricType.toLowerCase().includes(query);
        const matchesColor = p.colors.some(c => c.name.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesFabric && !matchesColor) {
          return false;
        }
      }

      // Price Range
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = p.colors.some(c => c.name.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      // Fabric Type filter
      if (selectedFabricType !== 'all') {
        if (p.fabricType !== selectedFabricType) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, selectedColor, selectedFabricType, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setMinPrice(1500);
    setMaxPrice(5000);
    setSelectedColor('all');
    setSelectedFabricType('all');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#141413] text-white p-6 sm:p-10 rounded-xl border border-[#2C2B29] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A059]">
            <span>Authentic Eastern Fabrics · 22 Colors</span>
            <span>·</span>
            <span className="text-emerald-400">FREE DELIVERY IN KARACHI</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Men's Unstitched Fabric Catalog
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Choose from pure cotton, washing wear, mix cotton and luxury suiting up to Rs. 5,000. All cuts are 4.5 meters with Capry Guarantee.
          </p>
        </div>

        {/* Quick Search in Banner */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search suit name, color, fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-700 text-white text-xs rounded-lg focus:outline-none focus:border-[#C5A059] placeholder:text-stone-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar (Interactive Segmented Control) */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 min-w-max p-1 bg-white border border-[#E8E2D5] rounded-lg shadow-xs">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all' || !selectedCategory
                ? 'bg-[#141413] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            All Fabrics ({products.filter(p => p.isPublished).length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.name
                  ? 'bg-[#141413] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters Sidebar (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white p-6 rounded-lg border border-[#E8E2D5] space-y-6 shadow-xs sticky top-28 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#8C6D2C]" />
              Filter Collection
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#8C6D2C] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Price Range Slider (Rs. 1,500 – Rs. 5,000) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
              Price Range (PKR)
            </label>
            <div className="flex items-center justify-between text-xs font-semibold text-stone-900 tabular-nums">
              <span>{formatPKR(minPrice)}</span>
              <span>{formatPKR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="1500"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C5A059] cursor-pointer"
            />
            <div className="text-[11px] text-stone-500">
              Maximum: <span className="font-bold text-stone-900">{formatPKR(maxPrice)}</span>
            </div>
          </div>

          {/* Color Filter (22 Authentic Pakistani Colors) */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                22 Fabric Shades ({availableColors.length})
              </label>
              {selectedColor !== 'all' && (
                <button
                  onClick={() => setSelectedColor('all')}
                  className="text-[11px] text-stone-500 hover:text-stone-900 underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1 border border-stone-100 rounded">
              <button
                type="button"
                onClick={() => setSelectedColor('all')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  selectedColor === 'all'
                    ? 'border-[#C5A059] bg-[#141413] text-white'
                    : 'border-stone-200 bg-stone-50 text-stone-700'
                }`}
              >
                All Colors
              </button>
              {availableColors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`flex items-center gap-1.5 px-2 py-1 text-[11px] rounded border transition-all ${
                    selectedColor === c.name
                      ? 'border-[#C5A059] bg-[#C5A059]/15 font-bold text-stone-900 ring-1 ring-[#C5A059]'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="truncate max-w-[100px]">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Type */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
              Fabric Type
            </label>
            <select
              value={selectedFabricType}
              onChange={(e) => setSelectedFabricType(e.target.value)}
              className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="all">All Fabric Types</option>
              {availableFabricTypes.map((ft) => (
                <option key={ft} value={ft}>
                  {ft}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Policy Note */}
          <div className="p-3 bg-amber-50/70 rounded-md border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-[#8C6D2C]">
              <Truck className="w-3.5 h-3.5" />
              <span>Karachi Express Delivery</span>
            </div>
            <p className="text-[11px] text-stone-600">
              Delivery is 100% FREE within Karachi. Standard courier fee of Rs. 250 applies to all other cities across Pakistan.
            </p>
          </div>
        </aside>

        {/* Products Grid Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Item count, Mobile filter button, Sorting */}
          <div className="bg-white p-4 rounded-lg border border-[#E8E2D5] flex items-center justify-between gap-4 shadow-xs">
            <div className="text-xs text-stone-600">
              Showing <span className="font-bold text-stone-900 tabular-nums">{filteredProducts.length}</span> suits
              {selectedCategory !== 'all' && (
                <span> in <span className="font-semibold text-stone-900">{selectedCategory}</span></span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-stone-300 rounded bg-stone-50 text-stone-800"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="hidden sm:inline text-stone-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden p-5 bg-white border border-[#E8E2D5] rounded-lg space-y-4 shadow-md">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">Filters</h4>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-stone-400 hover:text-stone-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700">Max Price: {formatPKR(maxPrice)}</label>
                <input
                  type="range"
                  min="1500"
                  max="5000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C5A059] mt-1"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2 text-xs border border-stone-300 rounded text-stone-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs bg-[#141413] text-white rounded font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#E8E2D5] p-12 text-center space-y-3">
              <h3 className="font-serif text-xl font-bold text-stone-800">No suits match your criteria</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your price range slider or clearing active search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-5 py-2 text-xs font-bold bg-[#141413] text-white rounded hover:bg-stone-800"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
