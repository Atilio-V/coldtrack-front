import React, { useState, useMemo } from "react";
import { Snowflake, Search, RefreshCw, Filter, Sparkles, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { EquipmentCard } from "@/components/dashboard/EquipmentCard";
import { AnalysisModal } from "@/components/modals/AnalysisModal";
import { TelemetryModal } from "@/components/modals/TelemetryModal";

import { runDiagnosis } from "@/services/n8nService";
import { processedData } from "@/data/mockData";

export default function Dashboard() {
  // --- Estados ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Estado para rastrear qué equipos ya tienen orden creada
  const [ordersCreated, setOrdersCreated] = useState([]);

  // Estados de Modales
  const [selectedTelemetry, setSelectedTelemetry] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Estado de Análisis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- Lógica de Negocio ---
  const filteredEquipos = useMemo(() => {
    return processedData.filter((eq) => {
      const matchesSearch =
        eq.device_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.modelo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" || eq.estado === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const kpis = useMemo(() => {
    const total = processedData.length;
    const fallas = processedData.filter(
      (e) => e.estado === "Posible Falla"
    ).length;
    const avgTemp =
      processedData.reduce(
        (acc, curr) => acc + curr.telemetry.thermal.internal_temp_c,
        0
      ) / total;
    return { total, fallas, avgTemp: avgTemp.toFixed(1) };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const onAnalyzeRequest = async (equipo) => {
    setSelectedAnalysis(equipo);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const output = await runDiagnosis(equipo.telemetry);
      setAnalysisResult(output);
    } catch {
      setAnalysisResult({
        primary_diagnosis: "Error de conexión",
        reasoning: "No se pudo conectar con el orquestador n8n. Verifica tus credenciales o el estado del webhook.",
        isError: true,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOrderSuccess = (deviceId) => {
    setOrdersCreated((prev) => [...prev, deviceId]);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:px-12 max-w-[1440px] w-full mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Monitor de Activos IoT
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supervisión predictiva en tiempo real y gestión de telemetría de frío.
              </p>
            </div>
          </div>
        </div>
        <StatsOverview {...kpis} />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-surface/90 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Buscar por ID, modelo o ubicación..."
            className="pl-9 bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-blue-500 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-surface border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 z-50">
              <SelectItem value="todos">Todos los Estados</SelectItem>
              <SelectItem value="Operativo">Solo Operativos</SelectItem>
              <SelectItem value="Posible Falla">Posible Falla</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="gap-2 bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
            onClick={handleRefresh}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin text-blue-500 dark:text-cyan-400" : ""}`}
            />
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
          <span>Mostrando {filteredEquipos.length} equipos registrados</span>
          <span className="text-[11px] font-mono text-blue-600 dark:text-cyan-400">
            Nodo Central Tucumán
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipos.map((equipo) => (
            <EquipmentCard
              key={equipo.device_id}
              data={equipo}
              hasOrder={ordersCreated.includes(equipo.device_id)}
              onViewTelemetry={() => setSelectedTelemetry(equipo)}
              onAnalyze={() => onAnalyzeRequest(equipo)}
            />
          ))}
        </div>
      </div>

      {/* Modales */}
      <TelemetryModal
        isOpen={!!selectedTelemetry}
        onClose={() => setSelectedTelemetry(null)}
        data={selectedTelemetry}
      />

      <AnalysisModal
        isOpen={!!selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
        equipment={selectedAnalysis}
        isAnalyzing={isAnalyzing}
        result={analysisResult}
        onOrderSuccess={() => handleOrderSuccess(selectedAnalysis?.device_id)}
      />
    </div>
  );
}
