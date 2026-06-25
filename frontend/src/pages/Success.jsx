import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight } from "lucide-react";
import { brl } from "@/lib/format";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="pt-28 pb-28 container-px" data-testid="success-page">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto h-20 w-20 rounded-full bg-sand grid place-items-center"
        >
          <Check className="h-10 w-10 text-ink" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="eyebrow mt-8 mb-3">Pedido confirmado</p>
          <h1 className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter text-bone">Obrigado!</h1>
          <p className="mt-4 text-mute leading-relaxed">
            Seu drop foi reservado com sucesso. Em uma loja real, você receberia a confirmação por e-mail com o rastreio.
          </p>

          <div className="mt-10 border border-white/10 bg-surface p-6 text-left grid grid-cols-2 gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Pedido</p>
              <p className="font-display font-bold text-bone mt-1">{state.id}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Total</p>
              <p className="font-display font-bold text-sand mt-1">{brl(state.total)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Itens</p>
              <p className="text-bone mt-1">{state.items} produto(s)</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted2">Pagamento</p>
              <p className="text-bone mt-1 capitalize">{state.pay}</p>
            </div>
          </div>

          {state.total >= 50000 && (
            <div className="mt-5 border border-sand/30 bg-sand/5 p-4 text-sm text-sand flex items-center justify-center gap-2">
              <Package className="h-4 w-4" /> Você está concorrendo ao sneaker autografado!
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn-sand" data-testid="continue-shopping">
              Continuar comprando <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="btn-ghost">Voltar à Home</Link>
          </div>
          <p className="mt-8 text-[11px] text-muted2 uppercase tracking-[0.2em]">Projeto demonstrativo · Sick Code</p>
        </motion.div>
      </div>
    </div>
  );
}
