"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Thermometer, Droplets, Activity, Wind } from "lucide-react";

type TelemetryData = {
  id: number;
  device_id: string | null;
  ts: string | null;
  temp_in: number | null;
  temp_out: number | null;
  hum_in: number | null;
  hum_out: number | null;
  gases: number | null;
  movimiento: boolean | null;
  obstaculo: number | null;
  lluvia: number | null;
  raw: any;
};

// Datos mock para testing
const mockData: TelemetryData[] = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  device_id: "mock-device",
  ts: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
  temp_in: 22 + Math.sin(i / 4) * 3 + Math.random() * 2,
  temp_out: 18 + Math.sin(i / 5) * 4 + Math.random() * 2,
  hum_in: 45 + Math.sin(i / 6) * 15 + Math.random() * 5,
  hum_out: 55 + Math.sin(i / 7) * 20 + Math.random() * 5,
  gases: 400 + Math.sin(i / 8) * 50 + Math.random() * 20,
  movimiento: false,
  obstaculo: 0,
  lluvia: 0,
  raw: null,
}));

type Props = {
  deviceId?: string;
};

export default function TelemetryChart({ deviceId }: Props) {
  const [data, setData] = useState<TelemetryData[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<
    "temp" | "humidity" | "gases"
  >("temp");

  useEffect(() => {
    if (!deviceId) {
      setData(mockData);
      return;
    }

    const loadTelemetry = async () => {
      setLoading(true);
      try {
        const { data: telemetry, error } = await supabase
          .from("telemetry")
          .select("*")
          .eq("device_id", deviceId)
          .order("ts", { ascending: true })
          .limit(100);

        if (error) {
          console.warn("Error cargando telemetría, usando datos mock:", error);
          setData(mockData);
        } else if (telemetry && telemetry.length > 0) {
          setData(telemetry as TelemetryData[]);
        } else {
          setData(mockData);
        }
      } catch (err) {
        console.warn("Error cargando telemetría, usando datos mock:", err);
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadTelemetry();

    // Suscribirse a nuevos datos
    const channel = supabase
      .channel(`telemetry:${deviceId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "telemetry",
          filter: `device_id=eq.${deviceId}`,
        },
        (payload: any) => {
          setData((prev) => {
            const updated = [...prev, payload.new as TelemetryData];
            return updated.slice(-100);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceId]);

  const chartData = data
    .map((d) => ({
      ts: d.ts ? new Date(d.ts).toLocaleTimeString() : "N/A",
      temp_in: d.temp_in ?? undefined,
      temp_out: d.temp_out ?? undefined,
      hum_in: d.hum_in ?? undefined,
      hum_out: d.hum_out ?? undefined,
      gases: d.gases ?? undefined,
    }))
    .filter((d) => d.ts !== "N/A");

  if (data.length === 0 && loading) {
    return (
      <div className="flex items-center justify-center h-96 text-white/60">
        Cargando histórico de sensores...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-white/60">
        <Activity className="h-12 w-12 mb-2 opacity-50" />
        <p>No hay datos de sensores disponibles</p>
      </div>
    );
  }

  const config = (() => {
    switch (selectedMetric) {
      case "temp":
        return {
          title: "Temperatura (°C)",
          keys: [
            { key: "temp_in", name: "Interior", color: "#ef4444" },
            { key: "temp_out", name: "Exterior", color: "#3b82f6" },
          ],
        };
      case "humidity":
        return {
          title: "Humedad (%)",
          keys: [
            { key: "hum_in", name: "Interior", color: "#f59e0b" },
            { key: "hum_out", name: "Exterior", color: "#06b6d4" },
          ],
        };
      case "gases":
        return {
          title: "Gases (ppm)",
          keys: [{ key: "gases", name: "Valor", color: "#8b5cf6" }],
        };
      default:
        return {
          title: "Temperatura",
          keys: [
            { key: "temp_in", name: "Interior", color: "#ef4444" },
            { key: "temp_out", name: "Exterior", color: "#3b82f6" },
          ],
        };
    }
  })();

  return (
    <div className="w-full space-y-6">
      {/* Botones de métrica */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setSelectedMetric("temp")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            selectedMetric === "temp"
              ? "bg-red-500 text-white"
              : "bg-neutral-700 text-white/70 hover:bg-neutral-600"
          }`}
        >
          <Thermometer className="h-4 w-4" />
          Temperatura
        </button>
        <button
          onClick={() => setSelectedMetric("humidity")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            selectedMetric === "humidity"
              ? "bg-blue-500 text-white"
              : "bg-neutral-700 text-white/70 hover:bg-neutral-600"
          }`}
        >
          <Droplets className="h-4 w-4" />
          Humedad
        </button>
        <button
          onClick={() => setSelectedMetric("gases")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            selectedMetric === "gases"
              ? "bg-purple-500 text-white"
              : "bg-neutral-700 text-white/70 hover:bg-neutral-600"
          }`}
        >
          <Wind className="h-4 w-4" />
          Gases
        </button>
      </div>

      {/* Gráfico */}
      <div className="bg-neutral-800/50 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-4">{config.title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fff1f2" />
            <XAxis
              dataKey="ts"
              stroke="#fff1f2"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#fff1f2" }}
            />
            <YAxis
              stroke="#fff1f2"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#fff1f2" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff1f2" }}
            />
            <Legend
              wrapperStyle={{ color: "#fff1f2" }}
              iconType="line"
              height={20}
            />
            {config.keys.map((item) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                stroke={item.color}
                dot={false}
                name={item.name}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Información */}
      <div className="text-white/60 text-sm">
        <p>Total de registros: {data.length}</p>
        <p>
          Período:
          {data.length > 0 && data[0].ts
            ? ` ${new Date(data[0].ts).toLocaleString()} a ${new Date(
                data[data.length - 1].ts!
              ).toLocaleString()}`
            : " Sin datos"}
        </p>
      </div>
    </div>
  );
}
