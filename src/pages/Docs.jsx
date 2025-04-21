import React from 'react';
import { motion } from 'framer-motion';

// Define colors and website details
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

// Docs data
const docs = [
  {
    id: 1,
    title: "Getting Started with SageMath",
    content: `SageMath is an open-source mathematical software system that integrates a wide range of mathematics libraries and tools. It’s designed for numerical, symbolic, and algebraic computations. 
    Install SageMath from the official site and launch its intuitive notebook interface to start your projects.
    Explore basic operations, variables, and functions.
    Learn how to execute code in cells and visualize results interactively.
    Familiarize yourself with SageMath’s syntax, which is built on Python.
    Use online resources and community forums to enhance your understanding.
    Get comfortable with the integrated plotting capabilities for 2D and 3D graphs.
    Test symbolic calculations, limits, derivatives, and integrals.
    Experiment with matrices, vectors, and linear algebra tools.
    Access comprehensive documentation and example notebooks provided by SageMath.
    Use the command line and Jupyter notebooks interchangeably.
    Explore arithmetic operations with rational, real, and complex numbers.
    Begin customizing your workspace and preferences.
    Explore built-in examples to grasp common use cases.
    Master basic commands before moving to advanced topics.`,
  },
  {
    id: 2,
    title: "Numerical Mathematics in SageMath",
    content: `Numerical mathematics in SageMath is powered by efficient, high-precision libraries. It covers arithmetic, numerical approximations, and solving equations.
    Perform operations with arbitrary-precision real and complex numbers.
    Evaluate expressions with controlled decimal precision.
    Solve linear and nonlinear equations numerically.
    Approximate definite integrals and perform numerical differentiation.
    Use built-in functions for trigonometric, exponential, and logarithmic operations.
    Convert symbolic results to numerical approximations easily.
    Solve systems of equations using numeric solvers.
    Generate random numbers for simulations and statistical analysis.
    Perform matrix and vector computations with numerical precision.
    Simulate real-world data scenarios with SageMath’s random data generators.
    Visualize numerical solutions using 2D and 3D plotting.
    Handle floating-point rounding errors effectively.
    Integrate SageMath with NumPy and SciPy for extended functionality.
    Validate numerical results with multiple approximation methods.
    Apply iterative methods for root-finding and optimization problems.`,
  },
  {
    id: 3,
    title: "Symbolic Computation and Algebra",
    content: `Symbolic computation in SageMath lets you manipulate algebraic expressions, equations, and functions exactly rather than numerically.
    Define variables and functions symbolically.
    Simplify complex expressions using algebraic rules.
    Perform factorization, expansion, and substitution operations.
    Solve equations and inequalities symbolically.
    Compute limits, derivatives, and integrals of symbolic functions.
    Work with polynomials, rational functions, and algebraic numbers.
    Manipulate matrices with symbolic entries.
    Use series expansions for approximation and analysis.
    Perform partial fraction decomposition.
    Solve systems of symbolic equations.
    Handle symbolic matrices and determinants.
    Compute eigenvalues and eigenvectors symbolically.
    Use advanced algebraic tools for group theory and ring theory.
    Plot symbolic functions and inequalities.
    Leverage LaTeX rendering for clean, readable output.`,
  },
  // Add more docs similarly, each about 15 lines
];

// Docs Page component
const Docs = () => {
  return (
    <motion.div
      style={{ ...styles.container, backgroundColor: "white" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='mt-24 italic font-mono font-bold'
    >
      <motion.header style={styles.header} variants={itemVariants}>
        <h1 style={{ ...styles.title, color: colors.primary }}>{website.name}</h1>
        <p style={{ ...styles.slogan, color: colors.primary }}>{website.slogan}</p>
      </motion.header>
      <motion.main style={styles.main} variants={itemVariants}>
        <section style={styles.section}>
          <motion.h2 style={{ ...styles.sectionTitle, color: colors.primary }} variants={itemVariants}>
            Documentation
          </motion.h2>
          {docs.map((doc) => (
            <motion.article key={doc.id} style={styles.docPost} variants={itemVariants}>
              <h3 style={{ ...styles.docTitle, color: colors.primary }}>{doc.title}</h3>
              <p style={styles.docContent}>{doc.content}</p>
            </motion.article>
          ))}
        </section>
      </motion.main>
      <motion.footer
        style={{ ...styles.footer, backgroundColor: colors.primary, color: colors.secondary }}
        variants={itemVariants}
      />
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
    fontWeight: 'bold',
    margin: '0',
    fontSize: '78px',
    fontFamily: 'mono',
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
  docPost: {
    marginBottom: '30px',
  },
  docTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  docContent: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    whiteSpace: 'pre-line',
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '1px',
    width: '100%',
  },
};

export default Docs;
