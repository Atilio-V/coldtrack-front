import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-250 selection:bg-blue-500 selection:text-white relative">
      {/* Background ambient lighting in dark mode */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 dark:block hidden opacity-35">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <Navbar />
      
      {/* Main content viewport */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
