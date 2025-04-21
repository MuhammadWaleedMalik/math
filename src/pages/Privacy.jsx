import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Privacy = () => {
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
    hrcolor: "#333344",
  };

  const website = {
    name: "SageMath",
    slogan: "Math and Path – Achieve at Last",
    description:
      "Advanced mathematical computation made accessible through intuitive interfaces and powerful visualization tools.",
  };

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.text }}
      className="min-h-screen py-20 px-6 sm:px-10 lg:px-32"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-5xl font-bold mb-6"
        style={{ color: colors.accent }}
      >
        {t("Privacy Policy")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-lg leading-relaxed mb-6"
        style={{ color: colors.paragraph }}
      >
        {t(
          `${website.name} values your privacy. This policy outlines how we collect, use, and protect your personal information when you use our services.`
        )}
      </motion.p>

      <motion.hr
        style={{ borderColor: colors.hrcolor }}
        className="my-6"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="space-y-6"
      >
        <section>
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: colors.accent }}
          >
            {t("Information Collection")}
          </h2>
          <p style={{ color: colors.paragraph }} className="text-lg leading-relaxed">
            {t(
              "We may collect personal information such as your name, email address, and usage data when you interact with our website. This information is used solely to enhance your experience with SageMath."
            )}
          </p>
        </section>

        <section>
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: colors.accent }}
          >
            {t("Use of Information")}
          </h2>
          <p style={{ color: colors.paragraph }} className="text-lg leading-relaxed">
            {t(
              "Your information helps us personalize features, improve services, and communicate important updates related to SageMath. We never sell or share your data with third parties."
            )}
          </p>
        </section>

        <section>
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: colors.accent }}
          >
            {t("Data Security")}
          </h2>
          <p style={{ color: colors.paragraph }} className="text-lg leading-relaxed">
            {t(
              "SageMath implements strong security measures to protect your personal data from unauthorized access, alteration, or disclosure."
            )}
          </p>
        </section>

        <section>
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: colors.accent }}
          >
            {t("Policy Updates")}
          </h2>
          <p style={{ color: colors.paragraph }} className="text-lg leading-relaxed">
            {t(
              "We may update this Privacy Policy occasionally to reflect changes in our services or legal obligations. We recommend reviewing this page regularly."
            )}
          </p>
        </section>
      </motion.div>

      <motion.div
        className="mt-10 text-center text-lg italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{ color: colors.paragraph }}
      >
        &copy; {new Date().getFullYear()} {t(website.name)}.{" "}
        {t("All rights reserved.")}.
      </motion.div>
    </div>
  );
};

export default Privacy;
