import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TOY_PRODUCTS,
  CURRENCIES,
  PROMO_CODES,
  INITIAL_REVIEWS
} from '../data/toys';

const StoreContext = createContext(null);

const loadStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  // Navigation & URL Hash Routing
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('tgd-001');
  const [shopCategory, setShopCategory] = useState('all');
  const [globalSearch, setGlobalSearch] = useState('');

  // Preferences
  const [theme, setTheme] = useState(() => loadStorage('tgd_theme', 'light'));
  const [currency, setCurrency] = useState(() => loadStorage('tgd_currency_ksh', 'KES'));

  // E-Commerce State (Persisted)
  const [cart, setCart] = useState(() =>
    loadStorage('tgd_cart', [
      { ...TOY_PRODUCTS[0], selectedVariant: TOY_PRODUCTS[0].variants[0], quantity: 1 },
      { ...TOY_PRODUCTS[3], selectedVariant: TOY_PRODUCTS[3].variants[0], quantity: 1 }
    ])
  );
  const [wishlist, setWishlist] = useState(() => loadStorage('tgd_wishlist', ['tgd-002', 'tgd-003']));
  const [compareIds, setCompareIds] = useState(() => loadStorage('tgd_compare', ['tgd-001', 'tgd-005']));
  const [unboxedVault, setUnboxedVault] = useState(() => loadStorage('tgd_vault', []));
  const [reviews, setReviews] = useState(() => loadStorage('tgd_reviews', INITIAL_REVIEWS));
  const [orders, setOrders] = useState(() =>
    loadStorage('tgd_orders', [
      {
        id: 'TGD-84910',
        date: 'Oct 15, 2026',
        status: 'Out for Delivery',
        deliveryMethod: 'Express Home Delivery',
        paymentMethod: 'M-Pesa Express',
        customerName: 'Hamisi M.',
        city: 'Nairobi (Runda)',
        total: 52.48,
        items: [
          { id: 'tgd-001', name: 'Apex GT-R 1:24 Die-Cast Metal Racer', qty: 1, price: 19.99 },
          { id: 'tgd-003', name: 'Steampunk Locomotive 880-Pc Brick Set', qty: 1, price: 34.99 }
        ]
      }
    ])
  );
  const [workshopBookings, setWorkshopBookings] = useState(() => loadStorage('tgd_bookings', []));

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Sync theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tgd_theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tgd_currency_ksh', JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('tgd_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tgd_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tgd_compare', JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    localStorage.setItem('tgd_vault', JSON.stringify(unboxedVault));
  }, [unboxedVault]);

  useEffect(() => {
    localStorage.setItem('tgd_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('tgd_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tgd_bookings', JSON.stringify(workshopBookings));
  }, [workshopBookings]);

  // Sync Hash Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (!hash) return;
      const parts = hash.split('/');
      if (parts[0] === 'product' && parts[1]) {
        setSelectedProductId(parts[1]);
        setPage('product');
      } else if (
        ['home', 'shop', 'blindbox', 'bundles', 'stores', 'checkout', 'account', 'about', 'contact'].includes(parts[0])
      ) {
        setPage(parts[0]);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (targetPage, options = {}) => {
    if (options.productId) {
      setSelectedProductId(options.productId);
      window.location.hash = `#/product/${options.productId}`;
    } else {
      window.location.hash = `#/${targetPage}`;
    }
    if (options.category) {
      setShopCategory(options.category);
    }
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3000);
  };

  // Price Formatter (Defaults to KSh)
  const formatPrice = (usdAmount) => {
    const curr = CURRENCIES[currency] || CURRENCIES.KES;
    const converted = usdAmount * curr.rate;
    if (currency === 'KES') {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  // Cart Actions
  const addToCart = (product, qty = 1, variant = null) => {
    const chosenVariant = variant || (product.variants ? product.variants[0] : 'Standard');
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.id === product.id && item.selectedVariant === chosenVariant
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + qty };
        return updated;
      }
      return [...prev, { ...product, selectedVariant: chosenVariant, quantity: qty }];
    });
    showToast(`Added "${product.name}" to your bag!`);
  };

  const updateCartQty = (id, selectedVariant, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedVariant === selectedVariant
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, selectedVariant) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedVariant === selectedVariant))
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = TOY_PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        showToast(`Removed "${prod?.name || 'Toy'}" from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${prod?.name || 'Toy'}" to Wishlist!`);
        return [...prev, productId];
      }
    });
  };

  // Compare Actions
  const toggleCompare = (productId) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 toys at once', 'info');
        return prev;
      }
      showToast('Added to Product Comparison Drawer');
      return [...prev, productId];
    });
  };

  // Promo Code Application
  const applyPromoCode = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    const found = PROMO_CODES[code];
    if (!found) {
      showToast('Invalid promo code. Try MINISO15, GENTS20, or WELCOME10', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Order must be at least ${formatPrice(found.minOrder)} for ${code}`, 'error');
      return false;
    }
    setAppliedPromo(found);
    showToast(`Promo ${code} applied: ${found.desc}!`);
    return true;
  };

  // Totals Calculation
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const bundleEligible = cartCount >= 3;
  const bundleDiscount = bundleEligible ? cartSubtotal * 0.15 : 0;

  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      promoDiscount = (cartSubtotal - bundleDiscount) * (appliedPromo.value / 100);
    } else {
      promoDiscount = appliedPromo.value;
    }
  }

  const giftWrapFee = giftWrap ? 3.99 : 0;
  const shippingFee = cartSubtotal - bundleDiscount >= 35 || cartCount === 0 ? 0 : 4.99;
  const cartTotal = Math.max(
    0,
    cartSubtotal - bundleDiscount - promoDiscount + giftWrapFee + shippingFee
  );

  // Place Order
  const placeOrder = (checkoutData) => {
    const newOrder = {
      id: `TGD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'Order Confirmed & Packing',
      deliveryMethod: checkoutData.deliveryMethod,
      paymentMethod: checkoutData.paymentMethod,
      customerName: `${checkoutData.firstName} ${checkoutData.lastName}`,
      email: checkoutData.email,
      phone: checkoutData.phone,
      city: checkoutData.city || 'In-Store Pickup',
      address: checkoutData.address,
      giftWrap,
      giftNote,
      subtotal: cartSubtotal,
      bundleDiscount,
      promoDiscount,
      shippingFee,
      total: cartTotal,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        variant: item.selectedVariant,
        qty: item.quantity,
        price: item.price,
        image: item.image
      }))
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedPromo(null);
    setGiftWrap(false);
    setGiftNote('');
    showToast(`Order ${newOrder.id} confirmed!`);
    return newOrder;
  };

  // Add Review
  const addReview = (reviewObj) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      date: 'Just now',
      role: 'Verified Toy Buyer',
      ...reviewObj
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your review has been published.');
  };

  // Record Mystery Capsule Pull
  const recordMysteryPull = (figure, series) => {
    const pull = {
      pullId: `pull-${Date.now()}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      seriesName: series.name,
      ...figure
    };
    setUnboxedVault((prev) => [pull, ...prev]);
  };

  // Book Workshop
  const bookWorkshop = (bookingData) => {
    const record = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Confirmed',
      ...bookingData
    };
    setWorkshopBookings((prev) => [record, ...prev]);
    showToast(`Workshop Table Reserved (${record.id})!`);
    return record;
  };

  return (
    <StoreContext.Provider
      value={{
        page,
        navigate,
        selectedProductId,
        shopCategory,
        setShopCategory,
        globalSearch,
        setGlobalSearch,
        theme,
        setTheme,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        bundleEligible,
        bundleDiscount,
        promoDiscount,
        appliedPromo,
        applyPromoCode,
        setAppliedPromo,
        giftWrap,
        setGiftWrap,
        giftNote,
        setGiftNote,
        shippingFee,
        cartTotal,
        wishlist,
        toggleWishlist,
        compareIds,
        toggleCompare,
        isCartOpen,
        setIsCartOpen,
        isCompareOpen,
        setIsCompareOpen,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast,
        orders,
        placeOrder,
        reviews,
        addReview,
        unboxedVault,
        recordMysteryPull,
        workshopBookings,
        bookWorkshop
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

