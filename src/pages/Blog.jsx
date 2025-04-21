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

// Blog data
const blogs = [
  {
    id: 1,
    title: "Numerical Mathematics: Precise, Powerful, and Fast",
    excerpt: `SageMath provides comprehensive tools for handling numerical computations. 
It supports floating-point arithmetic, interval arithmetic, and high-precision calculations.
Work effortlessly with numerical integration, differentiation, and solving equations.
Tackle optimization problems using state-of-the-art algorithms.
Matrix operations are handled swiftly with native and external libraries.
Perform simulations that rely on reliable numerical accuracy.
Perfect for scientific research, engineering, and academic projects.
Built-in libraries allow solving real-world complex mathematical models.
Leverage GPU-accelerated computations for massive datasets.
Integrates easily with Python’s numerical ecosystem like NumPy.
Numerical precision can be tuned to your project’s needs.
Visualize results instantly with graphs and charts.
Flexible enough for iterative and algorithmic problem-solving.
Supported by an active open-source community.
Transforms abstract numerical challenges into interactive solutions.`,
  },
  {
    id: 2,
    title: "Symbolic Computation: Algebra Meets AI",
    excerpt: `Symbolic computation is at the heart of SageMath’s capabilities.
It manipulates mathematical symbols like variables and expressions.
Simplify, expand, and factor algebraic expressions accurately.
Supports differentiation, integration, and limits symbolically.
Work with equations, inequalities, and systems symbolically.
Solve complex expressions involving trigonometric or exponential terms.
Use symbolic matrices, vectors, and polynomials.
Explore infinite series, sequences, and summations.
Supports advanced simplification with customizable assumptions.
Combine symbolic and numeric methods seamlessly.
Ideal for research in pure and applied mathematics.
Symbolic capabilities extend to calculus and linear algebra.
Solve algebraic systems interactively with real-time feedback.
Easily visualize symbolic functions in 2D or 3D.
Built to simplify even the most abstract algebraic problems.`,
  },
  {
    id: 3,
    title: "Algebra & Calculus: Powerful Foundations",
    excerpt: `SageMath covers everything from basic algebra to advanced calculus.
Manipulate polynomials, rational expressions, and algebraic structures.
Work with complex numbers, roots, and modular arithmetic.
Handle matrices, determinants, and vector spaces with ease.
Perform differentiation, integration, and limits on any function.
Supports multivariable and vector calculus operations.
Explore partial derivatives, gradients, and divergence.
Find maxima, minima, and optimization problems.
Work symbolically, numerically, or both in combination.
Use computer algebra systems for efficient algebraic manipulation.
Create interactive algebraic and calculus demonstrations.
Visualize functions, derivatives, and integrals graphically.
Ideal for educators, students, and researchers alike.
Enhances clarity with step-by-step algebraic solutions.
Transforms calculus problems into dynamic visual models.`,
  },
  {
    id: 4,
    title: "Interactive Plotting & 3D Graphics",
    excerpt: `SageMath turns complex data into intuitive visual experiences.
Generate 2D and 3D plots for any mathematical function.
Supports parametric, polar, and implicit plots.
Interactively adjust variables and ranges in real-time.
Combine multiple plots into a single graphic window.
Add annotations, legends, and customized styling.
Easily export visualizations as images or interactive widgets.
Use 3D surface, mesh, and vector field plots.
Manipulate objects interactively within a browser.
Generate animations and dynamic visual representations.
Perfect for teaching and presenting abstract ideas.
Plot solutions to differential equations graphically.
Create statistical graphs, histograms, and scatter plots.
Advanced graphics engine handles complex renderings smoothly.
Visualization becomes a bridge between concept and understanding.`,
  },
  {
    id: 5,
    title: "Research, Simulation & Applied Math",
    excerpt: `SageMath empowers researchers with tools for simulation and modeling.
Model real-world systems using algebraic and numerical techniques.
Simulate physical systems, financial models, or scientific experiments.
Use Monte Carlo methods and probabilistic models.
Perform data fitting, interpolation, and regression analysis.
Analyze large datasets with built-in statistical tools.
Leverage Python libraries for AI and machine learning.
Integrate research-grade algorithms for custom simulations.
Perfect for computational mathematics and applied research.
Supports cryptography, coding theory, and signal processing.
Collaborate with others via open-source notebooks.
Document research processes and outcomes interactively.
Publish interactive models and visualizations.
Simulate experiments in physics, biology, or economics.
Turn complex research problems into computational prototypes.`,
  },
];

// Blog Page component
const Blogs = () => {
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
            Blog
          </motion.h2>
          {blogs.map((blog) => (
            <motion.article key={blog.id} style={styles.blogPost} variants={itemVariants}>
              <h3 style={{ ...styles.blogTitle, color: colors.primary }}>{blog.title}</h3>
              <p style={styles.blogExcerpt}>{blog.excerpt}</p>
            </motion.article>
          ))}
        </section>
      </motion.main>
      <motion.footer
        style={{ ...styles.footer, backgroundColor: colors.primary, color: colors.secondary }}
        variants={itemVariants}
      ></motion.footer>
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
    maxWidth: '900px',
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
  blogPost: {
    marginBottom: '30px',
  },
  blogTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  blogExcerpt: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    marginTop: 'auto',
    textAlign: 'center',
    padding: '1px',
    width: '100%',
  },
};

export default Blogs;
