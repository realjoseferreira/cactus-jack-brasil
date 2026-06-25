import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Barcode, QrCode, Lock, Tag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { brl } from "@/lib/format";

const PAYMENTS = [
  { id: "card", label: "Cartão de Crédito", icon: CreditCard, note: "até 12x" },
  { id: "pix", label: "Pix", icon: QrCode, note: "5% off" },
  { id: "boleto", label: "Boleto", icon: Barcode, note: "à vista" },
];

function Field({ label, testid, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] uppercase tracking-[0.15em] text-muted2">{label}</span>
      <input
        {...props}
        data-testid={testid}
        className="mt-1.5 w-full bg-surface border border-white/10 px-4 py-3 text-sm text-bone placeholder:text-muted2 focus:outline-none focus:border-sand transition-colors"
      />
    </label>
  );
}

export default function Checkout() {
  const { items, subtotal, discount, shipping, total, coupon, applyCoupon, clear } = useCart();
  const navigate = useNavigate();
  const [pay, setPay] = useState("pix");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 container-px text-center" data-testid="checkout-empty">
        <h1 className="font-display text-4xl text-bone">Sua sacola está vazia</h1>
        <p className="text-mute mt-3">Adicione peças para finalizar a compra.</p>
        <Link to="/shop" className="btn-sand mt-8">Explorar Coleção</Link>
      </div>
    );
  }

  const onCoupon = () => {
    if (applyCoupon(code)) toast.success("Cupom aplicado!");
    else toast.error("Cupom inválido");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const order = {
      id: "CJB-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      total,
      items: items.length,
      pay,
    };
    setTimeout(() => {
      clear();
      navigate("/sucesso", { state: order });
    }, 1100);
  };

  return (
    <div className="pt-20 lg:pt-24 pb-24" data-testid="checkout-page">
      <div className="container-px">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted2 hover:text-sand mb-8">
          <ArrowLeft className="h-4 w-4" /> Continuar comprando
        </Link>
        <h1 className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter text-bone mb-10">Checkout</h1>

        <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Personal */}
            <section>
              <h2 className="font-display font-bold text-lg text-bone mb-5 flex items-center gap-2"><span className="text-sand">01</span> Dados Pessoais</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome completo" testid="field-name" required placeholder="José Ferreira" className="sm:col-span-2" />
                <Field label="E-mail" testid="field-email" type="email" required placeholder="voce@email.com" />
                <Field label="Telefone" testid="field-phone" required placeholder="(11) 99999-9999" />
                <Field label="CPF" testid="field-cpf" required placeholder="000.000.000-00" />
              </div>
            </section>

            {/* Address */}
            <section>
              <h2 className="font-display font-bold text-lg text-bone mb-5 flex items-center gap-2"><span className="text-sand">02</span> Endereço de Entrega</h2>
              <div className="grid gap-4 sm:grid-cols-6">
                <Field label="CEP" testid="field-cep" required placeholder="00000-000" className="sm:col-span-2" />
                <Field label="Endereço" testid="field-address" required placeholder="Av. Brigadeiro Faria Lima" className="sm:col-span-4" />
                <Field label="Número" testid="field-number" required placeholder="2232" className="sm:col-span-2" />
                <Field label="Bairro" testid="field-district" required placeholder="Jardim Paulistano" className="sm:col-span-2" />
                <Field label="Cidade" testid="field-city" required placeholder="São Paulo" className="sm:col-span-2" />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-display font-bold text-lg text-bone mb-5 flex items-center gap-2"><span className="text-sand">03</span> Pagamento</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {PAYMENTS.map((p) => {
                  const Icon = p.icon;
                  const active = pay === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPay(p.id)}
                      data-testid={`pay-${p.id}`}
                      className={`flex flex-col items-start gap-2 border p-4 text-left transition-all ${active ? "border-sand bg-surface" : "border-white/10 hover:border-white/30"}`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <Icon className={`h-5 w-5 ${active ? "text-sand" : "text-mute"}`} />
                        {active && <Check className="h-4 w-4 text-sand" />}
                      </div>
                      <span className="text-sm text-bone font-medium">{p.label}</span>
                      <span className="text-[11px] text-muted2 uppercase tracking-wide">{p.note}</span>
                    </button>
                  );
                })}
              </div>
              {pay === "card" && (
                <div className="mt-4 grid gap-4 sm:grid-cols-6">
                  <Field label="Número do cartão" testid="field-card" placeholder="0000 0000 0000 0000" className="sm:col-span-4" />
                  <Field label="Validade" testid="field-exp" placeholder="MM/AA" className="sm:col-span-1" />
                  <Field label="CVV" testid="field-cvv" placeholder="123" className="sm:col-span-1" />
                </div>
              )}
            </section>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-white/10 bg-surface p-6">
              <h2 className="font-display font-bold text-lg text-bone mb-5">Resumo do Pedido</h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div key={it.key} className="flex gap-3" data-testid={`summary-item-${it.id}`}>
                    <img src={it.image} alt={it.name} className="h-14 w-14 object-contain bg-surface2 p-1 shrink-0" loading="lazy" decoding="async" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-bone line-clamp-2 leading-tight">{it.name}</p>
                      <p className="text-[11px] text-muted2">{it.qty}x{it.size ? ` · ${it.size}` : ""}</p>
                    </div>
                    <span className="text-xs text-bone tabular-nums">{brl(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted2" />
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Cupom (CACTUS10)"
                    data-testid="coupon-input"
                    className="w-full bg-ink border border-white/10 pl-9 pr-3 py-2.5 text-sm text-bone placeholder:text-muted2 focus:outline-none focus:border-sand"
                  />
                </div>
                <button type="button" onClick={onCoupon} data-testid="apply-coupon" className="px-4 text-xs uppercase tracking-wide border border-white/10 text-bone hover:border-sand hover:text-sand transition-colors">
                  Aplicar
                </button>
              </div>

              <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-5 text-sm">
                <div className="flex justify-between text-mute"><span>Subtotal</span><span className="text-bone tabular-nums">{brl(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-sand"><span>Cupom {coupon?.code}</span><span className="tabular-nums">- {brl(discount)}</span></div>}
                <div className="flex justify-between text-mute"><span>Frete</span><span className="text-bone tabular-nums">{shipping === 0 ? "Grátis" : brl(shipping)}</span></div>
                <div className="flex justify-between font-display font-bold text-lg text-bone pt-3 border-t border-white/[0.06]"><span>Total</span><span className="tabular-nums">{brl(total)}</span></div>
              </div>

              {total >= 50000 && (
                <div className="mt-4 border border-sand/30 bg-sand/5 p-3 text-[11px] text-sand uppercase tracking-wide text-center">
                  Voce concorre ao sneaker autografado
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitting}
                data-testid="place-order"
                className="btn-sand w-full mt-6 disabled:opacity-60"
              >
                <Lock className="h-4 w-4" /> {submitting ? "Processando..." : "Finalizar Pedido"}
              </motion.button>
              <p className="text-[11px] text-center text-muted2 mt-3">Checkout demonstrativo · nenhum pagamento real é processado.</p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
