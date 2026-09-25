import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Snowflake,
  LayoutDashboard,
  Bot,
  ClipboardList,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Activity,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = location.pathname === "/login";

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Asistente IA",
      path: "/chat",
      icon: Bot,
      badge: "IA",
    },
    {
      name: "Órdenes",
      path: "/ordenes",
      icon: ClipboardList,
    },
  ];

  const getInitials = (name, email) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return "US";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-250 bg-white/80 border-slate-200/80 dark:bg-[#080d1a]/85 dark:border-slate-800/80 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              to={isAuthenticated ? "/dashboard" : "/"}
              className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.01]"
            >
              <img src="/coldtrack.svg" alt="ColdTrack Logo" className="h-20 w-auto object-contain" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-chakra text-base sm:text-lg font-black tracking-tight">
                    <span className="bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-cyan-400 bg-clip-text text-transparent">Cold</span>
                    <span className="text-blue-600 dark:text-cyan-400 underline decoration-blue-500 dark:decoration-cyan-400 underline-offset-4">Track</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-md text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-cyan-300 border border-blue-500/20">
                    IoT Pro
                  </span>
                </div>
                <span className="hidden sm:block text-[9px] font-medium text-slate-500 dark:text-slate-400 tracking-wider">
                  GESTIÓN INTELIGENTE DE FRÍO
                </span>
              </div>
            </Link>

            {/* IoT Live Status Badge (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 dark:bg-emerald-950/40 dark:border-emerald-500/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                Telemetría en Vivo
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800/80">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${isActive
                      ? "bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/60"
                      }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-600 dark:text-cyan-200" : ""}`} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1 py-0.2 rounded-sm uppercase ${isActive
                        ? "bg-blue-100 text-blue-800 dark:bg-white/20 dark:text-white"
                        : "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-cyan-400"
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200"
              title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Authenticated User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* User Pill */}
                <div className="hidden sm:flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-xs">
                    {getInitials(user?.name, user?.email)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 line-clamp-1 leading-tight">
                      {user?.name || "Cliente"}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-medium leading-tight">
                      {user?.role === "client" ? "Panel Cliente" : "Administrador"}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1.5 transition-colors duration-200"
                  title="Cerrar Sesión"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs font-medium">Salir</span>
                </Button>
              </div>
            ) : (
              !isLoginPage && (
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md shadow-blue-500/20 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]">
                    Acceso Portal
                  </Button>
                </Link>
              )
            )}

            {/* Mobile Hamburger Toggle */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-slate-200 dark:border-slate-800 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {/* User info on mobile */}
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                {getInitials(user?.name, user?.email)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name || "Cliente"}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email || "cliente@coldtrack.com"}
                </span>
              </div>
            </div>

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-white/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
