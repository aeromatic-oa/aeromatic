"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useWindowState(deviceId?: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!deviceId) return;

    let isMounted = true;

    const loadState = async () => {
      const { data } = await supabase
        .from("device")
        .select("is_open")
        .eq("id", deviceId)
        .single();
      if (isMounted && data) setIsOpen(data.is_open);
    };

    loadState();

    const channel = supabase
      .channel(`device:${deviceId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "device",
          filter: `id=eq.${deviceId}`,
        },
        (payload: any) => {
          if (isMounted) setIsOpen(payload.new.is_open);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [deviceId]);

  const toggleWindow = async () => {
    if (!deviceId || loading) return;
    setLoading(true);
    try {
      await supabase
        .from("device")
        .update({ is_open: !isOpen })
        .eq("id", deviceId);
      setIsOpen(!isOpen);
    } finally {
      setLoading(false);
    }
  };

  return { isOpen, toggleWindow, loading };
}
