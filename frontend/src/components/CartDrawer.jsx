import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { brl } from "@/lib/format";

export function CartDrawer() {
  const { open, setOpen, items, updateQty, removeItem, subtotal, shipping, total, discount, count } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
          data-testid="cart-drawer"
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-surface border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/[0.06]">
              <h3 className="font-display font-bold text-lg text-bone flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-sand" /> Sacola ({count})
              </h3>
              <button onClick={() => setOpen(false)} className="text-bone p-1.5 hover:text-sand" data-testid="close-cart-button" aria-label="Fechar">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag className="h-12 w-12 text-muted2" />
                <p className="text-mute">Sua sacola está vazia.</p>
                <Link to="/shop" onClick={() => setOpen(false)} className="btn-ghost text-xs">
                  Explorar Coleção
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
                  {items.map((it) => (
                    <div key={it.key} className="flex gap-4" data-testid={`cart-item-${it.id}`}>
                      <Link to={`/produto/${it.id}`} onClick={() => setOpen(false)} className="shrink-0">
                        <img src={it.image} alt={it.name} className="h-20 w-20 object-contain bg-surface2 p-1" loading="lazy" decoding="async" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-bone leading-tight line-clamp-2">{it.name}</p>
                        {it.size && <p className="text-[11px] text-muted2 mt-0.5">Tam: {it.size}</p>}
                        <p className="text-sm text-sand font-display font-bold mt-1">{brl(it.price)}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-white/10">
                            <button onClick={() => updateQty(it.key, it.qty - 1)} className="p-1.5 text-bone hover:text-sand" data-testid={`dec-${it.id}`} aria-label="Diminuir">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-3 text-sm text-bone tabular-nums">{it.qty}</span>
                            <button onClick={() => updateQty(it.key, it.qty + 1)} className="p-1.5 text-bone hover:text-sand" data-testid={`inc-${it.id}`} aria-label="Aumentar">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(it.key)} className="text-muted2 hover:text-blood p-1" data-testid={`remove-${it.id}`} aria-label="Remover">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.06] p-5 sm:p-6 space-y-3">
                  <div className="flex justify-between text-sm text-mute">
                    <span>Subtotal</span>
                    <span className="text-bone tabular-nums">{brl(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-sand">
                      <span>Desconto</span>
                      <span className="tabular-nums">- {brl(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-mute">
                    <span>Frete</span>
                    <span className="text-bone tabular-nums">{shipping === 0 ? "Grátis" : brl(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-lg text-bone pt-2 border-t border-white/[0.06]">
                    <span>Total</span>
                    <span className="tabular-nums">{brl(total)}</span>
                  </div>
                  <button onClick={goCheckout} className="btn-sand w-full mt-2" data-testid="checkout-button">
                    Finalizar Compra <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[11px] text-center text-muted2">Frete grátis acima de R$ 1.500 · Checkout demo</p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
