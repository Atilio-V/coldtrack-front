import React from "react";
import { Activity, Thermometer, Zap, Settings, DoorOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function TelemetryModal({ isOpen, onClose, data }) {
  if (!data) return null;

  const { telemetry } = data;

  const icons = {
    thermal: <Thermometer className="h-4 w-4 text-cyan-500" />,
    electrical: <Zap className="h-4 w-4 text-amber-400" />,
    mechanical: <Settings className="h-4 w-4 text-blue-400" />,
    operational: <DoorOpen className="h-4 w-4 text-emerald-400" />,
  };

  const titles = {
    thermal: "Térmico",
    electrical: "Eléctrico",
    mechanical: "Mecánico",
    operational: "Operacional",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface border-slate-200 dark:border-slate-800 max-w-2xl max-h-[85vh] overflow-y-auto text-slate-900 dark:text-slate-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Activity className="h-5 w-5 text-blue-500 dark:text-cyan-400" />
            Telemetría en Tiempo Real:{" "}
            <span className="font-mono text-blue-600 dark:text-cyan-300">{data.device_id}</span>
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Lecturas de sensores IoT • Última sincronización:{" "}
            {new Date(data.timestamp).toLocaleTimeString()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Object.keys(telemetry).map((category) => (
            <div
              key={category}
              className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/70 dark:bg-slate-900/50"
            >
              <h4 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 mb-3 capitalize text-sm">
                {icons[category]} {titles[category] || category}
              </h4>
              <ul className="space-y-2 text-xs">
                {Object.entries(telemetry[category]).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center py-1 border-b border-slate-200/50 dark:border-slate-800/60 last:border-0">
                    <span className="text-slate-500 dark:text-slate-400 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            className="border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
