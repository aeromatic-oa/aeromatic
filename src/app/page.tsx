"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LandingPage from "@/components/LandingPage";

export default function RootPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Hay sesión válida → redirigir a /home
          localStorage.setItem("sb_session", JSON.stringify(data.session));
          setIsAuth(true);
          router.replace("/home");
        } else {
          // No hay sesión → mostrar landing page
          localStorage.removeItem("sb_session");
          setIsAuth(false);
          setChecking(false);
        }
      } catch (error) {
        // Error al verificar → mostrar landing page
        localStorage.removeItem("sb_session");
        setIsAuth(false);
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Mostrar pantalla de carga mientras verifica
  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Mostrar landing page para usuarios no autenticados
  if (!isAuth) {
    return <LandingPage />;
  }

  return null;
}
