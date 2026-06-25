import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Code2,
  CreditCard,
  Database,
  FolderTree,
  ImageIcon,
  Layers,
  ShoppingCart,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const STACK = [
  { k: "Framework", v: "React 19 SPA" },
  { k: "Build", v: "Create React App + CRACO" },
  { k: "Routing", v: "React Router 7" },
  { k: "Styling", v: "Tailwind CSS 3" },
  { k: "Animation", v: "Framer Motion 11" },
  { k: "Icons", v: "lucide-react" },
  { k: "State", v: "React Context API" },
  { k: "Persistence", v: "localStorage" },
];

const SECTIONS = [
  {
    icon: Database,
    title: "Product data and assets",
    body: [
      "Product records are stored in src/data/catalog.json and enriched by src/lib/catalog.js.",
      "Main product images and galleries live in public/products/<product-slug>/ using main.*, g1, g2 and related filenames.",
      "The catalog layer calculates availability, badges, featured products, latest drops and related products.",
      "Missing optional fields are handled with frontend fallbacks so the product page stays stable.",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Frontend cart",
    body: [
      "Cart state is centralized in CartContext and persisted with localStorage under cjb_cart_v1.",
      "The drawer supports adding, removing, quantity changes, size variants, subtotal, simulated shipping and visual coupons.",
      "The cart remains available after refreshes without requiring a backend session.",
    ],
  },
  {
    icon: CreditCard,
    title: "Demo checkout",
    body: [
      "Checkout collects customer, address and payment method fields for a realistic ecommerce flow.",
      "Submitting creates a fictitious order number, clears the cart and redirects to the success page.",
      "No payment provider, backend order creation or real transaction is connected.",
    ],
  },
  {
    icon: ImageIcon,
    title: "Media performance",
    body: [
      "SmartImage uses lazy loading, async decoding, placeholders and stable wrappers for non-critical imagery.",
      "HeroVideo shows a poster first, defers video source selection, respects Save-Data and uses smaller mobile/desktop video files.",
      "Product cards and product galleries use object containment to avoid awkward crop on sneaker and apparel photography.",
    ],
  },
  {
    icon: Sparkles,
    title: "Interaction design",
    body: [
      "Framer Motion powers page reveals, drawer transitions, parallax and selected micro-interactions.",
      "Product cards keep 3D tilt on fine-pointer devices and skip it on touch devices for a cheaper mobile path.",
      "Reduced-motion users get static ambient effects through CSS media queries.",
    ],
  },
  {
    icon: Smartphone,
    title: "Responsive behavior",
    body: [
      "The layout is mobile-first with responsive grids, a dedicated mobile menu and a full-width cart drawer on phones.",
      "Buttons, filters, product cards, checkout sections and galleries use stable dimensions and wrapping rules.",
      "The site targets desktop, tablet and mobile showcase usage without horizontal overflow.",
    ],
  },
];

export default function Documentation() {
  return (
    <div className="pt-20 lg:pt-24 pb-24" data-testid="documentation-page">
      <div className="container-px">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow mb-3 flex items-center gap-2"><Code2 className="h-3.5 w-3.5" /> Technical Overview</p>
          <h1 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tight text-bone">Documentation</h1>
          <p className="mt-5 max-w-2xl text-mute leading-relaxed">
            Technical overview for <span className="text-bone">Cactus Jack Brasil</span>, a Sick Code showcase storefront.
            The catalog, product pages, cart and checkout demo are handled on the frontend.
          </p>
        </motion.div>

        <Reveal className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ["Project", "Premium sneaker and streetwear concept store inspired by the Travis Scott visual universe."],
            ["Goal", "Portfolio-grade ecommerce showcase for Sick Code with product storytelling, media and motion."],
            ["Architecture", "Single Page App with client-side routing and a frontend-only shopping flow."],
          ].map(([title, text]) => (
            <div key={title} className="border border-white/10 bg-surface p-6">
              <h3 className="font-display font-bold text-bone mb-2">{title}</h3>
              <p className="text-sm text-mute leading-relaxed">{text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display font-bold text-2xl text-bone mb-6 flex items-center gap-2"><Boxes className="h-5 w-5 text-sand" /> Stack</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((item) => (
              <div key={item.k} className="border border-white/10 bg-surface p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">{item.k}</p>
                <p className="text-sm text-bone mt-1 font-medium">{item.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted2">
            Languages: JavaScript, JSX, HTML5 and CSS3. A FastAPI scaffold exists in backend/, but the storefront does not rely on it.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display font-bold text-2xl text-bone mb-6 flex items-center gap-2"><FolderTree className="h-5 w-5 text-sand" /> Project Structure</h2>
          <pre className="border border-white/10 bg-surface p-5 sm:p-6 overflow-x-auto text-xs sm:text-sm text-mute leading-relaxed font-mono">{`frontend/
  public/
    brand/              logo, icon, hero poster, videos and showcase imagery
    products/<slug>/    main image and gallery images
  src/
    components/         layout, header, footer, cart drawer and media helpers
    context/            CartContext with localStorage persistence
    data/catalog.json   product records
    lib/                catalog enrichment and formatting helpers
    pages/              Home, Shop, ProductDetail, Checkout, Success, About, Documentation

backend/
  server.py             optional FastAPI scaffold, not used by checkout`}</pre>
        </Reveal>

        <div className="mt-16 space-y-6">
          {SECTIONS.map((section, index) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.title} delay={(index % 2) * 0.05}>
                <div className="border border-white/10 bg-surface p-6 sm:p-7">
                  <h3 className="font-display font-bold text-xl text-bone mb-4 flex items-center gap-3">
                    <span className="h-9 w-9 shrink-0 grid place-items-center bg-sand/10 border border-sand/20">
                      <Icon className="h-4 w-4 text-sand" />
                    </span>
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.body.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] text-mute leading-relaxed">
                        <Layers className="h-4 w-4 text-sand/60 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 border border-sand/20 bg-gradient-to-br from-sand/5 to-transparent p-8 text-center">
          <p className="text-sm text-mute max-w-2xl mx-auto leading-relaxed">
            This is an unofficial concept project for portfolio and design demonstration purposes. It has no real checkout,
            payment processing or brand affiliation.
          </p>
          <Link to="/shop" className="btn-sand mt-7 text-xs">Explore the store <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </div>
  );
}
