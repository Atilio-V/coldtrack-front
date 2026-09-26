import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Truck,
  ExternalLink,
  Bot,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockOrders = [
    {
      id: "ORD-8492",
      deviceId: "REF-TUC-002",
      model: "Visicooler 500L",
      location: "Supermercado Norte - Las Talitas",
      diagnosis: "Fuga de Gas Refrigerante R134a",
      supplier: "Frío Express S.A.",
      status: "Cotización Aprobada",
      priority: "Alta",
      createdAt: "2026-09-24 18:30",
      costEstimate: "$48,500 ARS",
    },
    {
      id: "ORD-7321",
      deviceId: "REF-TUC-003",
      model: "Freezer Horizontal",
      location: "Almacén Don Pepe - San Miguel",
      diagnosis: "Compresor Trabado / Sobrecorriente",
      supplier: "Servicios Térmicos del Norte",
      status: "Técnico Asignado",
      priority: "Crítica",
      createdAt: "2026-09-24 16:15",
      costEstimate: "$92,000 ARS",
    },
    {
      id: "ORD-5190",
      deviceId: "REF-TUC-001",
      model: "Visicooler 1 Puerta",
      location: "Kiosco El Paso - Yerba Buena",
      diagnosis: "Mantenimiento Preventivo / Limpieza",
      supplier: "Refrigeración Tucumán SRL",
      status: "Completada",
      priority: "Normal",
      createdAt: "2026-09-22 10:00",
      costEstimate: "$25,000 ARS",
    },
  ];

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completada":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> {status}
          </span>
        );
      case "Técnico Asignado":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            <Truck className="w-3 h-3" /> {status}
          </span>
        );
      case "Cotización Aprobada":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 border border-slate-500/20">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:px-12 max-w-[1440px] w-full mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 border border-blue-500/20">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Órdenes de Reparación
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Seguimiento de órdenes automáticas gestionadas mediante n8n RPA y proveedores B2B.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/20 text-[10px]">
            <Bot className="w-3 h-3 mr-1" /> Bot B2B Activo
          </Badge>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center bg-surface/90 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-md">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder="Buscar por ID de orden, equipo o proveedor..."
            className="pl-9 bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className="group relative overflow-hidden transition-all duration-300 border-slate-200/80 dark:border-slate-800/80 bg-surface/95 hover:shadow-xl hover:-translate-y-1 backdrop-blur-md rounded-2xl"
          >
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />

            <CardHeader className="pb-3 pt-4 px-5 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-cyan-400">
                  {order.id}
                </span>
              </div>
              {getStatusBadge(order.status)}
            </CardHeader>

            <CardContent className="pt-4 px-5 space-y-3.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  Equipo / Modelo
                </span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                  {order.deviceId} • {order.model}
                </p>
                <p className="text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {order.location}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  Diagnóstico Registrado
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {order.diagnosis}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">
                    Proveedor
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {order.supplier}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">
                    Estimación
                  </span>
                  <p className="font-mono font-bold text-slate-900 dark:text-cyan-300">
                    {order.costEstimate}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Creada: {order.createdAt}</span>
                <span className="font-medium text-blue-600 dark:text-cyan-400 flex items-center gap-1 cursor-pointer hover:underline">
                  Ver detalle <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
