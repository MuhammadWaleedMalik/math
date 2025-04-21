import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Color Scheme
const colors = {
  primary: "#3A86FF",  // Vibrant blue
  secondary: "#1A1A2E",  // Dark navy
  accent: "#FFBE0B",  // Gold/yellow
  light: "#E6F1FF",  // Light blue
  dark: "#0A0A12",  // Almost black
  background: "#1A1A2E",
  text: "#FFFFFF",
  paragraph: "#CCCCCC",
};

// Website Info
const website = {
  name: "SageMath",
  slogan: "Math and Path – Achieve at Last",
};

// Math symbols for decoration
const mathSymbols = ["∑", "∫", "∏", "√", "∞", "∂", "∇", "±", "≈", "≠", "≡", "∈", "∉", "∩", "∪"];

// Mathematical Features Data
const mathFeatures = [
  {
    id: "symbolic-computation",
    title: "Symbolic Computation",
    description: "Perform algebraic manipulations and symbolic mathematics with precision.",
    imageUrl: "https://c8.alamy.com/comp/WXJAAM/creative-arrangement-of-human-head-and-symbolic-elements-as-a-concept-metaphor-on-subject-of-human-mind-consciousness-imagination-science-and-creat-WXJAAM.jpg",
    path: "/features/symbolic-computation",
    icon: "∑"
  },
  {
    id: "numerical-mathematics",
    title: "Numerical Mathematics",
    description: "Advanced numerical analysis and high-precision calculations.",
    imageUrl: "https://www.cengage.com/covers/imageServlet?image_type=LRGFC&catalog=cengage&productISBN13=9780357670842",
    path: "/features/numerical-mathematics",
    icon: "123"
  },
  {
    id: "algebra-calculus",
    title: "Algebra & Calculus",
    description: "Solve equations, derivatives, integrals and more with step-by-step solutions.",
    imageUrl: "https://demmelearning.com/wp-content/uploads/2024/08/algebra-1-prep.jpg",
    path: "/features/algebra-calculus",
    icon: "∫"
  },
  {
    id: "plotting-visualization",
    title: "Plotting & Visualization",
    description: "Create stunning 2D and 3D visualizations of mathematical functions.",
    imageUrl: "https://www.linuxlinks.com/wp-content/uploads/2019/02/plotting-software.jpg",
    path: "/features/plotting",
    icon: "📊"
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    description: "Matrix operations, eigenvalue problems, and linear system solutions.",
    imageUrl: "https://i.ytimg.com/vi/0WDhKCPtbng/sddefault.jpg",
    path: "/features/linear-algebra",
    icon: "⊗"
  },
  {
    id: "statistics-probability",
    title: "Statistics & Probability",
    description: "Statistical modeling, probability distributions, and data analysis tools.",
    imageUrl: "https://i.ytimg.com/vi/7Ntf-Kvl2M4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCw8PpI23imMXkx-2thwaLSKoaD4Q",
    path: "/features/statistics",
    icon: "σ"
  }
];

// Floating Symbols Component
const FloatingSymbols = ({ count = 10 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        const size = Math.random() * 24 + 12;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 50]
            }}
            transition={{ 
              duration, 
              delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              fontSize: `${size}px`,
              color: colors.accent,
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </>
  );
};

const AiFeatures = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center px-6 py-24 relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Floating mathematical symbols */}
      <FloatingSymbols count={15} />
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative z-10"
      >
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4"
          style={{ color: colors.light }}
        >
          {website.name}
        </h1>
        <h2 
          className="text-3xl font-semibold mb-6"
          style={{ color: colors.accent }}
        >
          Advanced Mathematical Capabilities
        </h2>
        <p 
          className="text-xl max-w-3xl mx-auto"
          style={{ color: colors.paragraph }}
        >
          Explore our comprehensive suite of mathematical tools designed for students, educators, and researchers
        </p>
      </motion.div>

      {/* Math Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        {mathFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link
              to={feature.path}
              className="block rounded-xl overflow-hidden w-full h-full transition-all duration-300 hover:-translate-y-2"
              style={{
                backgroundColor: colors.dark,
                border: `1px solid ${colors.primary}`,
                boxShadow: `0 10px 20px rgba(58, 134, 255, 0.2)`,
              }}
            >
              {/* Feature Image */}
              <div className="h-48 w-full overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 z-10"></div>
                <motion.img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div 
                  className="absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-full text-2xl z-20"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.light
                  }}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.light }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: colors.paragraph }}>{feature.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 flex items-center text-sm font-semibold"
                  style={{ color: colors.accent }}
                >
                  Explore feature
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Additional CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-center relative z-10"
      >
        <h3 className="text-2xl font-bold mb-6" style={{ color: colors.light }}>
          Ready to experience powerful mathematical computation?
        </h3>
        <Link
          to="/signup"
          className="inline-block px-8 py-4 rounded-lg font-bold transition-all hover:scale-105"
          style={{ 
            backgroundColor: colors.accent,
            color: colors.dark
          }}
        >
          Get Started with SageMath
        </Link>
      </motion.div>
    </div>
  );
};

export default AiFeatures;