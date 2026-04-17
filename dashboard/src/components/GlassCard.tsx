import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`relative rounded-xl bg-[#0c0f0d] border border-white/[0.06] p-6 overflow-hidden transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      } : {}}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
