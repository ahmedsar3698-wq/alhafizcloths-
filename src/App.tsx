import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { CartProvider } from './context/CartContext';
import { storageService } from './services/storageService';
import { Product, Category, Order } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load initial data from persistent storage
  const loadData = () => {
    setProducts(storageService.getProducts());
    setCategories(storageService.getCategories());
    setOrders(storageService.getOrders());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedProduct(null);
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: string) => {
    if (tab === 'shop' && currentTab !== 'shop') {
      // If navigating to shop from elsewhere without explicit category, leave or reset
    }
    setSelectedProduct(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#C5A059] selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={handleNavigateTab}
          onOpenAdmin={() => handleNavigateTab('admin')}
          onSelectCategory={handleSelectCategory}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomePage
              products={products}
              categories={categories}
              onViewProduct={handleViewProduct}
              onNavigateTab={handleNavigateTab}
              onSelectCategory={handleSelectCategory}
            />
          )}

          {currentTab === 'shop' && (
            <ShopPage
              products={products}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onViewProduct={handleViewProduct}
            />
          )}

          {currentTab === 'product-detail' && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              allProducts={products}
              onBack={() => handleNavigateTab('shop')}
              onViewProduct={handleViewProduct}
            />
          )}

          {currentTab === 'about' && (
            <AboutPage onNavigateShop={() => handleNavigateTab('shop')} />
          )}

          {currentTab === 'contact' && <ContactPage />}

          {currentTab === 'exchange-policy' && (
            <PolicyPage initialTab="exchange" />
          )}

          {currentTab === 'privacy-policy' && (
            <PolicyPage initialTab="privacy" />
          )}

          {currentTab === 'admin' && (
            <AdminDashboard
              products={products}
              categories={categories}
              orders={orders}
              onRefreshData={loadData}
              onClose={() => handleNavigateTab('home')}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          setCurrentTab={handleNavigateTab}
          onOpenAdmin={() => handleNavigateTab('admin')}
          onSelectCategory={handleSelectCategory}
        />

        {/* Interactive Overlays */}
        <FloatingWhatsApp />
        <CartDrawer />
        <CheckoutModal />
        <WhatsAppOrderModal />
      </div>
    </CartProvider>
  );
}
