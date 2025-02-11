import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function FadeInBottomToTop({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className=""
    >
      {children}
    </motion.div>
  );
}

export default FadeInBottomToTop;
