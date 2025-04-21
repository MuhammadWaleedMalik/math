import React from "react";
import { motion } from "framer-motion";

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

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// Terms and Conditions Component
const Terms = () => {
  return (
    <motion.div
      style={{ ...styles.container, backgroundColor: colors.background, color: colors.text }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-24 font-mono font-bold italic"
    >
      {/* Header Section */}
      <motion.header style={styles.header} variants={itemVariants}>
        <h1 style={{ ...styles.title, color: colors.accent }}>{website.name}</h1>
        <p style={{ ...styles.slogan, color: colors.accent }}>{website.slogan}</p>
      </motion.header>

      {/* Terms and Conditions */}
      <motion.main style={styles.main} variants={itemVariants}>
        <section style={styles.section}>
          <motion.h2 style={{ ...styles.sectionTitle, color: colors.primary }} variants={itemVariants}>
            Terms and Conditions
          </motion.h2>
          <motion.p style={styles.description} variants={itemVariants}>
            Welcome to {website.name}! These terms and conditions outline the rules and guidelines for using our advanced mathematical tools, visualizations, and services.
          </motion.p>

          {/* Terms Sections */}
          {termsData.map((term, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.h3 style={{ ...styles.subSectionTitle, color: colors.accent }} variants={itemVariants}>
                {term.title}
              </motion.h3>
              <motion.p style={styles.description} variants={itemVariants}>
                {term.description}
              </motion.p>
            </motion.div>
          ))}
        </section>
      </motion.main>

      {/* Footer */}
      <motion.footer
        style={{ ...styles.footer, backgroundColor: colors.primary, color: colors.light }}
        variants={itemVariants}
      >
        <p style={styles.footerText}>© 2025 {website.name}. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

// Terms Data
const termsData = [
  {
    title: "1. Computational Tools",
    description:
      "SageMath provides a suite of powerful computational tools for numerical, symbolic, algebraic, and graphical tasks, intended for academic, research, and personal use.",
  },
  {
    title: "2. Data Security",
    description:
      "We prioritize the security of your data. All computations and data inputs are handled with confidentiality and are not shared with third parties.",
  },
  {
    title: "3. Accurate Visualization",
    description:
      "SageMath offers accurate, interactive visualizations for mathematical functions and datasets, but results should be reviewed for precision in critical applications.",
  },
  {
    title: "4. Service Availability",
    description:
      "We strive for high service availability but do not guarantee uninterrupted access. Planned maintenance or unexpected outages may occur.",
  },
  {
    title: "5. User Responsibilities",
    description:
      "Users are responsible for ensuring that their use of SageMath complies with applicable academic, legal, and ethical standards.",
  },
  {
    title: "6. Updates to Terms",
    description:
      "We may update these terms periodically. Continued use of our services implies acceptance of the updated terms.",
  },
];

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    margin: "0",
  },
  slogan: {
    fontSize: "20px",
    margin: "10px 0 0",
  },
  main: {
    maxWidth: "800px",
    width: "100%",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subSectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: colors.paragraph,
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    padding: "10px",
    width: "100%",
  },
  footerText: {
    margin: "0",
    fontSize: "14px",
  },
};

export default Terms;
