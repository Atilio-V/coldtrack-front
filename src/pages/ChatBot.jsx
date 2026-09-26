import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  Loader2,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Construction,
  LayoutDashboard,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { sendChatToAgent } from "@/services/n8nService";

export default function ChatBot() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);

  const context = useMemo(
    () => location.state?.context || {},
    [location.state?.context]
  );

  const hasValidContext = Boolean(context.equipmentId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(!hasValidContext);

  // 1. Al entrar a la vista, asegurar que la página empiece desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Si no tiene contexto, activar el modal
  useEffect(() => {
    if (!hasValidContext) {
      setShowAccessModal(true);
    }
  }, [hasValidContext]);

  // 3. Inicializar saludo del Bot si hay contexto
  useEffect(() => {
    if (!hasValidContext) return;

    let initialText =
      "Hola. Soy el Asistente de Diagnóstico Cognitivo de ColdTrack. ¿En qué puedo ayudarte hoy?";

    if (context.diagnosis) {
      initialText = `❄️ Hemos recibido el reporte del equipo: ${context.equipmentId}.\n\n🔍 Diagnóstico preliminar: ${context.diagnosis}\nPara confirmar la falla con alta precisión, conversemos sobre el comportamiento del equipo.\n\n💬 Puedes responder aquí directamente para profundizar.`;
    }

    setMessages([
      {
        id: 1,
        role: "assistant",
        content: initialText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, [context, hasValidContext]);

  // 4. Auto-scroll suave al final del contenedor de mensajes cuando llegan nuevos textos
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !hasValidContext) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponseText = await sendChatToAgent(userMsg.content, context);

      const botMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: botResponseText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg = {
        id: Date.now() + 1,
        role: "assistant",
        isError: true,
        content:
          "Se perdió la conexión con el motor de IA de n8n. Por favor verifica tu conexión o credenciales.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-3 sm:p-6 space-y-4 animate-in fade-in duration-300 min-h-[calc(100dvh-4rem)]">
      {/* Modal de Acceso Restringido / En Construcción */}
      <Dialog
        open={showAccessModal}
        onOpenChange={(open) => {
          if (!open) {
            navigate("/dashboard");
          }
        }}
      >
        <DialogContent className="bg-surface border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 sm:max-w-md">
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-xs">
              <Construction className="w-6 h-6 animate-pulse" />
            </div>
            <DialogTitle className="text-center text-lg sm:text-xl font-bold">
              Módulo en Construcción • Acceso Contextual
            </DialogTitle>
            <DialogDescription className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              El Asistente de Investigación Cognitiva está en fase activa de desarrollo y opera exclusivamente con el contexto de un equipo en falla.
              <br />
              <br />
              Para iniciar una sesión con el agente, selecciona un equipo desde el <strong>Dashboard</strong> y haz clic en <strong>Diagnóstico IA</strong> &gt; <strong>Consultar Agente Investigador</strong>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl gap-2 font-semibold shadow-md shadow-blue-500/20"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ir al Dashboard de Activos</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Si no hay contexto, mostrar pantalla bloqueada informativa */}
      {!hasValidContext ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-surface/50 backdrop-blur-md">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
            <Bot className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Agente Cognitivo Desconectado
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Selecciona un equipo de refrigeración desde el monitor de telemetría para habilitar el canal de diagnóstico guiado por IA.
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm rounded-xl gap-2 mt-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Seleccionar Equipo en Dashboard</span>
          </Button>
        </div>
      ) : (
        <>
          {/* Encabezado del Chat */}
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Asistente Cognitivo
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-cyan-300 border border-blue-500/20">
                    IA n8n
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {context.equipmentId
                    ? `Contexto Activo: ${context.equipmentId}`
                    : "Soporte General de Frío"}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <Card className="flex-1 flex flex-col overflow-hidden shadow-lg border-slate-200/80 dark:border-slate-800/80 bg-surface/95 backdrop-blur-md rounded-2xl min-h-[460px] md:min-h-[520px]">
            <ScrollArea className="flex-1 p-3 sm:p-6">
              <div className="space-y-4 sm:space-y-5 pb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 sm:gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <Avatar
                      className={`h-7 w-7 sm:h-9 sm:w-9 shrink-0 ${
                        msg.role === "assistant"
                          ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <AvatarFallback className="bg-transparent text-xs font-bold">
                        {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                      </AvatarFallback>
                    </Avatar>

                    {/* Bubble */}
                    <div
                      className={`flex flex-col max-w-[88%] sm:max-w-[75%] ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-xs ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-xs"
                            : msg.isError
                            ? "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900/50 rounded-tl-xs"
                            : "bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-xs"
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5 sm:gap-3">
                    <Avatar className="h-7 w-7 sm:h-9 sm:w-9 shrink-0 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <AvatarFallback className="bg-transparent">
                        <Bot size={16} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-900/90 rounded-2xl rounded-tl-xs border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500 dark:text-cyan-400" />
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Procesando diagnóstico en n8n...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Bottom Input Area */}
            <div className="p-3 sm:p-4 bg-slate-50/90 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Escribe tu consulta o respuesta técnica..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="bg-input border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-blue-500 rounded-xl text-xs sm:text-sm h-10 sm:h-11"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl shadow-md shadow-blue-500/20"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
                ColdTrack AI Copilot • Respuestas asistidas por el flujo de hiperautomatización de n8n.
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
