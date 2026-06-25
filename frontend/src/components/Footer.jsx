import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Music2, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="relative bg-ink border-t border-white/[0.06]" data-testid="site-footer">
      <div className="container-px py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/brand/icon.png" alt="Cactus Jack Brasil" className="h-10 w-10 object-contain" />
              <span className="font-display font-extrabold text-bone uppercase tracking-tight">
                Cactus Jack <span className="text-sand">Brasil</span>
              </span>
            </Link>
            <p className="mt-5 text-sm text-mute max-w-xs leading-relaxed">
              Concept store de streetwear e sneakers exclusivos do universo Travis Scott. Curadoria premium, experiência de drop.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Youtube, Music2].map((Icon, i) => (
                <button
                  key={i}
                  aria-label="rede social"
                  data-testid={`social-${i}`}
                  className="h-10 w-10 grid place-items-center border border-white/10 text-bone/70 hover:text-sand hover:border-sand transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="eyebrow mb-5">Catálogo</h4>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.name}>
                  <Link to={`/shop?cat=${encodeURIComponent(c.name)}`} className="text-mute hover:text-sand transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="eyebrow mb-5">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="text-mute hover:text-sand transition-colors">Shop</Link></li>
              <li><Link to="/sobre" className="text-mute hover:text-sand transition-colors">Sobre</Link></li>
              <li><Link to="/documentacao" data-testid="footer-docs-link" className="text-mute hover:text-sand transition-colors">Documentation</Link></li>
              <li><Link to="/checkout" className="text-mute hover:text-sand transition-colors">Checkout</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="eyebrow mb-5">Flagship Conceitual</h4>
            <p className="text-sm text-mute leading-relaxed">
              Cactus Jack Brasil - Shopping Iguatemi São Paulo.
              <br />
              Av. Brigadeiro Faria Lima, 2232 · SP
            </p>
            <Link to="/documentacao" data-testid="footer-docs-btn" className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-sand hover:text-bone transition-colors">
              Documentation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted2">Projeto demonstrativo / showcase criado pela Sick Code.</p>
            <p className="text-xs text-muted2">Concept store não oficial. Projeto visual para portfólio.</p>
          </div>
          <a
            href="https://www.sickcode.com.br"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="sickcode-link"
            className="group inline-flex items-center gap-1.5 text-sm text-bone hover:text-sand transition-colors"
          >
            Developed by <span className="font-semibold">José Ferreira / Sick Code</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
