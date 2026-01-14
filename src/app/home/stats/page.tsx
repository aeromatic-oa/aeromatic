"use client";

import { useEffect, useState } from "react";
import { useUserSpaces } from "@/lib/useUserSpaces";
import { useSelectedSpace } from "@/lib/useSelectedSpace";
import { useSpaceDevices } from "@/lib/useSpaceDevices";
import TelemetryChart from "@/components/TelemetryChart";
import RoomsTabs from "@/components/RoomsTabs";

export default function StatsPage() {
  // 1) SPACES del usuario
  const { spaces, loading: loadingSpaces, refetch } = useUserSpaces();

  // 2) espacio seleccionado
  const { selectedSpaceId, setSelectedSpaceId } = useSelectedSpace(spaces);

  // 3) devices de ese espacio
  const { devices, loading: loadingDevices } = useSpaceDevices(selectedSpaceId);

  // 4) device seleccionado
  const [activeDeviceIdx, setActiveDeviceIdx] = useState(0);

  const selectedDevice =
    devices.length > 0 ? devices[activeDeviceIdx] : undefined;

  // tabs de arriba → SPACES
  const tabItems = loadingSpaces
    ? ["Cargando..."]
    : spaces.map((s: any) => s.name);

  return (
    <section className="relative min-h-dvh text-white">
      {/* Fondo */}
      <div className="fixed inset-0 -z-10">
        <div
          className="
            absolute inset-0
            bg-[url('/background.png')] bg-no-repeat bg-cover
            bg-center md:bg-center
            transform-gpu origin-center
            scale-[1.10] sm:scale-[1.05] md:scale-100
            transition-transform duration-300
          "
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Tabs de espacios */}
      <div className="relative z-10 flex justify-center px-4 pt-5">
        <RoomsTabs
          items={tabItems}
          active={
            selectedSpaceId
              ? spaces.findIndex((s: any) => s.id === selectedSpaceId)
              : 0
          }
          onChangeActive={(idx) => {
            const space = spaces[idx];
            if (space) {
              setSelectedSpaceId(space.id);
            }
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 py-8">
        <div className="min-h-[calc(100dvh-230px)]">
          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Estadísticas de Sensores
            </h1>
            <p className="text-white/60">
              Visualiza el histórico completo de los sensores de tu dispositivo
            </p>
          </div>

          {/* Selector de dispositivos */}
          {loadingDevices ? (
            <div className="text-white/80 text-sm mb-6">
              Cargando dispositivos...
            </div>
          ) : devices.length > 0 ? (
            <div className="mb-8">
              <p className="text-white/80 text-sm mb-3">Selecciona un dispositivo:</p>
              <div className="flex gap-3 flex-wrap">
                {devices.map((d: any, i: number) => (
                  <button
                    key={d.device_id}
                    onClick={() => setActiveDeviceIdx(i)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      i === activeDeviceIdx
                        ? "bg-white/90 text-slate-900 font-semibold"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-white/60 text-sm mb-6">
              No hay dispositivos en este espacio
            </div>
          )}

          {/* Gráfico de telemetría */}
          {selectedDevice ? (
            <TelemetryChart deviceId={selectedDevice.device_id} />
          ) : (
            <div className="flex items-center justify-center h-96 text-white/60">
              Selecciona un dispositivo para ver sus datos
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
