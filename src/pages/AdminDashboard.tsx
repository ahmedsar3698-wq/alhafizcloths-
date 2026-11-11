import React, { useState } from 'react';
import { 
  Lock, LogOut, Package, FolderTree, ShoppingBag, Settings, Plus, Edit2, 
  Trash2, Upload, Check, AlertCircle, Eye, EyeOff, MessageCircle, 
  ExternalLink, Truck, ShieldCheck, Database, RefreshCw, X, ChevronRight, Image as ImageIcon
} from 'lucide-react';
import { Product, Category, Order, StoreSettings, ProductColor, ProductQualityBadge } from '../types';
import { TWENTY_TWO_FABRIC_COLORS } from '../data/fabricColors';
import { storageService } from '../services/storageService';
import { formatPKR } from '../utils/formatters';
import { testSupabaseConnection, updateSupabaseCredentials } from '../services/supabaseClient';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  onRefreshData: () => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  orders,
  onRefreshData,
  onClose
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => storageService.isAdminAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'settings' | 'supabase'>('products');

  // Store settings state
  const [settings, setSettings] = useState<StoreSettings>(() => storageService.getSettings());
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Product modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    slug: '',
    category: categories[0]?.name || 'Pure Cotton',
    price: 2500,
    originalPrice: 3200,
    description: '',
    fabricType: 'Pure Cotton',
    lengthMeters: 4.5,
    widthInches: 54,
    images: [],
    colors: [{ name: 'Cream', hex: '#F5F2EB', inStock: true }],
    qualityBadge: 'Premium Quality',
    capryGuarantee: true,
    capryGuaranteeText: 'Capry Guarantee: 100% color fastness, zero lint, and wrinkle recovery promise.',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isPublished: true,
    stockQuantity: 30,
    season: 'All Season'
  });

  // Category modal state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({
    name: '',
    slug: '',
    description: '',
    image: '/src/assets/images/category_pure_cotton_1794376205562.jpg'
  });

  // Color helper state for product modal
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  // Supabase test state
  const [supabaseStatus, setSupabaseStatus] = useState<{ testing: boolean; msg: string; success?: boolean }>({
    testing: false,
    msg: ''
  });

  // --- Authentication ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.adminPin || pinInput === '1234') {
      storageService.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin PIN. (Default is 1234)');
    }
  };

  const handleLogout = () => {
    storageService.setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  // --- Product Management ---
  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      slug: '',
      category: categories[0]?.name || 'Pure Cotton',
      price: 2500,
      originalPrice: 3200,
      description: '',
      fabricType: 'Pure Combed Cotton',
      lengthMeters: 4.5,
      widthInches: 54,
      images: ['/src/assets/images/category_pure_cotton_1794376205562.jpg'],
      colors: [
        { name: 'Pearl Cream', hex: '#F5F2EB', inStock: true },
        { name: 'Royal Navy', hex: '#1E293B', inStock: true }
      ],
      qualityBadge: 'Premium Quality',
      capryGuarantee: true,
      capryGuaranteeText: 'Capry Guarantee: Guaranteed no shrinkage and 100% color fastness.',
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: true,
      isPublished: true,
      stockQuantity: 25,
      season: 'All Season'
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({ ...product });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    // Validate price range between 1500 and 5000
    const price = Math.max(1500, Math.min(5000, Number(productForm.price)));
    const slug = productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const productToSave: Product = {
      id: editingProduct ? editingProduct.id : `ahc-${Date.now().toString(36)}`,
      name: productForm.name,
      slug,
      category: productForm.category || categories[0]?.name || 'Pure Cotton',
      price,
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      description: productForm.description || '',
      fabricType: productForm.fabricType || 'Pure Cotton',
      lengthMeters: Number(productForm.lengthMeters) || 4.5,
      widthInches: Number(productForm.widthInches) || 54,
      images: (productForm.images && productForm.images.length > 0)
        ? productForm.images
        : ['/src/assets/images/hero_unstitched_fabric_1794376205170.jpg'],
      colors: productForm.colors || [{ name: 'Standard', hex: '#000000', inStock: true }],
      qualityBadge: (productForm.qualityBadge as ProductQualityBadge) || 'Premium Quality',
      capryGuarantee: productForm.capryGuarantee !== false,
      capryGuaranteeText: productForm.capryGuaranteeText || 'Capry Guarantee: 100% color fastness and anti-pilling.',
      isFeatured: Boolean(productForm.isFeatured),
      isBestSeller: Boolean(productForm.isBestSeller),
      isNewArrival: Boolean(productForm.isNewArrival),
      isPublished: productForm.isPublished !== false,
      stockQuantity: Number(productForm.stockQuantity) || 20,
      season: productForm.season || 'All Season',
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    storageService.saveProduct(productToSave);
    onRefreshData();
    setIsProductModalOpen(false);
    flashMessage(`Product "${productToSave.name}" saved successfully!`);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      storageService.deleteProduct(id);
      onRefreshData();
      flashMessage(`Product "${name}" deleted.`);
    }
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const url = await storageService.uploadImage(file);
        setProductForm(prev => ({
          ...prev,
          images: [...(prev.images || []), url]
        }));
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  // Add Color to Product Form
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setProductForm(prev => ({
      ...prev,
      colors: [
        ...(prev.colors || []),
        { name: newColorName.trim(), hex: newColorHex, inStock: true }
      ]
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (name: string) => {
    setProductForm(prev => ({
      ...prev,
      colors: (prev.colors || []).filter(c => c.name !== name)
    }));
  };

  // --- Category Management ---
  const openNewCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      image: '/src/assets/images/category_pure_cotton_1794376205562.jpg'
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({ ...cat });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    const slug = categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryToSave: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now().toString(36)}`,
      name: categoryForm.name,
      slug,
      description: categoryForm.description || '',
      image: categoryForm.image || '/src/assets/images/category_pure_cotton_1794376205562.jpg',
      itemCount: editingCategory ? editingCategory.itemCount : 0
    };

    storageService.saveCategory(categoryToSave);
    onRefreshData();
    setIsCategoryModalOpen(false);
    flashMessage(`Category "${categoryToSave.name}" updated!`);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      storageService.deleteCategory(id);
      onRefreshData();
      flashMessage(`Category "${name}" deleted.`);
    }
  };

  // --- Order Management ---
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    storageService.updateOrderStatus(orderId, status);
    onRefreshData();
    flashMessage(`Order #${orderId} marked as ${status}.`);
  };

  const chatWithCustomer = (phone: string, orderId: string, name: string) => {
    const cleanNum = phone.replace(/[^0-9]/g, '');
    const msg = `*Salam ${name},*\nThis is AL HAFIZ CLOTHS Karachi regarding your Order #${orderId}. We are preparing your fabric parcel. Please confirm your availability for delivery.`;
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // --- Settings Management ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSettings(settings);
    flashMessage('Store settings updated successfully!');
  };

  // --- Supabase credentials ---
  const handleTestSupabase = async () => {
    setSupabaseStatus({ testing: true, msg: 'Testing connection...' });
    const res = await testSupabaseConnection(settings.supabaseUrl, settings.supabaseAnonKey);
    setSupabaseStatus({ testing: false, msg: res.message, success: res.success });
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSupabaseCredentials(settings.supabaseUrl || '', settings.supabaseAnonKey || '');
    storageService.saveSettings(settings);
    flashMessage('Supabase configuration saved!');
  };

  const flashMessage = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // -------------------------------------------------------------
  // If NOT authenticated, render Login Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E8E2D5] rounded-xl max-w-sm w-full p-8 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 bg-[#141413] text-[#C5A059] rounded-lg flex items-center justify-center mx-auto border border-[#C5A059]/40 shadow-sm">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              AL HAFIZ CLOTHS
            </h2>
            <p className="text-xs text-stone-500">
              Admin & Store Management Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Security PIN Code
              </label>
              <input
                type="password"
                required
                maxLength={8}
                placeholder="Enter Admin PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-md text-center text-lg font-mono tracking-widest focus:outline-none focus:border-[#C5A059]"
                autoFocus
              />
              <p className="text-[11px] text-stone-400 mt-1 text-center">
                Default Master PIN: <strong className="text-stone-700">1234</strong>
              </p>
            </div>

            {authError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>

          <button
            onClick={onClose}
            className="text-xs text-stone-500 hover:text-stone-800 underline"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Authenticated Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-[#141413] text-white p-6 rounded-xl border border-[#2C2B29] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A059] bg-[#C5A059]/20 px-2 py-0.5 rounded border border-[#C5A059]/40">
              Admin Portal
            </span>
            <span className="text-stone-400 text-xs">·</span>
            <span className="text-xs text-stone-300">Karachi Head Office</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            AL HAFIZ CLOTHS Control Panel
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 rounded border border-stone-700 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold bg-red-950/60 hover:bg-red-900 text-red-200 rounded border border-red-800/40 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-lg flex items-center gap-2 shadow-sm animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Stats KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#E8E2D5] shadow-xs">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Total Products</span>
          <div className="font-serif text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            {products.length}
          </div>
          <span className="text-[11px] text-stone-400">{products.filter(p => p.isPublished).length} Active</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#E8E2D5] shadow-xs">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Total Orders</span>
          <div className="font-serif text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            {orders.length}
          </div>
          <span className="text-[11px] text-emerald-800 font-medium">Free Karachi COD Enabled</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#E8E2D5] shadow-xs">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Categories</span>
          <div className="font-serif text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            {categories.length}
          </div>
          <span className="text-[11px] text-stone-400">Pure Cotton, Washing Wear...</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#E8E2D5] shadow-xs">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Gross Orders Value</span>
          <div className="font-serif text-2xl font-bold text-[#8C6D2C] mt-1 tabular-nums">
            {formatPKR(orders.reduce((sum, o) => sum + o.total, 0))}
          </div>
          <span className="text-[11px] text-stone-400">Recorded orders</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E8E2D5] overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'products'
              ? 'border-[#C5A059] text-[#8C6D2C] bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'orders'
              ? 'border-[#C5A059] text-[#8C6D2C] bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'categories'
              ? 'border-[#C5A059] text-[#8C6D2C] bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'border-[#C5A059] text-[#8C6D2C] bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Store Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('supabase')}
          className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'supabase'
              ? 'border-[#C5A059] text-[#8C6D2C] bg-white'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase & Cloud Storage</span>
        </button>
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Products & Fabric Management
              </h2>
              <p className="text-xs text-stone-500">
                Add, edit prices (Rs. 1,500 – Rs. 5,000), upload new fabric photos, 22 signature colors, and Capry Guarantee settings.
              </p>
            </div>
            <button
              onClick={openNewProductModal}
              className="px-4 py-2.5 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Suit</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price (PKR)</th>
                  <th className="py-3 px-4">Colors</th>
                  <th className="py-3 px-4">Capry Guarantee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-12 object-cover rounded bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <div className="font-bold text-stone-900 text-sm">{p.name}</div>
                          <div className="text-[11px] text-stone-400">{p.fabricType} · {p.lengthMeters}m</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">
                      {p.category}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-stone-900 tabular-nums text-sm">
                      {formatPKR(p.price)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {p.colors.slice(0, 3).map((c) => (
                          <span
                            key={c.name}
                            title={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                        {p.colors.length > 3 && (
                          <span className="text-[10px] text-stone-400">+{p.colors.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {p.capryGuarantee ? (
                        <span className="text-emerald-800 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Guaranteed
                        </span>
                      ) : (
                        <span className="text-stone-400">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.isPublished ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditProductModal(p)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 border border-stone-200 rounded hover:bg-stone-100"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 text-red-600 hover:text-red-800 border border-red-200 rounded hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Customer Orders & Deliveries
              </h2>
              <p className="text-xs text-stone-500">
                Manage orders received via website or WhatsApp. Chat directly with customers in 1-click.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">City & Address</th>
                  <th className="py-3 px-4">Suits Ordered</th>
                  <th className="py-3 px-4">Total (PKR)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">WhatsApp Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-mono font-bold text-stone-900">
                      #{o.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900">{o.customerName}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{o.whatsappNumber}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex items-center gap-1 font-semibold text-stone-900">
                        <span>{o.city}</span>
                        {o.deliveryFee === 0 && (
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded font-bold">
                            FREE KHI
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">{o.deliveryAddress}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="text-[11px] text-stone-800">
                            <strong>{it.quantity}×</strong> {it.productName} ({it.colorName})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-stone-900 tabular-nums text-sm">
                      {formatPKR(o.total)}
                      <div className="text-[10px] text-stone-400 font-sans font-normal">{o.paymentMethod}</div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                        className={`text-xs font-semibold rounded px-2 py-1 border focus:outline-none ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : o.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : o.status === 'Confirmed'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-stone-100 text-stone-800 border-stone-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => chatWithCustomer(o.whatsappNumber, o.id, o.customerName)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded shadow-xs transition-colors"
                        title="Chat with Customer on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Chat WhatsApp</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                Categories & Collections
              </h2>
              <p className="text-xs text-stone-500">
                Organize your fabrics into Pure Cotton, Washing Wear, Mix Cotton, etc.
              </p>
            </div>
            <button
              onClick={openNewCategoryModal}
              className="px-4 py-2 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" />
              <span>Create Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-4 rounded-lg border border-[#E8E2D5] space-y-3 shadow-xs relative"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-32 object-cover rounded bg-stone-100 border border-stone-200"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900">{cat.name}</h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">{cat.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-[11px] text-stone-400">{cat.itemCount || 0} suits</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditCategoryModal(cat)}
                      className="p-1 text-stone-600 hover:text-stone-900"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id, cat.name)}
                      className="p-1 text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: STORE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] max-w-2xl shadow-xs space-y-6">
          <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
            Store & WhatsApp Settings
          </h2>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Store Brand Name
              </label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Official WhatsApp Number (Orders & Support)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
              <span className="text-[11px] text-stone-400 mt-0.5 block">Default: +92-326-2444991</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Free Delivery City
                </label>
                <input
                  type="text"
                  value={settings.freeDeliveryCity}
                  onChange={(e) => setSettings({ ...settings, freeDeliveryCity: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Other Cities Delivery Fee (PKR)
                </label>
                <input
                  type="number"
                  value={settings.otherCitiesDeliveryFee}
                  onChange={(e) => setSettings({ ...settings, otherCitiesDeliveryFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Top Announcement Banner
              </label>
              <input
                type="text"
                value={settings.announcementBanner}
                onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Default Capry Guarantee Text
              </label>
              <textarea
                rows={2}
                value={settings.capryGuaranteeDescription}
                onChange={(e) => setSettings({ ...settings, capryGuaranteeDescription: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Admin Security PIN
              </label>
              <input
                type="text"
                value={settings.adminPin}
                onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                className="w-40 px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono tracking-widest focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Save Store Settings
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: SUPABASE CLOUD SYNC & STORAGE */}
      {activeTab === 'supabase' && (
        <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] max-w-3xl shadow-xs space-y-6">
          <div className="flex items-start justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-[#8C6D2C]" />
                Supabase Database & Permanent Image Storage
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                AL HAFIZ CLOTHS includes full Supabase PostgreSQL schema, RLS policies, and Storage bucket support.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={settings.supabaseUrl || ''}
                onChange={(e) => setSettings({ ...settings, supabaseUrl: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Supabase Anon Public API Key
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={settings.supabaseAnonKey || ''}
                onChange={(e) => setSettings({ ...settings, supabaseAnonKey: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="py-2.5 px-5 bg-[#141413] hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Save Supabase Keys
              </button>
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={supabaseStatus.testing}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded border border-stone-300 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${supabaseStatus.testing ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
            </div>

            {supabaseStatus.msg && (
              <div className={`p-3 rounded text-xs border ${
                supabaseStatus.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {supabaseStatus.msg}
              </div>
            )}
          </form>

          {/* Setup Guide */}
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-2 text-stone-700">
            <h4 className="font-bold text-stone-900">How to activate your Supabase project in 2 minutes:</h4>
            <ol className="list-decimal pl-4 space-y-1 text-stone-600">
              <li>Log in to your <strong>Supabase Dashboard</strong> and open your project.</li>
              <li>Go to <strong>SQL Editor</strong> and paste the contents of <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-900">supabase-schema.sql</code> provided in this codebase.</li>
              <li>Under <strong>Storage</strong>, create a public bucket named <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-900">product-images</code>.</li>
              <li>Copy your Project URL and Anon Key into the inputs above and click Save.</li>
            </ol>
            <p className="text-[11px] text-stone-500 pt-1">
              Note: Even without Supabase connected, all products, categories, orders, and images are stored in permanent browser storage and are 100% operational immediately!
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* PRODUCT CREATE / EDIT MODAL */}
      {/* ------------------------------------------------------------------- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E2D5] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {editingProduct ? 'Edit Product' : 'Add New Men\'s Unstitched Suit'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Suit / Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Sovereign Washing Wear"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:border-[#C5A059]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price System (Rs. 1,500 – Rs. 5,000) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Price in PKR * (Rs. 1,500 – Rs. 5,000)
                  </label>
                  <input
                    type="number"
                    min="1500"
                    max="5000"
                    step="50"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Original Price (Optional Strike-through)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice || ''}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Fabric Specs */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Fabric Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Cotton"
                    value={productForm.fabricType}
                    onChange={(e) => setProductForm({ ...productForm, fabricType: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Cut (Meters)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={productForm.lengthMeters}
                    onChange={(e) => setProductForm({ ...productForm, lengthMeters: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Width (Inches)</label>
                  <input
                    type="number"
                    value={productForm.widthInches}
                    onChange={(e) => setProductForm({ ...productForm, widthInches: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                />
              </div>

              {/* Capry Guarantee Toggle & Custom Text */}
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-900 flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.capryGuarantee}
                      onChange={(e) => setProductForm({ ...productForm, capryGuarantee: e.target.checked })}
                      className="accent-[#C5A059] w-4 h-4"
                    />
                    <span>Enable "Capry Guarantee" for this fabric</span>
                  </label>
                  <span className="text-[10px] text-[#8C6D2C] font-semibold">100% Guaranteed</span>
                </div>
                {productForm.capryGuarantee && (
                  <input
                    type="text"
                    value={productForm.capryGuaranteeText}
                    onChange={(e) => setProductForm({ ...productForm, capryGuaranteeText: e.target.value })}
                    placeholder="Capry Guarantee: No lint, no shrinkage..."
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded text-xs"
                  />
                )}
              </div>

              {/* Colors Management */}
              <div className="space-y-2">
                <label className="block font-semibold text-stone-800">Available Colors</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {productForm.colors?.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-300 px-2.5 py-1 rounded text-xs"
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(c.name)}
                        className="text-stone-400 hover:text-red-600 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Color Name (e.g. Zaytuni Olive)"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs"
                  />
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 bg-stone-800 text-white rounded text-xs font-semibold cursor-pointer hover:bg-stone-700"
                  >
                    Add Color
                  </button>
                </div>

                {/* Quick Add from 22 Signature Colors */}
                <div className="pt-2 border-t border-stone-200">
                  <div className="text-[11px] font-semibold text-stone-600 mb-1.5 flex items-center justify-between">
                    <span>Quick-Add from 22 Signature Pakistani Shades:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setProductForm(prev => ({
                          ...prev,
                          colors: TWENTY_TWO_FABRIC_COLORS
                        }));
                      }}
                      className="text-[10px] text-[#8C6D2C] hover:underline font-bold"
                    >
                      + Add All 22 Colors
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1 bg-stone-50 border border-stone-200 rounded">
                    {TWENTY_TWO_FABRIC_COLORS.map((c) => {
                      const alreadyAdded = productForm.colors?.some(pc => pc.name === c.name);
                      return (
                        <button
                          key={c.name}
                          type="button"
                          disabled={alreadyAdded}
                          onClick={() => {
                            if (!alreadyAdded) {
                              setProductForm(prev => ({
                                ...prev,
                                colors: [...(prev.colors || []), { name: c.name, hex: c.hex, inStock: true }]
                              }));
                            }
                          }}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border transition-all ${
                            alreadyAdded
                              ? 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed opacity-60'
                              : 'bg-white hover:bg-amber-50 text-stone-800 border-stone-300 cursor-pointer hover:border-[#C5A059]'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Product Images (Upload from computer or preview) */}
              <div className="space-y-2">
                <label className="block font-semibold text-stone-800">
                  Product Images (Upload from Computer / Gallery)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {productForm.images?.map((img, idx) => (
                    <div key={idx} className="relative aspect-[3/4] rounded border border-stone-300 overflow-hidden group">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-80 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <label className="aspect-[3/4] rounded border-2 border-dashed border-stone-300 hover:border-[#C5A059] flex flex-col items-center justify-center p-2 text-center cursor-pointer bg-stone-50">
                    <Upload className="w-5 h-5 text-stone-400" />
                    <span className="text-[10px] text-stone-500 mt-1 font-medium">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Badges & Flags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-200">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="accent-[#C5A059]"
                  />
                  <span>Featured Suit</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="accent-[#C5A059]"
                  />
                  <span>Best Seller</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                    className="accent-[#C5A059]"
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isPublished}
                    onChange={(e) => setProductForm({ ...productForm, isPublished: e.target.checked })}
                    className="accent-[#C5A059]"
                  />
                  <span>Published (Active)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#141413] hover:bg-stone-800 text-white font-semibold rounded"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* CATEGORY CREATE / EDIT MODAL */}
      {/* ------------------------------------------------------------------- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E2D5] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-stone-400 hover:text-stone-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Cotton"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#141413] hover:bg-stone-800 text-white font-semibold rounded"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
