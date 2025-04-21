import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Color Scheme
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

// Robotic Arm Animation Variants
const roboticArmVariants = {
  initial: { rotate: 0, y: 0 },
  animate: {
    rotate: [0, 15, -15, 0], // Swaying motion
    y: [0, -10, 10, 0], // Up and down motion
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ backgroundColor: colors.background }}
    >
      {/* Robotic Arm Animation */}
      <motion.div
        className="mb-8"
        variants={roboticArmVariants}
        initial="initial"
        animate="animate"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v4m0 12v4M5 12H2m20 0h-3m-5 0a5 5 0 0 1-10 0" />
        </svg>
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-bold mb-4"
        style={{ color: colors.primary }}
      >
        404
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-4"
        style={{ color: colors.text }}
      >
        {t("Page Not Found")}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg text-center mb-8"
        style={{ color: colors.paragraph }}
      >
        {t("The page you're looking for doesn't exist or has been moved.")}
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          to="/"
          className="px-8 py-3 font-bold rounded-lg transition-all hover:opacity-80"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          {t("Back to Home")}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;