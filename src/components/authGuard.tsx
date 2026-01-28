// src/components/AuthGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // No hay sesión, redirigir a la página principal
        localStorage.removeItem("sb_session");
        router.replace("/");
        return;
      } else {
        // Hay sesión válida
        localStorage.setItem("sb_session", JSON.stringify(data.session));
        setIsAuthenticated(true);
      }
      setReady(true);
    };
    check();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        localStorage.removeItem("sb_session");
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Mostrar loading mientras verifica
  if (!ready) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya se está redirigiendo)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-white text-black">
      {children}
    </div>
  );
}
