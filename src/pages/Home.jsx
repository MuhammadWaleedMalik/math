import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/Video";

// Color Scheme
const colors = {
  primary: "#3A86FF",  // Vibrant blue
  secondary: "#1A1A2E",  // Dark navy
  accent: "#FFBE0B",  // Gold/yellow
  light: "#E6F1FF",  // Light blue
  dark: "#0A0A12"  // Almost black
};

// Website Data
const website = {
  name: "SageMath",
  slogan: "Math and Path – Achieve at Last",
  description: "Advanced mathematical computation made accessible through intuitive interfaces and powerful visualization tools."
};

// Feature Categories
const featureCategories = [
  {
    title: "Core Mathematics",
    features: [
      "Symbolic Computation",
      "Numerical Mathematics", 
      "Algebra & Calculus",
      "Number Theory"
    ],
    icon: "∑"
  },
  {
    title: "Advanced Topics",
    features: [
      "Linear Algebra",
      "Group Theory",
      "Statistics & Probability",
      "Differential Equations"
    ],
    icon: "∞"
  },
  {
    title: "Visualization",
    features: [
      "2D/3D Plotting",
      "Interactive Graphics",
      "Geometric Visualization",
      "Dynamic Simulations"
    ],
    icon: "📊"
  }
];

// Benefits
const benefits = [
  {
    title: "Research Power",
    description: "Accelerate mathematical research with powerful symbolic computation",
    icon: "🔬"
  },
  {
    title: "Education",
    description: "Enhance learning with interactive visualizations of complex concepts",
    icon: "🎓"
  },
  {
    title: "Professional Use",
    description: "Solve real-world problems with advanced mathematical tools",
    icon: "💼"
  },
  {
    title: "Open Source",
    description: "Open-source with a vibrant community",
    icon: "🌍"
  }
];

// Testimonials
const testimonials = [
  {
    quote: "SageMath has transformed how I teach advanced calculus. The visualizations make abstract concepts tangible.",
    author: "Dr. Elena Rodriguez",
    role: "Mathematics Professor"
  },
  {
    quote: "For my PhD research in number theory, SageMath's computational power is indispensable.",
    author: "Michael Chen",
    role: "Graduate Researcher"
  },
  {
    quote: "The interactive plotting capabilities helped our engineering team visualize complex data relationships.",
    author: "Sarah Johnson",
    role: "Data Scientist"
  }
];

// Math symbols for decorative elements
const mathSymbols = ["∑", "∫", "∏", "√", "∞", "∂", "∇", "±", "≈", "≠", "≡", "∈", "∉", "∩", "∪"];

// Floating Symbols Component
const FloatingSymbols = ({ count = 15 }) => {
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
              zIndex: 0
            }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </>
  );
};

// Hero Section
const Page1 = () => {
  return (
    <div 
      className="relative h-screen overflow-hidden flex items-center justify-center px-10"
      style={{ backgroundColor: colors.secondary }}
    >
      <FloatingSymbols count={20} />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-left mb-10 md:mb-0 md:w-1/2"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{ color: colors.light }}
          >
            {website.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-2xl md:text-3xl mb-8"
            style={{ color: colors.accent }}
          >
            {website.slogan}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-lg md:text-xl mb-8"
            style={{ color: colors.light }}
          >
            {website.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <Link
              to="/signup"
              className="inline-block px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.dark
              }}
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, type: "spring" }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 border-4 rounded-full opacity-20"
              style={{ borderColor: colors.primary }}
            />
            
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-8 border-4 rounded-full opacity-30"
              style={{ borderColor: colors.accent }}
            />
            
            <motion.img
              src="/images/logo.jpg" // Replace with your image
              alt="Mathematical Visualization"
              className="relative z-10 w-full max-w-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Features Section
const Page2 = () => {
  return (
    <div 
      className="relative min-h-screen py-20 px-10 flex flex-col items-center justify-center"
      style={{ backgroundColor: colors.light }}
    >
      <FloatingSymbols count={15} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.dark }}>
          Powerful Mathematical Capabilities
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: colors.secondary }}>
          Explore our comprehensive suite of mathematical tools and features
        </p>
      </motion.div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {featureCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-2xl"
            whileHover={{ y: -10 }}
          >
            <div className="text-5xl mb-6" style={{ color: colors.primary }}>
              {category.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.dark }}>
              {category.title}
            </h3>
            <ul className="space-y-3">
              {category.features.map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start"
                  style={{ color: colors.secondary }}
                >
                  <span className="mr-2" style={{ color: colors.accent }}>✓</span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Interactive Demo Section
const Page3 = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative min-h-screen py-20 px-10 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern 
            id="grid-pattern" 
            x="0" 
            y="0" 
            width="40" 
            height="40" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              stroke={colors.light} 
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-16 max-w-4xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.light }}>
          Experience Mathematical Discovery
        </h2>
        <p className="text-xl md:text-2xl" style={{ color: colors.light }}>
          Interactive tools that bring abstract concepts to life
        </p>
      </motion.div>
      
      <motion.div
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {[
            "Real-time equation solving with step-by-step explanations",
            "Dynamic geometric constructions that respond to your inputs",
            "Visual function exploration with interactive sliders",
            "3D surface plotting with rotation and zoom capabilities"
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex items-start p-4 rounded-lg"
              style={{ 
                backgroundColor: `rgba(255, 255, 255, ${0.1 + i * 0.1})`,
                backdropFilter: "blur(5px)"
              }}
            >
              <div 
                className="text-2xl mr-4"
                style={{ color: colors.accent }}
              >
                {i + 1}
              </div>
              <p style={{ color: colors.light }}>{item}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-2xl bg-black opacity-20 blur-lg"></div>
          <div 
            className="relative bg-white p-1 rounded-xl overflow-hidden"
            style={{ boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.3)` }}
          >
            <img 
              src="/images/logo.jpg" // Replace with your image
              alt="Interactive Demo"
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
            
            

              
              <VideoPlayer colors={colors} />


            
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-16"
      >
        <Link

          to="/explore"
          className="px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105"
          style={{ 
            backgroundColor: colors.accent,
            color: colors.dark
          }}
        >
          Try Sage Math Now 
        </Link>

      </motion.div>
    </div>
  );o
};

// Benefits Section
const Page4 = () => {
  return (
    <div 
      className="relative min-h-screen py-20 px-10 flex flex-col items-center justify-center"
      style={{ backgroundColor: colors.dark }}
    >
      <FloatingSymbols count={10} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.light }}>
          Why Choose SageMath?
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: colors.accent }}>
          Powerful tools for students, educators, and researchers
        </p>
      </motion.div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
            whileHover={{ 
              y: -10,
              boxShadow: `0 15px 30px -5px rgba(58, 134, 255, 0.3)`
            }}
          >
            <div 
              className="text-4xl mb-6 p-4 rounded-full"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.light
              }}
            >
              {benefit.icon}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: colors.dark }}>
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-20 max-w-4xl"
      >
        <div className="relative p-1 rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 rounded-xl"
            style={{ 
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
              opacity: 0.7
            }}
          ></div>
          <div 
            className="relative bg-white p-8 rounded-lg"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.dark }}>
              Comprehensive Documentation
            </h3>
            <p className="mb-6" style={{ color: colors.secondary }}>
              Access detailed tutorials, examples, and API references to help you master SageMath's capabilities.
            </p>
            <Link
              to="/docs"
              className="inline-block px-6 py-3 rounded-lg text-sm font-bold transition-all hover:scale-105"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.light
              }}
            >
              Explore Documentation
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Testimonials Section
const Page5 = () => {
  return (
    <div 
      className="relative min-h-screen py-20 px-10 flex flex-col items-center justify-center"
      style={{ backgroundColor: colors.light }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.dark }}>
          Trusted by Mathematicians Worldwide
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: colors.secondary }}>
          Hear from our community of users
        </p>
      </motion.div>
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
              whileHover={{ 
                y: -5,
                boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.1)`
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-2"
                style={{ backgroundColor: colors.primary }}
              ></div>
              <div 
                className="text-6xl absolute top-4 right-4 opacity-10"
                style={{ color: colors.primary }}
              >
                ”
              </div>
              <p className="text-lg italic mb-6 relative z-10" style={{ color: colors.secondary }}>
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.light
                  }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold" style={{ color: colors.dark }}>{testimonial.author}</p>
                  <p className="text-sm" style={{ color: colors.secondary }}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-20 text-center"
      >
        <h3 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
          Join Our Growing Community
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {["Students", "Educators", "Researchers", "Engineers", "Data Scientists"].map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="px-6 py-3 rounded-full"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.light
              }}
            >
              {group}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// CTA Section
const Page6 = () => {
  return (
    <div 
      className="relative min-h-screen py-20 px-10 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg 
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="math-pattern" 
              x="0" 
              y="0" 
              width="100" 
              height="100" 
              patternUnits="userSpaceOnUse"
            >
              {mathSymbols.map((symbol, i) => (
                <text 
                  key={i}
                  x={Math.random() * 100}
                  y={Math.random() * 100}
                  fontSize={Math.random() * 20 + 10}
                  fill={colors.light}
                  opacity="0.3"
                >
                  {symbol}
                </text>
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#math-pattern)" />
        </svg>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-16 max-w-4xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.light }}>
          Ready to Transform Your Mathematical Workflow?
        </h2>
        <p className="text-xl md:text-2xl mb-8" style={{ color: colors.light }}>
          Get started with SageMath today and unlock powerful mathematical computation
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="inline-block px-8 py-4 rounded-lg text-lg font-bold"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.dark
              }}
            >
              Create Account
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="inline-block px-8 py-4 rounded-lg text-lg font-bold border-2"
              style={{ 
                borderColor: colors.light,
                color: colors.light
              }}
            >
              Login Account 
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-12"
      >
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: "Students", icon: "🎓" },
            { label: "Open Source", icon: "💻" },
            { label: "Community", icon: "🌐" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="flex items-center"
              style={{ color: colors.light }}
            >
              <span className="text-2xl mr-2">{item.icon}</span>
              <span className="text-lg">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Main Component
const Home = () => {
  return (
    <div className="overflow-hidden">
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
    </div>
  );
};

export default Home;