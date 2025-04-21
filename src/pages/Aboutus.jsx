import React from 'react';
import { motion } from 'framer-motion';

// Define colors and website details
const colors = {
  primary: "#336699",
  secondary: "#F0F8FF",
  white: "white"
};

const website = {
  name: "SageMath",
  slogan: "Math and Path – Achieve at Last",
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// About Us component
const AboutUs = () => {
  return (
    <motion.div
      style={{ ...styles.container, backgroundColor: colors.white }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='mt-24 italic'
    >
      <motion.header style={styles.header} variants={itemVariants}>
        <h1 style={{ ...styles.title, color: colors.primary }}>{website.name}</h1>
        <p style={{ ...styles.slogan, color: colors.primary }}>{website.slogan}</p>
      </motion.header>
      <motion.main style={styles.main} variants={itemVariants}>
        <section style={styles.section}>
          <motion.h2 style={{ ...styles.sectionTitle, color: colors.primary }} variants={itemVariants}>
            About Us
          </motion.h2>
          <motion.p style={styles.description} variants={itemVariants}>
            SageMath is a comprehensive, open-source mathematical software system designed to help students, educators, and researchers explore the world of mathematics. 
            Combining powerful tools from across numerical, symbolic, and graphical computation, SageMath provides an all-in-one platform for both learning and advanced problem solving.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>Numerical Mathematics</strong> — Perform accurate numerical computations, approximations, and simulations with extensive mathematical libraries.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>Symbolic Computation</strong> — Manipulate algebraic expressions, solve equations, and explore calculus concepts symbolically.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>Algebra & Calculus</strong> — Dive deep into advanced algebraic systems and calculus problems with intuitive tools and visualizations.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>Number Theory & Linear Algebra</strong> — Explore number theory, matrices, and vector spaces using specialized SageMath tools.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>Group Theory & Statistics</strong> — Analyze group structures, probability, and statistical data in a clear, interactive environment.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>2D/3D Plotting & Simulations</strong> — Visualize mathematical functions, shapes, and data sets interactively in both 2D and 3D.
          </motion.p>

          <motion.p style={styles.description} variants={itemVariants}>
          🔷 <strong>Research & Education Focus</strong> — Tailored to academic and research communities, SageMath bridges learning and discovery in an open-source environment.
          </motion.p>
        </section>
      </motion.main>
      <motion.footer
        style={{ ...styles.footer, backgroundColor: colors.primary, color: colors.secondary }}
        variants={itemVariants}
      >
        <p style={styles.footerText}>© 2025 {website.name}. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '78px',
    fontFamily: 'mono',
    fontWeight: 'bold',
    margin: '0',
  },
  slogan: {
    fontSize: '20px',
    margin: '10px 0 0',
  },
  main: {
    maxWidth: '800px',
    width: '100%',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '16px',
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '10px',
    width: '100%',
  },
  footerText: {
    margin: '0',
    fontSize: '14px',
  },
};

export default AboutUs;
