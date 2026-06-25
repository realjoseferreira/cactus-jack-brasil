import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Gem, Sparkles, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { PRODUCTS, CATEGORIES } from "@/lib/catalog";

const STATS = [
  { value: PRODUCTS.length, label: "Peças exclusivas" },
  { value: CATEGORIES.length, label: "Categorias" },
  { value: "100%", label: "Curadoria autoral" },
  { value: "1", label: "Flagship conceitual" },
];

export default function About() {
  return (
    <div className="pt-16 lg:pt-20" data-testid="about-page">
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden flex items-end">
        <SmartImage
          src="/brand/fachada.webp"
          alt="Cactus Jack Brasil flagship conceitual"
          eager
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="grain absolute inset-0" />
        <div className="relative container-px pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="eyebrow mb-4 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> A Concept Store</p>
            <h1 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tighter text-bone leading-[0.9]">
              Sobre a<br /><span className="text-sand">Cactus Jack Brasil</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="container-px py-20 lg:py-28 grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display font-bold text-2xl text-bone mb-6">Onde o hype encontra o luxo.</h2>
          <div className="space-y-5 text-mute leading-relaxed text-[15px]">
            <p>
              A <span className="text-bone">Cactus Jack Brasil</span> é uma concept store / showcase dedicada ao universo de Travis Scott -
              uma celebração da cultura sneaker, do streetwear de luxo e das colaborações mais cobiçadas do planeta. Cada peça é selecionada
              com olhar de colecionador, reunindo silhuetas raras, vestuário icônico e itens de colecionador.
            </p>
            <p>
              Mais que uma loja, é uma experiência editorial: imagens cinematográficas, drops com narrativa e uma curadoria que transforma
              produto em desejo. Do <span className="text-sand">Air Jordan 1</span> aos colecionáveis Fragment x Cactus Jack, cada item conta
              uma história.
            </p>
            <p className="text-muted2 text-sm border-l-2 border-sand/40 pl-4">
              Este é um projeto demonstrativo, criado como showcase visual. Não há transações reais - toda a experiência de catálogo, carrinho
              e checkout é simulada no frontend para fins de portfólio.
            </p>
          </div>
          <Link to="/shop" className="btn-sand mt-9 text-xs">Explorar a coleção <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 space-y-5">
          <div className="border border-white/10 bg-surface p-6">
            <Gem className="h-6 w-6 text-sand mb-3" />
            <h3 className="font-display font-bold text-bone mb-2">Curadoria Exclusiva</h3>
            <p className="text-sm text-mute leading-relaxed">Seleção autoral de drops limitados, do streetwear ao colecionável de alto valor.</p>
          </div>
          <div className="border border-white/10 bg-surface p-6">
            <MapPin className="h-6 w-6 text-sand mb-3" />
            <h3 className="font-display font-bold text-bone mb-2">Flagship Conceitual · Iguatemi SP</h3>
            <p className="text-sm text-mute leading-relaxed">
              Imaginamos uma loja física no Shopping Iguatemi São Paulo - um espaço fictício que dá vida à identidade visual da marca.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-white/[0.06] bg-surface py-16">
        <div className="container-px grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.06} className="text-center">
              <p className="font-display font-black text-4xl sm:text-5xl text-sand">{s.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted2 mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
