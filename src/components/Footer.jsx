import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();

  const colors = {
    primary: "#3A86FF",
    secondary: "#1A1A2E",
    accent: "#FFBE0B",
    light: "#E6F1FF",
    dark: "#0A0A12",
    background: "#1A1A2E",
    text: "#FFFFFF",
    paragraph: "#CCCCCC",
    hrcolor: "#333344"
  };

  const website = {
    name: "SageMath",
    slogan: "Math and Path – Achieve at Last",
    description:
      "Advanced mathematical computation made accessible through intuitive interfaces and powerful visualization tools.",
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <footer
      style={{ backgroundColor: colors.background, color: colors.text }}
      className="pt-20 pb-14 w-full"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-start gap-14">
        {/* Left Side - Website Name & Slogan */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full md:w-1/3"
        >
          <Link
            to="/"
            className="text-5xl italic font-extrabold tracking-wide"
            style={{ color: colors.accent }}
          >
            {t(website.name)}
          </Link>
          <motion.p
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mt-4 text-xl italic"
            style={{ color: colors.paragraph }}
          >
            {t(website.slogan)}
          </motion.p>
        </motion.div>

        {/* Right Side - Links */}
        <div className="w-full md:w-2/3 flex flex-wrap gap-12 md:gap-20 mt-6 md:mt-0">
          {/* Company Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.accent }}
            >
              {t("Company")}
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link
                  to="/aboutus"
                  className="hover:text-yellow-500 transition-all duration-300"
                >
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-yellow-500 transition-all duration-300"
                >
                  {t("Blogs")}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.accent }}
            >
              {t("Legal")}
            </h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-yellow-500 transition-all duration-300"
                >
                  {t("Terms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-yellow-500 transition-all duration-300"
                >
                  {t("Privacy")}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="border-t mt-14 pt-6 text-center"
        style={{ borderColor: colors.hrcolor }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-lg italic" style={{ color: colors.paragraph }}>
          &copy; {new Date().getFullYear()} {t(website.name)}.{" "}
          {t("All rights reserved.")}
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
