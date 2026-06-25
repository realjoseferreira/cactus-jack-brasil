import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SiteBackground from "@/components/SiteBackground";
import { Toaster } from "sonner";

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-ink">
      <SiteBackground />
      <Header />
      <CartDrawer />
      <Toaster
        position="bottom-center"
        theme="dark"
        toastOptions={{ style: { background: "#171513", border: "1px solid rgba(210,196,167,0.3)", color: "#F5F5F0" } }}
      />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
