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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection("inicio")}
            >
              <span className="text-3xl font-bold">
                aero<span className="text-cyan-400">matic</span>
              </span>
              <span className="text-xs text-gray-400 mt-2">by openair</span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="h-0.5 bg-cyan-400 mt-1"
                    />
                  )}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/login")}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
              >
                Iniciar Sesión
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/login")}
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium"
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
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
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
              className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Automatizamos la climatización de tus espacios con ventanas que
              responden a factores ambientales.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contacto")}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group"
              >
                Cotiza tu proyecto hoy
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10">
              <img
                src="/background.png"
                alt="Oficina moderna con ventanas inteligentes"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Ventilación</p>
                  <p className="text-sm font-semibold text-green-400">Óptima</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Control</p>
                  <p className="text-sm font-semibold text-cyan-400">Remoto</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("productos")}
        >
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </section>

      {/* El Problema Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-100">
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
              className="text-4xl font-bold mb-16 text-slate-900"
            >
              El problema
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp className="w-16 h-16" />,
                  title: "Gastos innecesarios",
                  color: "text-cyan-500",
                },
                {
                  icon: <Shield className="w-16 h-16" />,
                  title: "Inseguridad",
                  color: "text-slate-600",
                },
                {
                  icon: <CloudRain className="w-16 h-16" />,
                  title: "Clima impredecible",
                  color: "text-slate-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className={`${item.color}`}>{item.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* La Solución Section */}
      <section className="py-20 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-12 text-center text-slate-900"
            >
              La solución
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft}>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">
                  <span className="text-cyan-500">aeromatic,</span> ventilación
                  cruzada estratégica
                </h3>

                <ul className="space-y-4 text-slate-700">
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
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex items-center gap-6 mt-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">○</span>
                    </div>
                    <span className="text-slate-600 font-medium">alexa</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-red-400 to-green-400 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-600 font-medium">
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
                  className="bg-white rounded-3xl p-8 shadow-xl"
                >
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                    <motion.div
                      animate={{ rotateY: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="w-48 h-64 border-4 border-slate-700 rounded-lg relative bg-gradient-to-br from-blue-200 to-blue-300">
                        <div className="absolute top-0 left-0 right-0 h-1/3 border-b-4 border-slate-700 bg-gradient-to-br from-blue-300 to-blue-400 origin-bottom transform hover:-rotate-12 transition-transform duration-500" />
                      </div>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-200 rounded-lg px-4 py-2 shadow-md"
                      >
                        <Zap className="w-6 h-6 text-slate-600" />
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
      <section className="py-20 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-12 text-center text-slate-900"
            >
              Beneficios
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "ahorro energético",
                  description:
                    "al favorecer la ventilación natural y evitar el uso de aire acondicionado",
                  gradient: "from-cyan-400 to-cyan-500",
                  iconBg: "bg-white/20",
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "tranquilidad total",
                  description:
                    "al proteger tu hogar de lluvias inesperadas y control desde cualquier lugar",
                  gradient: "from-cyan-500 to-cyan-600",
                  iconBg: "bg-white/20",
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "escalabilidad",
                  description:
                    "al integrarse a sistemas residenciales y comerciales para una gestión centralizada",
                  gradient: "from-slate-700 to-slate-800",
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
                    className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-6 h-full shadow-xl hover:shadow-2xl transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div
                        className={`${item.iconBg} rounded-xl p-2 text-white`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
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
      <section id="productos" className="py-20 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-4 text-center"
            >
              Nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Productos
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            >
              Soluciones inteligentes para cada tipo de espacio
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Home className="w-12 h-12" />,
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
                  icon: <Building2 className="w-12 h-12" />,
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
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 mb-6">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-cyan-400"
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
      <section id="proyectos" className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold mb-4 text-center"
            >
              Proyectos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Destacados
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            >
              Conoce algunos de nuestros proyectos más recientes
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
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
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
                >
                  <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-cyan-400/30 group-hover:text-cyan-400/50 transition-colors" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-cyan-400 font-medium">
                      {project.type}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400">{project.windows}</p>
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
        className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950"
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
              className="text-4xl font-bold mb-12 text-left"
            >
              Contáctanos
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.form
                variants={slideInLeft}
                className="space-y-6"
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
                    <label className="block text-gray-300 mb-2 text-sm">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b-2 border-gray-600 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Cuéntanos más
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe tu proyecto..."
                    className="w-full bg-slate-800/50 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <Send className="w-4 h-4" />
                  Enviar
                </motion.button>
              </motion.form>

              {/* Social & Contact Info */}
              <motion.div variants={slideInRight} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Instagram className="w-8 h-8" />, link: "#" },
                    { icon: <Facebook className="w-8 h-8" />, link: "#" },
                    { icon: <Youtube className="w-8 h-8" />, link: "#" },
                    { icon: <Twitter className="w-8 h-8" />, link: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8">
                  <motion.a
                    href="mailto:aeromatic.openair@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className="text-lg text-gray-300 hover:text-cyan-400 transition-colors block"
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
      <footer className="py-8 px-4 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              aero<span className="text-cyan-400">matic</span>
            </span>
            <span className="text-xs text-gray-500">by openair</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Aeromatic. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
