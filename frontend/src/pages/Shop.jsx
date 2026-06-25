import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, filterSort } from "@/lib/catalog";

const SORTS = [
  { id: "destaque", label: "Destaque" },
  { id: "novidade", label: "Novidade" },
  { id: "preco-asc", label: "Menor preço" },
  { id: "preco-desc", label: "Maior preço" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState(params.get("cat") || "Todos");
  const [query, setQuery] = useState(params.get("q") || "");
  const [sort, setSort] = useState(params.get("sort") || "destaque");

  useEffect(() => {
    const next = {};
    if (category !== "Todos") next.cat = category;
    if (query) next.q = query;
    if (sort !== "destaque") next.sort = sort;
    setParams(next, { replace: true });
  }, [category, query, sort, setParams]);

  const results = useMemo(
    () => filterSort({ products: PRODUCTS, category, query, sort }),
    [category, query, sort]
  );

  const cats = ["Todos", ...CATEGORIES.map((c) => c.name)];

  return (
    <div className="pt-16 lg:pt-20" data-testid="shop-page">
      {/* Header banner */}
      <div className="relative border-b border-white/[0.06] bg-surface py-14 lg:py-20 overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="relative container-px">
          <p className="eyebrow mb-3">Catálogo Completo</p>
          <h1 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tighter text-bone">Shop</h1>
          <p className="mt-3 text-mute max-w-xl">{PRODUCTS.length} peças exclusivas · sneakers, vestuário e colecionáveis Cactus Jack.</p>
        </div>
      </div>

      <div className="container-px py-10">
        {/* Controls */}
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, marca, cor..."
                data-testid="search-input"
                className="w-full bg-surface border border-white/10 pl-11 pr-10 py-3 text-sm text-bone placeholder:text-muted2 focus:outline-none focus:border-sand transition-colors"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted2 hover:text-sand" aria-label="Limpar">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <SlidersHorizontal className="h-4 w-4 text-muted2" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                data-testid="sort-select"
                className="bg-surface border border-white/10 px-4 py-3 text-bone focus:outline-none focus:border-sand cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-surface">{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                data-testid={`filter-${c}`}
                className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                  category === c
                    ? "bg-sand text-ink border-sand"
                    : "bg-transparent text-bone/70 border-white/10 hover:border-sand hover:text-sand"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-muted2 mb-6">{results.length} resultado(s)</p>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl text-bone">Nenhum produto encontrado.</p>
            <button onClick={() => { setQuery(""); setCategory("Todos"); }} className="btn-ghost mt-6 text-xs">Limpar filtros</button>
          </div>
        ) : (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
