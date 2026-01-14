"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export default function RootPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // 1. leer del localStorage
    const raw = typeof window !== "undefined" ? localStorage.getItem("sb_session") : null;

    if (raw) {
      // hay sesión → mandarlo a /home
      setIsAuth(true);
      router.replace("/home");
    } else {
      // no hay sesión → mostrar landing page
      setIsAuth(false);
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  // Mostrar landing page para usuarios no autenticados
  if (!isAuth) {
    return <LandingPage />;
  }

  return null;
}
