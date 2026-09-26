import React, { useState, useEffect } from "react";
import {
  Clock,
  ShieldCheck,
  Activity,
  TrendingUp,
  Thermometer,
  BrainCircuit,
  Bot,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  const [isOnline, setIsOnline] = useState(true);
  const [showAssistant, setShowAssistant] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFlow = () => {
    const section = document.getElementById("flujo-hiperautomatizacion");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-250 overflow-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative px-4 py-12 sm:py-16 lg:py-20 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {/* Background Decorative Blur Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOnline ? "bg-emerald-400" : "bg-cyan-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isOnline ? "bg-emerald-500" : "bg-cyan-500"
                }`}
              />
            </span>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Red IoT ColdTrack:{" "}
              <span className="text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                100% OPERATIVA
              </span>
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              De Reactivo a Predictivo: <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
                El Futuro del Mantenimiento en Frío
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Diagnóstico cognitivo con IA y gestión automatizada de proveedores. Reduzca el tiempo de inactividad de equipos de frío de <strong className="text-slate-900 dark:text-white font-bold">5 días a menos de 4 horas</strong>.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-4 text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] gap-1.5"
            >
              <span>Acceder al Portal</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={scrollToFlow}
              variant="outline"
              className="w-full sm:w-auto border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 px-6 py-4 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              Conocer Flujo n8n
            </Button>
          </div>
        </div>
      </section>

      {/* ========== BENTO GRID - METRICS ========== */}
      <section className="px-4 py-12 sm:py-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Resultados de Impacto Operativo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Métricas reales impulsadas por la arquitectura de telemetría e hiperautomatización de ColdTrack.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={<Clock className="h-4 w-4 text-blue-500 dark:text-cyan-400" />}
              label="Tiempo de Ciclo"
              value="4 Horas"
              subtext="Antes del sistema: 5 días"
              gradient="from-blue-500/10"
            />
            <MetricCard
              icon={<ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />}
              label="Tasa de Error"
              value="0.5%"
              subtext="Diagnóstico por IA predictiva"
              gradient="from-emerald-500/10"
            />
            <MetricCard
              icon={<Activity className="h-4 w-4 text-cyan-500 dark:text-cyan-300" />}
              label="Activos Monitoreados"
              value="1,240+"
              subtext="Equipos de frío en red"
              gradient="from-cyan-500/10"
            />
            <MetricCard
              icon={<TrendingUp className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />}
              label="Visitas Evitadas"
              value="85%"
              subtext="Filtro de falsos positivos"
              gradient="from-indigo-500/10"
            />
          </div>
        </div>
      </section>

      {/* ========== HYPERAUTOMATION FLOW - 3 COLUMNS ========== */}
      <section
        id="flujo-hiperautomatizacion"
        className="px-4 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center space-y-1.5">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/20 px-2.5 py-0.5 text-[10px]">
              Flujo Integrado
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Hiperautomatización en 3 Pasos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              De la anomalía física en el refrigerador a la orden emitida sin fricción humana.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Phase 1: IoT */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface/90 p-5 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 dark:bg-blue-500/20 p-2.5 text-blue-600 dark:text-cyan-400">
                <Thermometer className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block mb-0.5">
                Fase 1 • Telemetría IoT
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Detección Proactiva
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sensores térmicos, eléctricos y de vibración capturan anomalías en tiempo real y disparan webhooks instantáneos.
              </p>
            </div>

            {/* Phase 2: AI */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface/90 p-5 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 dark:bg-purple-500/20 p-2.5 text-purple-600 dark:text-purple-400">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-0.5">
                Fase 2 • Machine Learning & n8n
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Diagnóstico Cognitivo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                La IA analiza el patrón de falla (gas, compresor, desescarche) determinando el diagnóstico y el nivel de certeza.
              </p>
            </div>

            {/* Phase 3: RPA */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface/90 p-5 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 p-2.5 text-emerald-600 dark:text-emerald-400">
                <Bot className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                Fase 3 • Orquestación B2B
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Gestión RPA Automática
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El bot administrativo despacha la orden de reparación al proveedor homologado, reduciendo tiempos de espera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FLOATING ASSISTANT BUTTON ========== */}
      <button
        onClick={() => setShowAssistant(!showAssistant)}
        className="fixed bottom-6 right-6 h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center z-50 transition-all duration-300 hover:scale-105"
        aria-label="Abrir asistente ColdTrack"
      >
        <MessageSquare className="h-5 w-5 text-white" />
      </button>

      {/* Floating Dialog */}
      {showAssistant && (
        <div className="fixed bottom-20 right-6 z-50 animate-in slide-in-from-bottom-2 duration-200">
          <div className="w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface p-3.5 shadow-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Asistente ColdTrack
              </span>
              <button
                onClick={() => setShowAssistant(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              ¿Necesitas evaluar un equipo con ruido inusual o temperatura elevada?
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-xl h-8"
                onClick={() => navigate("/dashboard")}
              >
                Ir al Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ icon, label, value, subtext, gradient }) {
  return (
    <Card className="border-slate-200/80 dark:border-slate-800/80 bg-surface/90 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 p-4 rounded-2xl relative overflow-hidden backdrop-blur-md">
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${gradient} to-transparent rounded-full blur-lg -z-10`} />
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        {value}
      </p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
        {subtext}
      </p>
    </Card>
  );
}
