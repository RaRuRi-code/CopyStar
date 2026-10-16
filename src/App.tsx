import { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart, { type CartItem } from './components/Cart';
import ProductModal from './components/ProductModal';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import DeliveryPage from './pages/DeliveryPage';
import ContactsPage from './pages/ContactsPage';
import { products, type Product } from './data/products';
import { useAjax } from './hooks/useAjax';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // AJAX-like data loading
  const { data: loadedProducts, loading } = useAjax(
    () => Promise.resolve(products),
    []
  );

  const allProducts = loadedProducts || [];

  // Show notification
  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  // Cart operations
  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showNotification(`✅ "${product.name}" добавлен в корзину`);
  }, [showNotification]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const handleCheckout = useCallback(() => {
    showNotification('🎉 Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
    setCartItems([]);
    setCartOpen(false);
  }, [showNotification]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('catalog');
  };

  // Render page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={allProducts}
            loading={loading}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
            onNavigate={handleNavigate}
          />
        );
      case 'catalog':
        return (
          <CatalogPage
            products={allProducts}
            loading={loading}
            searchQuery={searchQuery}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'contacts':
        return <ContactsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearch={handleSearch}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium max-w-sm">
            {notification}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
