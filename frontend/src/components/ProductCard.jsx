import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Plus } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { SmartImage } from "@/components/SmartImage";
import Badge from "@/components/Badge";
import { priceLabel } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const installment = product.installment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`product-card-${product.id}`}
    >
      <TiltCard className="group h-full">
        <div className="relative h-full bg-surface border border-white/[0.06] hover:border-sand/30 transition-colors duration-500">
          <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5" style={{ transform: "translateZ(40px)" }}>
            {product.badges.map((b, i) => (
              <Badge key={i} badge={b} />
            ))}
          </div>

          <Link to={`/produto/${product.id}`} className="block relative" data-testid={`product-link-${product.id}`}>
            <div className="relative aspect-square overflow-hidden">
              <SmartImage
                src={product.image}
                alt={product.name}
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full"
                imgClassName="h-full w-full object-contain p-4 sm:p-5 group-hover:scale-[1.04] transition-transform duration-1000 ease-out"
              />
              <div className="pointer-events-none absolute inset-0 tilt-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-bone/70 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Eye className="h-3.5 w-3.5" /> Ver produto
              </div>
            </div>
          </Link>

          <div className="p-4 sm:p-5" style={{ transform: "translateZ(25px)" }}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted2">{product.category}</p>
            <Link to={`/produto/${product.id}`}>
              <h3 className="mt-1.5 font-display font-bold leading-tight text-bone text-[15px] line-clamp-2 min-h-[2.6rem] hover:text-sand transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="mt-3 flex items-end justify-between gap-2">
              <div>
                <p className={`font-display text-lg font-bold ${product.available ? "text-bone" : "text-mute text-base"}`}>
                  {priceLabel(product.priceCurrent)}
                </p>
                {installment && product.available && (
                  <p className="text-[11px] text-muted2 mt-0.5">{installment}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              {product.available ? (
                <button
                  data-testid={`add-cart-${product.id}`}
                  onClick={() => addItem(product, { qty: 1 })}
                  className="w-full inline-flex min-h-11 items-center justify-center gap-2 bg-surface2 border border-white/10 text-bone text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] px-3 py-3 hover:bg-sand hover:text-ink hover:border-sand transition-all duration-300"
                >
                  <Plus className="h-4 w-4" /> Adicionar
                </button>
              ) : (
                <Link
                  to={`/produto/${product.id}`}
                  data-testid={`consult-${product.id}`}
                  className="w-full inline-flex min-h-11 items-center justify-center gap-2 border border-muted2/40 text-mute text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.18em] px-3 py-3 hover:border-sand hover:text-sand transition-all duration-300"
                >
                  {product.soldOut ? "Sold Out" : "Sob Consulta"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default ProductCard;
