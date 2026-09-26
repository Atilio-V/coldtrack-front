import React, { useState } from "react";
import {
  Bot,
  RefreshCw,
  AlertTriangle,
  MessageSquare,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { createRepairOrder } from "@/services/n8nService";

const ExpandableText = ({ text, limit = 120 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return "Sin detalles adicionales.";
  if (text.length <= limit) return text;

  return (
    <span>
      {isExpanded ? text : `${text.substring(0, limit)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-xs font-semibold text-blue-500 dark:text-cyan-400 hover:underline focus:outline-none"
      >
        {isExpanded ? "Ver menos" : "Ver más"}
      </button>
    </span>
  );
};

export function AnalysisModal({
  isOpen,
  onClose,
  equipment,
  isAnalyzing,
  result,
  onOrderSuccess,
}) {
  const navigate = useNavigate();
  const [orderCreated, setOrderCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrder = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        idEquipo: equipment?.device_id || "Desconocido",
        diagnostico: result?.primary_diagnosis || "Diagnóstico no disponible",
        razonamiento: result?.reasoning || "Sin detalles adicionales",
      };

      await createRepairOrder(payload);

      if (onOrderSuccess) {
        onOrderSuccess();
      }

      setOrderCreated(true);
    } catch (error) {
      console.error("Error al generar la orden:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTimeout(() => setOrderCreated(false), 300);
    onClose();
  };

  const isHighConfidence = result?.confidence_level >= 75;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-surface border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden sm:max-w-lg text-slate-900 dark:text-slate-100">
        {!orderCreated ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400">
                  <Bot className="h-5 w-5" />
                </div>
                Diagnóstico Cognitivo IA
              </DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                {isAnalyzing
                  ? "Analizando telemetría con orquestador n8n..."
                  : `Activo evaluado: ${equipment?.device_id}`}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
              {isAnalyzing ? (
                <div className="text-center py-8 space-y-4">
                  <RefreshCw className="h-10 w-10 text-blue-500 dark:text-cyan-400 animate-spin mx-auto" />
                  <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
                    Consultando modelo de Machine Learning y n8n...
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-4 text-left">
                  {/* Tarjeta de Diagnóstico Principal */}
                  <div
                    className={`border p-4 rounded-xl ${
                      result.isError
                        ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50"
                        : "bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50"
                    }`}
                  >
                    <h4
                      className={`font-bold flex items-center gap-2 text-sm ${
                        result.isError
                          ? "text-red-700 dark:text-red-400"
                          : "text-blue-800 dark:text-cyan-300"
                      }`}
                    >
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{result.primary_diagnosis || "Diagnóstico no disponible"}</span>
                    </h4>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-blue-200/40 dark:border-blue-800/40">
                      {result.confidence_level && (
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isHighConfidence
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          Confianza: {result.confidence_level}%
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {isHighConfidence
                          ? "Alta certeza predictiva"
                          : "Requiere validación técnica"}
                      </span>
                    </div>
                  </div>

                  {/* Razonamiento */}
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-xs text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                      Razonamiento Técnico:
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <ExpandableText text={result.reasoning} limit={150} />
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {!isAnalyzing && result && (
                <>
                  <Button
                    variant="outline"
                    className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>

                  {isHighConfidence ? (
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2 shadow-md shadow-blue-500/20"
                      onClick={handleCreateOrder}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      {isSubmitting
                        ? "Generando Orden..."
                        : "Generar Orden de Reparación"}
                    </Button>
                  ) : (
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md shadow-blue-500/20"
                      onClick={() =>
                        navigate("/chat", {
                          state: {
                            context: {
                              equipmentId: equipment?.device_id,
                              diagnosis: result?.primary_diagnosis,
                              confidence: result?.confidence_level,
                              reasoning: result?.reasoning,
                              questions: Array.isArray(
                                result?.questions_for_client
                              )
                                ? result.questions_for_client.join(" | ")
                                : "Sin preguntas específicas",
                            },
                          },
                        })
                      }
                    >
                      <MessageSquare className="h-4 w-4 text-cyan-300" />
                      Consultar Agente Investigador
                    </Button>
                  )}
                </>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                ¡Orden Generada con Éxito!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[85%] mx-auto leading-relaxed">
                La Orden de Reparación{" "}
                <strong className="font-mono text-blue-600 dark:text-cyan-400">
                  #ORD-{Math.floor(Math.random() * 10000)}
                </strong>{" "}
                ha sido procesada por el orquestador n8n y enviada al proveedor asignado.
              </p>
            </div>
            <div className="pt-2">
              <Button
                className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white w-full sm:w-auto min-w-[180px]"
                onClick={handleClose}
              >
                Entendido, Cerrar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
