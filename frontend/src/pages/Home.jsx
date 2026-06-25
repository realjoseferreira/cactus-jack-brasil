import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, MapPin, Trophy, Flame } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import { SmartImage } from "@/components/SmartImage";
import { CATEGORIES, featuredProducts, latestDrops } from "@/lib/catalog";
import { brl } from "@/lib/format";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] sm:min-h-[620px] overflow-hidden" data-testid="hero">
      <motion.div style={{ y }} className="absolute inset-0">
        <HeroVideo className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      <div className="grain absolute inset-0" />

      <motion.div style={{ opacity }} className="relative z-10 h-full container-px flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Concept Store · Drop Exclusivo
          </p>
          <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-bone text-[3rem] sm:text-7xl lg:text-8xl">
            Cactus Jack
            <br />
            <span className="text-stroke">Brasil</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-bone/75 leading-relaxed">
            Curadoria premium de sneakers e peças raras do universo Travis Scott. Uma experiência de loja de luxo, do hype ao colecionável.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/shop" className="btn-sand w-full sm:w-auto" data-testid="hero-shop-cta">
              Explorar Coleção <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/sobre" className="btn-ghost w-full sm:w-auto">
              A Concept Store
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 right-7 z-10 hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-bone/50"
      >
        Scroll <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["Travis Scott", "Cactus Jack", "Air Jordan", "Limited Drops", "Sneaker Culture", "Fragment", "Utopia"];
  return (
    <div className="relative border-y border-white/[0.06] bg-surface py-5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center gap-8 pr-8" aria-hidden={k === 1}>
            {words.map((w, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="font-display font-extrabold uppercase text-2xl text-bone/30 tracking-tight whitespace-nowrap">{w}</span>
                <Flame className="h-4 w-4 text-blood shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section className="container-px py-20 lg:py-28" data-testid="categories-section">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="eyebrow mb-3">Curadoria</p>
          <h2 className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter text-bone">Categorias</h2>
        </div>
        <Link to="/shop" className="text-sm uppercase tracking-[0.2em] text-sand hover:text-bone inline-flex items-center gap-1.5">
          Ver tudo <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <Link
              to={`/shop?cat=${encodeURIComponent(c.name)}`}
              data-testid={`category-${c.name}`}
              className="group relative block aspect-[4/3] overflow-hidden border border-white/[0.06]"
            >
              <SmartImage
                src={c.cover}
                alt={c.name}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className="text-[11px] uppercase tracking-[0.2em] text-sand/80">{c.count} peças</p>
                <h3 className="font-display font-bold text-2xl text-bone group-hover:text-sand transition-colors">{c.name}</h3>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const items = featuredProducts();
  return (
    <section className="bg-surface border-y border-white/[0.06] py-20 lg:py-28" data-testid="featured-section">
      <div className="container-px">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2"><Flame className="h-3.5 w-3.5 text-blood" /> Hype Selecionado</p>
            <h2 className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter text-bone">Featured Sneakers</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestDrops() {
  const items = latestDrops();
  return (
    <section className="container-px py-20 lg:py-28" data-testid="latest-section">
      <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="eyebrow mb-3">Recém-Chegados</p>
          <h2 className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter text-bone">Latest Drops</h2>
        </div>
        <Link to="/shop?sort=novidade" className="text-sm uppercase tracking-[0.2em] text-sand hover:text-bone inline-flex items-center gap-1.5">
          Ver novidades <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 4).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Flagship() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" data-testid="flagship-section">
      <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 border border-sand/20" />
            <SmartImage
              src="/brand/fachada.webp"
              alt="Fachada conceitual Cactus Jack Brasil no Shopping Iguatemi São Paulo"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative aspect-[4/3] w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-4 flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-sand" /> Flagship Conceitual</p>
          <h2 className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter text-bone leading-[0.95]">
            Cactus Jack Brasil
            <br />
            <span className="text-sand">Shopping Iguatemi · SP</span>
          </h2>
          <p className="mt-6 text-mute leading-relaxed max-w-lg">
            Imaginamos uma flagship física no coração de São Paulo - arquitetura editorial, iluminação cinematográfica e drops com curadoria
            de colecionador. Um espaço onde a cultura sneaker encontra o luxo.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted2">
            Conceito / Showcase · loja física fictícia para fins visuais
          </p>
          <Link to="/sobre" className="btn-ghost mt-8 text-xs">Conheça o conceito <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function IconsStrip() {
  return null;
}

function Giveaway() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" data-testid="giveaway-section">
      <div className="absolute inset-0 bg-gradient-to-br from-blood/20 via-ink to-ink" />
      <div className="grain absolute inset-0" />
      <div className="relative container-px grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-2"><Trophy className="h-3.5 w-3.5 text-sand" /> Experiência Exclusiva</p>
          <h2 className="font-display font-black uppercase text-4xl sm:text-6xl tracking-tighter text-bone leading-[0.9]">
            Sorteio
            <br />
            <span className="text-blood">Autografado</span>
          </h2>
          <p className="mt-6 text-mute leading-relaxed max-w-lg">
            Compras acima de <span className="text-bone font-semibold">{brl(50000)}</span> concorrem automaticamente ao sorteio de um
            sneaker exclusivo <span className="text-sand">autografado</span> - uma peça única para o colecionador definitivo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-blood">Concorrer agora <ArrowRight className="h-4 w-4" /></Link>
            <span className="inline-flex items-center px-5 text-xs uppercase tracking-[0.2em] text-muted2 border border-white/10">
              Mecânica simbólica / showcase
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex justify-center">
          <motion.img
            src="/brand/icons/autographed.webp"
            alt="Sneaker autografado do sorteio exclusivo"
            loading="lazy"
            width="640"
            height="640"
            className="w-full max-w-md object-contain drop-shadow-[0_30px_60px_rgba(140,34,34,0.4)]"
            animate={{ y: [0, -18, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <Marquee />
      <Categories />
      <Featured />
      <LatestDrops />
      <Flagship />
      <Giveaway />
    </div>
  );
}
