import { useState } from "react";
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle, Snowflake, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [formError, setFormError] = useState("");

  // Validación declarativa
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const emailError = touched.email
    ? !email
      ? "El email es requerido"
      : !isEmailValid
      ? "Ingresa un email válido"
      : ""
    : "";

  const isPasswordValid = password.length >= 6;
  const passwordError = touched.password
    ? !password
      ? "La contraseña es requerida"
      : password.length < 6
      ? "Mínimo 6 caracteres"
      : ""
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setTouched({ email: true, password: true });

    if (!isEmailValid || !isPasswordValid) return;

    setIsLoading(true);

    setTimeout(() => {
      if (
        email === "albertorojo@cliente.com" &&
        password === "albertorojo123"
      ) {
        login({
          email: email,
          name: "Alberto Rojo",
          role: "client",
        });
        navigate("/dashboard");
      } else {
        setFormError("Credenciales incorrectas. (Prueba: albertorojo@cliente.com / albertorojo123)");
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleFillDemo = () => {
    setEmail("albertorojo@cliente.com");
    setPassword("albertorojo123");
    setTouched({ email: true, password: true });
    setFormError("");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="w-full max-w-md rounded-3xl bg-surface/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Branding & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 mb-2">
            <Snowflake className="w-6 h-6 animate-cold-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Portal de Clientes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ingresa para gestionar la telemetría y diagnósticos de tus equipos.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
            >
              Email Corporativo
            </label>
            <div className="relative">
              <div
                className={`absolute left-3.5 top-3 transition-colors ${
                  isEmailValid
                    ? "text-emerald-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <User className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched({ ...touched, email: true })}
                placeholder="ejemplo@coldtrack.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-900/70 text-slate-900 dark:text-white outline-none transition-all ${
                  emailError
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : isEmailValid
                    ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
            >
              Contraseña
            </label>
            <div className="relative">
              <div
                className={`absolute left-3.5 top-3 transition-colors ${
                  isPasswordValid
                    ? "text-emerald-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched({ ...touched, password: true })}
                placeholder="Ingresa tu contraseña"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-900/70 text-slate-900 dark:text-white outline-none transition-all ${
                  passwordError
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : isPasswordValid
                    ? "border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {passwordError}
              </p>
            )}
          </div>

          {/* Form Error */}
          {formError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              isLoading ||
              (touched.email && !isEmailValid) ||
              (touched.password && !isPasswordValid)
            }
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.01] gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validando Credenciales...</span>
              </>
            ) : (
              <>
                <span>Ingresar al Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          {/* Demo helper */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline font-medium"
            >
              Completar con credenciales demo (Alberto Rojo)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
