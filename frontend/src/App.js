import "@/index.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const Shop = lazy(() => import("@/pages/Shop"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Success = lazy(() => import("@/pages/Success"));
const About = lazy(() => import("@/pages/About"));
const Documentation = lazy(() => import("@/pages/Documentation"));

function RouteFallback() {
  return (
    <div className="pt-32 pb-24 container-px">
      <div className="h-2 w-28 bg-sand/40 animate-pulse" />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/shop"
              element={<Suspense fallback={<RouteFallback />}><Shop /></Suspense>}
            />
            <Route
              path="/produto/:id"
              element={<Suspense fallback={<RouteFallback />}><ProductDetail /></Suspense>}
            />
            <Route
              path="/checkout"
              element={<Suspense fallback={<RouteFallback />}><Checkout /></Suspense>}
            />
            <Route
              path="/sucesso"
              element={<Suspense fallback={<RouteFallback />}><Success /></Suspense>}
            />
            <Route
              path="/sobre"
              element={<Suspense fallback={<RouteFallback />}><About /></Suspense>}
            />
            <Route
              path="/documentacao"
              element={<Suspense fallback={<RouteFallback />}><Documentation /></Suspense>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
