import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useNavigationType } from "react-router-dom";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const navigationType: any = useNavigationType();

  const pageVariants = {
    initial: {
      opacity: 0,
      // x: "100%",
      //   scale: 0,
      //   y: navigationType === "pop" ? -50 : 50, // Top to bottom if back, bottom to top if forward
    },
    animate: {
      opacity: 1,
      // x: "0%",
      //   y: 0,
      //   scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      // x: "100%",
      //   scale: 0,
      //   y: navigationType === "pop" ? 50 : -50, // Opposite on exit
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
