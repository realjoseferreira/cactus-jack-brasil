import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/sobre", label: "Sobre" },
  { to: "/documentacao", label: "Documentation" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-gradient-to-b from-ink/60 to-transparent"
        }`}
        data-testid="site-header"
      >
        <div className="container-px flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex min-w-0 items-center gap-3 group" data-testid="logo-link">
            <img src="/brand/icon.png" alt="Cactus Jack Brasil" className="h-8 w-8 object-contain" />
            <span className="truncate font-display font-extrabold tracking-tight text-bone text-sm sm:text-base uppercase leading-none">
              Cactus Jack <span className="text-sand">Brasil</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-sand" : "text-bone/70 hover:text-sand"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/shop" className="hidden sm:inline-flex text-bone/70 hover:text-sand p-2 transition-colors" data-testid="search-link" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="relative text-bone hover:text-sand p-2 transition-colors"
              data-testid="open-cart-button"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 bg-blood text-bone text-[10px] font-bold flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenu(true)}
              className="lg:hidden text-bone p-2"
              data-testid="open-menu-button"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="absolute inset-0 bg-ink/90 backdrop-blur-xl" onClick={() => setMenu(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-surface border-l border-white/10 p-6 sm:p-7 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <img src="/brand/logo.png" alt="Cactus Jack Brasil" className="h-9 object-contain" />
                <button onClick={() => setMenu(false)} className="text-bone p-2" data-testid="close-menu-button" aria-label="Fechar menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <Link
                      to={n.to}
                      className="block font-display font-bold text-3xl text-bone hover:text-sand py-3 border-b border-white/5 transition-colors"
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <Link to="/shop" className="btn-sand w-full" onClick={() => setMenu(false)}>
                  Explorar Coleção
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
