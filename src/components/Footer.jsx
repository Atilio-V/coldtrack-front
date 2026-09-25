import React from "react";
import {
  Snowflake,
  ShieldCheck,
  Activity,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-400 dark:bg-[#050811] dark:border-slate-800/80 dark:text-slate-400 mt-auto transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-6">
          {/* Columna 1: Branding ColdTrack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/coldtrack.svg" alt="ColdTrack Logo" className="h-14 w-auto object-contain" />
              <span className="text-base font-bold text-white tracking-tight">
                ColdTrack
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 uppercase">
                IoT Platform
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">
              Plataforma de hiperautomatización y mantenimiento predictivo en cadena de frío. Conectamos telemetría IoT, diagnóstico cognitivo con IA y orquestación B2B automatizada.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-0.5">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Basic Auth Seguro</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                <span>Telemetría Activa</span>
              </div>
            </div>
          </div>

          {/* Columna 2: TucSoft - Desarrollador */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Desarrollado por
            </h4>
            <div className="space-y-2">
              <a
                href="https://tucsoft.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
              >
                <img
                  src="/TucSoft-Logo.png"
                  alt="TucSoft Logo"
                  className="h-7 w-auto object-contain rounded-md bg-white/10 p-0.5 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h5 className="text-xs font-bold text-white tracking-tight flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                    <span>TucSoft</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h5>
                  <p className="text-[10px] text-cyan-400 font-medium">
                    Software & AI Solutions
                  </p>
                </div>
              </a>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Empresa especializada en soluciones de software, hiperautomatización e inteligencia artificial.
              </p>
              <a
                href="https://tucsoft.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                <span>Visitar sitio web oficial</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Columna 3: Módulos del Sistema */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Módulos del Sistema
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-cyan-400 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <span>Monitor IoT & Diagnóstico</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="hover:text-cyan-400 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <span>Asistente Cognitivo IA</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ordenes"
                  className="hover:text-cyan-400 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <span>Órdenes de Reparación</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contexto Académico e Institucional */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
              Proyecto Institucional
            </h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p>Caso de Negocio: Mantenimiento Preventivo IoT</p>
              <div className="pt-1.5 border-t border-slate-800 space-y-0.5">
                <p className="font-semibold text-slate-300">
                  UTN - Facultad Regional Tucumán
                </p>
                <p className="text-slate-400">
                  TFI • Administración de Recursos • Grupo Nº 18
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior responsive compacta */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} ColdTrack • Desarrollado por{" "}
            <strong className="text-slate-400">TucSoft</strong>.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>UTN - FRT • Grupo Nº 18</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
