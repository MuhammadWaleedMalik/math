import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoPlayer = ({ colors }) => {
  const [showVideo, setShowVideo] = useState(false);

  // Lazy-load inline video component
  const LazyVideo = () => (
    <video
      controls
      autoPlay
      className="max-w-4xl w-full rounded-lg shadow-xl"
    >
      <source src="/images/SageMath_Visualize_Complex_Math.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  return (
    <>
      {/* Play Button */}
      {!showVideo && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke={colors.accent} strokeWidth="4" />
            <path d="M32 24L56 40L32 56V24Z" fill={colors.accent} />
          </svg>
        </motion.div>
      )}

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 mt-24 text-white text-4xl font-bold z-50"
            >
              &times;
            </button>

            {/* Lazy Loaded Video */}
            <Suspense fallback={<div className="text-white">Loading video...</div>}>
              <LazyVideo />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoPlayer;
