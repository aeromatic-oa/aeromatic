"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Wind,
  Zap,
  Shield,
  CloudRain,
  Smartphone,
  Home,
  Building2,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Leaf,
  TrendingUp,
  Heart,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Sun,
  Moon,
} from "lucide-react";

// Animaciones
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function LandingPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Verificar preferencia del sistema o localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detectar sección activa
      const sections = ["inicio", "productos", "proyectos", "contacto"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "productos", label: "Productos" },
    { id: "proyectos", label: "Proyectos" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      darkMode 
        ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white" 
        : "bg-gradient-to-b from-white via-slate-50 to-white text-slate-900"
    }`}>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? darkMode 
              ? "bg-slate-950/90 backdrop-blur-lg shadow-lg shadow-cyan-500/5" 
              : "bg-white/90 backdrop-blur-lg shadow-lg shadow-slate-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-22 md:h-24">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
              onClick={() => scrollToSection("inicio")}
            >
              <img 
                src={darkMode ? "/Logo aeromatic blanco HD.png" : "/Logo aeromatic negro HD.png"} 
                alt="Aeromatic Logo" 
                className="h-16 sm:h-24 md:h-32 w-auto"
              />
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-cyan-500"
                      : darkMode 
                        ? "text-gray-300 hover:text-white" 
                        : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="h-0.5 bg-cyan-500 mt-1"
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode 
                    ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" 
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/login")}
                className="px-4 lg:px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
              >
                Iniciar Sesión
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Dark Mode Toggle Mobile */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? "bg-slate-800 text-yellow-400" 
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`p-2 ${darkMode ? "text-white" : "text-slate-900"}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden backdrop-blur-lg border-t ${
                darkMode 
                  ? "bg-slate-900/95 border-slate-800" 
                  : "bg-white/95 border-slate-200"
              }`}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-3 px-4 rounded-xl transition-colors ${
                      darkMode 
                        ? "text-gray-300 hover:bg-slate-800 hover:text-white" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/login")}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-medium mt-2"
                >
                  Iniciar Sesión
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${
            darkMode 
              ? "bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10" 
              : "bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5"
          }`} />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className={`absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full blur-3xl ${
              darkMode ? "bg-cyan-500/20" : "bg-cyan-500/10"
            }`}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className={`absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 rounded-full blur-3xl ${
              darkMode ? "bg-blue-600/20" : "bg-blue-600/10"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              El futuro de la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ventilación
              </span>{" "}
              natural es{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                inteligente
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Automatizamos la climatización de tus espacios con ventanas que
              responden a factores ambientales.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contacto")}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-base sm:text-lg shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
              >
                Cotiza tu proyecto hoy
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${
              darkMode ? "shadow-cyan-500/20" : "shadow-slate-300"
            }`}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover aspect-video"
              >
                <source src="/intro aeromatic.mp4" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
              <div className={`absolute inset-0 ${
                darkMode 
                  ? "bg-gradient-to-t from-slate-950/30 to-transparent" 
                  : "bg-gradient-to-t from-white/20 to-transparent"
              }`} />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`absolute -top-2 -right-2 sm:-top-4 sm:-right-4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl border ${
                darkMode 
                  ? "bg-slate-800/90 border-slate-700" 
                  : "bg-white/90 border-slate-200"
              }`}
            >
           
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className={`absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl border ${
                darkMode 
                  ? "bg-slate-800/90 border-slate-700" 
                  : "bg-white/90 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                </div>
                <div>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-slate-500"}`}>Control</p>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-500">Remoto</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("productos")}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
        </motion.div>
      </section>

      {/* El Problema Section */}
      <section className={`py-12 sm:py-20 px-4 transition-colors duration-500 ${
        darkMode 
          ? "bg-gradient-to-b from-slate-950 to-slate-900" 
          : "bg-gradient-to-b from-white to-slate-100"
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl font-bold mb-10 sm:mb-16 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              El problema
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16" />,
                  title: "Gastos innecesarios",
                  color: "text-cyan-500",
                },
                {
                  icon: <Shield className="w-12 h-12 sm:w-16 sm:h-16" />,
                  title: "Inseguridad",
                  color: darkMode ? "text-slate-400" : "text-slate-600",
                },
                {
                  icon: <CloudRain className="w-12 h-12 sm:w-16 sm:h-16" />,
                  title: "Clima impredecible",
                  color: darkMode ? "text-slate-400" : "text-slate-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl transition-colors ${
                    darkMode 
                      ? "bg-slate-800/50 hover:bg-slate-800" 
                      : "bg-white hover:bg-slate-50 shadow-lg"
                  }`}
                >
                  <div className={`${item.color}`}>{item.icon}</div>
                  <h3 className={`text-lg sm:text-xl font-semibold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}>
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* La Solución Section */}
      <section className={`py-12 sm:py-20 px-4 transition-colors duration-500 ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              La solución
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div variants={slideInLeft}>
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>
                  <span className="text-cyan-500">aeromatic,</span> ventilación
                  cruzada estratégica
                </h3>

                <ul className={`space-y-3 sm:space-y-4 ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                  {[
                    "Ventanas pivotantes motorizadas con acabados premium.",
                    "Control remoto y programación de horarios por aplicación móvil.",
                    "Modo inteligente con sensores, apertura y cierre automático.",
                    "Integrable a sistemas de climatización y domótica.",
                    "Operadas con asistentes de voz.",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm sm:text-base"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm sm:text-lg">○</span>
                    </div>
                    <span className={`text-sm sm:text-base font-medium ${
                      darkMode ? "text-gray-400" : "text-slate-600"
                    }`}>alexa</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 via-red-400 to-green-400 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className={`text-sm sm:text-base font-medium ${
                      darkMode ? "text-gray-400" : "text-slate-600"
                    }`}>
                      Google Home
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={slideInRight}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl ${
                    darkMode ? "bg-slate-800" : "bg-white"
                  }`}
                >
                  <div className={`aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center ${
                    darkMode 
                      ? "bg-gradient-to-br from-slate-700 to-slate-800" 
                      : "bg-gradient-to-br from-slate-100 to-slate-200"
                  }`}>
                    <motion.div
                      animate={{ rotateY: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="relative"
                    >
                      <div className={`w-32 h-44 sm:w-48 sm:h-64 border-4 rounded-lg relative bg-gradient-to-br from-blue-200 to-blue-300 ${
                        darkMode ? "border-slate-500" : "border-slate-700"
                      }`}>
                        <div className={`absolute top-0 left-0 right-0 h-1/3 border-b-4 bg-gradient-to-br from-blue-300 to-blue-400 origin-bottom transform hover:-rotate-12 transition-transform duration-500 ${
                          darkMode ? "border-slate-500" : "border-slate-700"
                        }`} />
                      </div>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 shadow-md ${
                          darkMode ? "bg-slate-700" : "bg-slate-200"
                        }`}
                      >
                        <Zap className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          darkMode ? "text-cyan-400" : "text-slate-600"
                        }`} />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className={`py-12 sm:py-20 px-4 transition-colors duration-500 ${
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Beneficios
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "ahorro energético",
                  description:
                    "al favorecer la ventilación natural y evitar el uso de aire acondicionado",
                  gradient: "from-cyan-400 to-cyan-500",
                  iconBg: "bg-white/20",
                },
                {
                  icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "tranquilidad total",
                  description:
                    "al proteger tu hogar de lluvias inesperadas y control desde cualquier lugar",
                  gradient: "from-cyan-500 to-cyan-600",
                  iconBg: "bg-white/20",
                },
                {
                  icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
                  title: "escalabilidad",
                  description:
                    "al integrarse a sistemas residenciales y comerciales para una gestión centralizada",
                  gradient: darkMode ? "from-slate-600 to-slate-700" : "from-slate-700 to-slate-800",
                  iconBg: "bg-white/20",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group"
                >
                  <div
                    className={`bg-gradient-to-br ${item.gradient} rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full shadow-xl hover:shadow-2xl transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div
                        className={`${item.iconBg} rounded-lg sm:rounded-xl p-1.5 sm:p-2 text-white`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Productos Section */}
      <section id="productos" className={`py-12 sm:py-20 px-4 transition-colors duration-500 ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-center ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Productos
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Soluciones inteligentes para cada tipo de espacio
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {[
                {
                  icon: <Home className="w-10 h-10 sm:w-12 sm:h-12" />,
                  title: "Residencial",
                  description:
                    "Ventanas inteligentes para hogares modernos con control total desde tu smartphone.",
                  features: [
                    "Control por app",
                    "Sensores de lluvia",
                    "Programación horaria",
                  ],
                },
                {
                  icon: <Building2 className="w-10 h-10 sm:w-12 sm:h-12" />,
                  title: "Comercial",
                  description:
                    "Sistemas de ventilación automatizada para oficinas, hoteles y espacios comerciales.",
                  features: [
                    "Gestión centralizada",
                    "Integración BMS",
                    "Monitoreo remoto",
                  ],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={index === 0 ? slideInLeft : slideInRight}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 border transition-colors group ${
                    darkMode 
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-cyan-500/50" 
                      : "bg-gradient-to-br from-slate-50 to-white border-slate-200 hover:border-cyan-500/50 shadow-lg"
                  }`}
                >
                  <div className="text-cyan-500 mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}>{item.title}</h3>
                  <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${
                    darkMode ? "text-gray-400" : "text-slate-600"
                  }`}>{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, i) => (
                      <span
                        key={i}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                          darkMode 
                            ? "bg-slate-700/50 text-cyan-400" 
                            : "bg-cyan-100 text-cyan-700"
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className={`py-12 sm:py-20 px-4 transition-colors duration-500 ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-center ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Proyectos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Destacados
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={`text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Conoce algunos de nuestros proyectos más recientes
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Torre Corporativa Zona 10",
                  type: "Comercial",
                  windows: "120+ ventanas",
                },
                {
                  title: "Residencial Vista Hermosa",
                  type: "Residencial",
                  windows: "45 ventanas",
                },
                {
                  title: "Hotel Boutique Antigua",
                  type: "Hospitalidad",
                  windows: "80+ ventanas",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border ${
                    darkMode 
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700" 
                      : "bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-lg"
                  }`}
                >
                  <div className={`aspect-video flex items-center justify-center ${
                    darkMode 
                      ? "bg-gradient-to-br from-cyan-900/30 to-blue-900/30" 
                      : "bg-gradient-to-br from-cyan-100/50 to-blue-100/50"
                  }`}>
                    <Building2 className={`w-12 h-12 sm:w-16 sm:h-16 transition-colors ${
                      darkMode 
                        ? "text-cyan-400/30 group-hover:text-cyan-400/50" 
                        : "text-cyan-600/30 group-hover:text-cyan-600/50"
                    }`} />
                  </div>
                  <div className="p-4 sm:p-6">
                    <span className="text-xs text-cyan-500 font-medium">
                      {project.type}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold mt-1 sm:mt-2 mb-1 sm:mb-2 ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs sm:text-sm ${
                      darkMode ? "text-gray-400" : "text-slate-600"
                    }`}>{project.windows}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contacto Section */}
      <section
        id="contacto"
        className={`py-12 sm:py-20 px-4 transition-colors duration-500 ${
          darkMode 
            ? "bg-gradient-to-b from-slate-900 to-slate-950" 
            : "bg-gradient-to-b from-slate-100 to-white"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-left ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Contáctanos
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Form */}
              <motion.form
                variants={slideInLeft}
                className="space-y-4 sm:space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                {[
                  { label: "Nombre", type: "text", placeholder: "Tu nombre" },
                  { label: "Ciudad", type: "text", placeholder: "Tu ciudad" },
                  {
                    label: "Proyecto",
                    type: "text",
                    placeholder: "Tipo de proyecto",
                  },
                  { label: "Correo", type: "email", placeholder: "tu@email.com" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className={`block mb-2 text-sm ${
                      darkMode ? "text-gray-300" : "text-slate-700"
                    }`}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className={`w-full bg-transparent border-b-2 py-2 focus:outline-none transition-colors ${
                        darkMode 
                          ? "border-gray-600 text-white placeholder-gray-500 focus:border-cyan-400" 
                          : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500"
                      }`}
                    />
                  </div>
                ))}
                <div>
                  <label className={`block mb-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-slate-700"
                  }`}>
                    Cuéntanos más
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe tu proyecto..."
                    className={`w-full rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all resize-none ${
                      darkMode 
                        ? "bg-slate-800/50 text-white placeholder-gray-500" 
                        : "bg-slate-100 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4" />
                  Enviar
                </motion.button>
              </motion.form>

              {/* Social & Contact Info */}
              <motion.div variants={slideInRight} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-4 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />, link: "#" },
                    { icon: <Facebook className="w-6 h-6 sm:w-8 sm:h-8" />, link: "#" },
                    { icon: <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />, link: "#" },
                    { icon: <Twitter className="w-6 h-6 sm:w-8 sm:h-8" />, link: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-colors ${
                        darkMode 
                          ? "bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700" 
                          : "bg-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-300"
                      }`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-4 sm:mt-8">
                  <motion.a
                    href="mailto:aeromatic.openair@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className={`text-base sm:text-lg hover:text-cyan-500 transition-colors block ${
                      darkMode ? "text-gray-300" : "text-slate-700"
                    }`}
                  >
                    aeromatic.openair@gmail.com
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 sm:py-8 px-4 border-t transition-colors duration-500 ${
        darkMode 
          ? "bg-slate-950 border-slate-800" 
          : "bg-white border-slate-200"
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <img 
              src={darkMode ? "/Logo aeromatic blanco HD.png" : "/Logo aeromatic negro HD.png"} 
              alt="Aeromatic Logo" 
              className="h-10 sm:h-14 w-auto"
            />
          </div>
          <p className={`text-xs sm:text-sm text-center ${
            darkMode ? "text-gray-500" : "text-slate-500"
          }`}>
            © 2026 Aeromatic. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
