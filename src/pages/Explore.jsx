import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiFilter, FiClock, FiLayers, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import FilterBar from '../components/FilterBar';
import ImageCard from '../components/ImageCard';
import { Filter, Image } from '../types';

// Mathematical symbols for decoration
const mathSymbols = ["∑", "∫", "∏", "√", "∞", "∂", "∇", "±", "≈", "≠", "≡", "∈", "∉", "∩", "∪"];

// Color scheme
const colors = {
  primary: "#3A86FF",
  secondary: "#1A1A2E",
  accent: "#FFBE0B",
  light: "#E6F1FF",
  dark: "#0A0A12",
  background: "#1A1A2E",
  text: "#FFFFFF",
  paragraph: "#CCCCCC",
  hrcolor: "#333344",
};

// Mock data for mathematical visualizations
const mockImages = Array.from({ length: 20 }, (_, i) => {
  const types = [
    "3D Function Plot",
    "Geometric Construction",
    "Complex Number Visualization",
    "Vector Field Diagram",
    "Statistical Distribution",
    "Algebraic Surface",
    "Topological Shape",
    "Fractal Pattern",
    "Graph Theory Network",
    "Differential Equation Solution"
  ];
  
  const tags = [
    "calculus", "algebra", "geometry", "statistics", 
    "number-theory", "topology", "graph-theory", "complex-analysis"
  ];
  
  return {
    id: `${i + 1}`,
    url: `https://cdn.midjourney.com/math-visualization-${i + 1}.png`,
    title: types[i % types.length],
    author: `Mathematician ${i + 1}`,
    authorAvatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`,
    likes: Math.floor(Math.random() * 2000),
    views: Math.floor(Math.random() * 10000),
    tags: tags.slice(0, Math.floor(Math.random() * 3) + 1),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    description: `Visual representation of ${types[i % types.length].toLowerCase()} demonstrating key mathematical concepts`
  };
});

// Mathematical filters
const filters = [
  {
    id: 'branch',
    name: 'Branch',
    icon: <FiLayers className="mr-2" />,
    value: 'all,algebra,calculus,geometry,statistics,number-theory,topology,graph-theory'
  },
  {
    id: 'complexity',
    name: 'Complexity',
    icon: <FiAward className="mr-2" />,
    value: 'all,beginner,intermediate,advanced,research'
  },
  {
    id: 'timeframe',
    name: 'Timeframe',
    icon: <FiClock className="mr-2" />,
    value: 'all,today,week,month,year'
  }
];

const Explore = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState(mockImages);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (filterId, value) => {
    console.log(`Filter changed: ${filterId} = ${value}`);
    setActiveFilter(value);
    // In a real app, this would filter the images based on the selected filters
    // For this demo, we'll just shuffle the array to simulate filtering
    setFilteredImages([...mockImages].sort(() => Math.random() - 0.5));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
    // In a real app, this would search the images based on the query
    // For this demo, we'll just shuffle the array to simulate searching
    setFilteredImages([...mockImages].sort(() => Math.random() - 0.5));
  };

  // Floating symbols component
  const FloatingSymbols = ({ count = 5 }) => {
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

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Floating mathematical symbols */}
        <FloatingSymbols count={8} />
        
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.text }}>
            Mathematical Visualizations Gallery
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: colors.paragraph }}>
            Explore interactive visualizations that bring complex mathematical concepts to life
          </p>
        </motion.div>
        
        {/* Search and filter */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for visualizations (e.g., '3D plot', 'vector field')"
              className="w-full bg-dark text-white border border-hrcolor rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ backgroundColor: colors.dark, borderColor: colors.hrcolor }}
            />
            <FiSearch 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              size={20} 
              style={{ color: colors.paragraph }}
            />
          </form>
          
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            activeFilter={activeFilter}
            accentColor={colors.accent}
          />
        </div>
        
        {/* Visualization grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ImageCard 
                image={image} 
                accentColor={colors.accent}
                backgroundColor={colors.dark}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Load more button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button 
            className="px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.dark
            }}
          >
            Load More Visualizations
          </button>
        </motion.div>
        
        {/* Mathematical capabilities section */}
        <motion.div 
          className="mt-24 pt-12 border-t"
          style={{ borderColor: colors.hrcolor }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.text }}>
            SageMath Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Numerical Mathematics",
                description: "Precision calculations and numerical analysis with advanced algorithms",
                icon: "123"
              },
              {
                title: "Symbolic Computation",
                description: "Manipulate mathematical expressions in symbolic form",
                icon: "fx"
              },
              {
                title: "Algebra & Calculus",
                description: "Solve equations, derivatives, integrals and more",
                icon: "∫"
              },
              {
                title: "2D/3D Plotting",
                description: "Create stunning visualizations of functions and data",
                icon: "📊"
              },
              {
                title: "Statistics & Probability",
                description: "Advanced statistical modeling and probability distributions",
                icon: "σ"
              },
              {
                title: "Research & Simulation",
                description: "Tools for mathematical research and scientific computing",
                icon: "🔬"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl"
                style={{ 
                  backgroundColor: colors.dark,
                  border: `1px solid ${colors.hrcolor}`
                }}
              >
                <div 
                  className="text-3xl mb-4 w-16 h-16 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.primary }}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                  {item.title}
                </h3>
                <p style={{ color: colors.paragraph }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;