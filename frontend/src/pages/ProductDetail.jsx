import React, { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus, ShoppingBag, Zap, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import Badge from "@/components/Badge";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProduct, relatedProducts } from "@/lib/catalog";
import { priceLabel, formatDateBR } from "@/lib/format";
import { useCart } from "@/context/CartContext";

const SNEAKER_SIZES = ["38", "39", "40", "41", "42", "43", "44"];
const APPAREL_SIZES = ["P", "M", "G", "GG"];

function NotFound() {
  return (
    <div className="pt-32 pb-24 container-px text-center">
      <h1 className="font-display text-4xl text-bone">Produto não encontrado</h1>
      <Link to="/shop" className="btn-sand mt-8">Voltar ao Shop</Link>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const navigate = useNavigate();
  const { addItem, setOpen } = useCart();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  const needsSize = useMemo(() => {
    if (!product) return false;
    return ["Sneakers", "Camisetas", "Bermudas", "Moletons & Jaquetas"].includes(product.category);
  }, [product]);

  if (!product) return <NotFound />;

  const sizes = product.category === "Sneakers" ? SNEAKER_SIZES : APPAREL_SIZES;
  const related = relatedProducts(product);

  const meta = [
    ["SKU", product.sku],
    ["Marca", product.brand],
    ["Silhueta", product.silhouette],
    ["Cor", product.color],
    ["Lançamento", formatDateBR(product.launchDate) || product.launchDateRaw],
    ["Preço de lançamento", product.launchPrice],
  ].filter(([, v]) => v);

  const handleAdd = (buyNow = false) => {
    if (!product.available) {
      toast.error(product.soldOut ? "Produto esgotado" : "Produto sob consulta");
      return;
    }
    if (needsSize && !size) {
      toast.error("Selecione um tamanho");
      return;
    }
    addItem(product, { size, qty });
    toast.success("Adicionado à sacola");
    if (buyNow) {
      setOpen(false);
      navigate("/checkout");
    }
  };

  return (
    <div className="pt-20 lg:pt-24 pb-24" data-testid="product-page">
      <div className="container-px">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted2 mb-8">
          <Link to="/" className="hover:text-sand">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/shop?cat=${encodeURIComponent(product.category)}`} className="hover:text-sand">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-mute truncate max-w-[160px]">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              key={active}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-square border border-white/[0.06] overflow-hidden group"
            >
              <SmartImage
                src={product.gallery[active]}
                alt={`${product.name} - imagem ${active + 1}`}
                eager
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full"
                imgClassName="h-full w-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {product.badges.map((b, i) => <Badge key={i} badge={b} />)}
              </div>
            </motion.div>
            {product.gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    data-testid={`thumb-${i}`}
                    className={`aspect-square overflow-hidden border transition-all ${active === i ? "border-sand" : "border-white/10 opacity-60 hover:opacity-100"}`}
                  >
                    <img src={g} alt={`miniatura ${i + 1}`} loading="lazy" decoding="async" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow mb-3">{product.category}{product.brand ? ` · ${product.brand}` : ""}</p>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-bone leading-[1.05]">{product.name}</h1>

            <div className="mt-5 flex items-end gap-3">
              <span className={`font-display font-black ${product.available ? "text-3xl text-bone" : "text-xl text-mute"}`}>
                {priceLabel(product.priceCurrent)}
              </span>
              {product.discount && product.available && (
                <span className="mb-1 px-2 py-0.5 text-xs font-bold bg-blood/20 text-blood">{product.discount}</span>
              )}
            </div>
            {product.installment && product.available && (
              <p className="text-sm text-mute mt-1">ou {product.installment}</p>
            )}

            {/* Sizes */}
            {needsSize && product.available && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted2 mb-3">Tamanho {product.category === "Sneakers" ? "(BR)" : ""}</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      data-testid={`size-${s}`}
                      className={`min-w-[3rem] px-3 py-2.5 text-sm border transition-all ${size === s ? "bg-sand text-ink border-sand" : "border-white/10 text-bone hover:border-sand"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + actions */}
            {product.available ? (
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-white/10 self-start">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5 text-bone hover:text-sand" data-testid="qty-dec" aria-label="Diminuir">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-bone tabular-nums">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="p-3.5 text-bone hover:text-sand" data-testid="qty-inc" aria-label="Aumentar">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={() => handleAdd(false)} className="btn-sand flex-1" data-testid="add-to-cart-detail">
                  <ShoppingBag className="h-4 w-4" /> Adicionar
                </button>
                <button onClick={() => handleAdd(true)} className="btn-blood flex-1" data-testid="buy-now">
                  <Zap className="h-4 w-4" /> Comprar agora
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <button disabled className="btn-ghost w-full sm:w-auto opacity-60 cursor-not-allowed" data-testid="unavailable">
                  {product.soldOut ? "Esgotado" : "Consulte disponibilidade"}
                </button>
              </div>
            )}

            {/* perks */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[[Truck, "Frete grátis +R$1.500"], [ShieldCheck, "Originalidade garantida"], [RotateCcw, "Troca facilitada"]].map(([Icon, label], i) => (
                <div key={i} className="flex flex-col items-center gap-2 border border-white/[0.06] p-4 text-center">
                  <Icon className="h-5 w-5 text-sand" />
                  <span className="text-[10px] uppercase tracking-wider text-muted2 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="font-display font-bold text-lg text-bone mb-3">Descrição</h2>
              <p className="text-mute leading-relaxed whitespace-pre-line text-[15px]">{product.description}</p>
            </div>

            {/* Meta */}
            {meta.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.06] pt-8">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-muted2">{k}</dt>
                    <dd className="text-sm text-bone mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <Reveal className="mb-10">
              <p className="eyebrow mb-3">Você também vai gostar</p>
              <h2 className="font-display font-black uppercase text-3xl sm:text-4xl tracking-tighter text-bone">Produtos relacionados</h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}

        <Link to="/shop" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-sand hover:text-bone mt-16">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Shop
        </Link>
      </div>
    </div>
  );
}
