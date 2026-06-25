import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);
const KEY = "cjb_cart_v1";
const COUPONS = { CACTUS10: 0.1, JACKBOYS: 0.15, UTOPIA: 0.05 };

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const lineKey = (id, size) => `${id}__${size || "u"}`;

  const addItem = useCallback((product, { size = null, qty = 1 } = {}) => {
    if (!product || typeof product.priceCurrent !== "number") return;
    setItems((prev) => {
      const key = lineKey(product.id, size);
      const found = prev.find((it) => it.key === key);
      if (found) {
        return prev.map((it) => (it.key === key ? { ...it, qty: Math.min(it.qty + qty, 10) } : it));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.priceCurrent,
          installment: product.installment || null,
          size,
          qty,
        },
      ];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((key) => setItems((p) => p.filter((it) => it.key !== key)), []);
  const updateQty = useCallback(
    (key, qty) =>
      setItems((p) =>
        p.map((it) => (it.key === key ? { ...it, qty: Math.max(1, Math.min(10, qty)) } : it))
      ),
    []
  );
  const clear = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code) => {
    const c = String(code || "").trim().toUpperCase();
    if (COUPONS[c]) {
      setCoupon({ code: c, rate: COUPONS[c] });
      return true;
    }
    setCoupon(null);
    return false;
  }, []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const discount = coupon ? subtotal * coupon.rate : 0;
  const shipping = subtotal === 0 ? 0 : subtotal - discount >= 1500 ? 0 : 49.9;
  const total = subtotal - discount + shipping;

  const value = {
    items,
    open,
    setOpen,
    addItem,
    removeItem,
    updateQty,
    clear,
    coupon,
    applyCoupon,
    subtotal,
    discount,
    shipping,
    total,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
