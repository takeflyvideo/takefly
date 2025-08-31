import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          data-testid="loading-screen"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl font-bold text-gradient mb-4 font-serif"
            >
              TakeFly
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="h-1 bg-primary mx-auto"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
