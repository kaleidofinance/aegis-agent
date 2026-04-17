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
      className={`relative rounded-[2rem] p-8 overflow-hidden backdrop-blur-[20px] transition-all duration-700 ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        border: '1px solid rgba(0, 255, 110, 0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? {
        scale: 1.01,
        borderColor: 'rgba(0, 255, 110, 0.4)',
        boxShadow: '0 0 40px rgba(0, 255, 110, 0.1)',
      } : {}}
    >
      {/* Liquid Light Orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ff6e]/10 filter blur-[60px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00ff6e]/5 filter blur-[60px] rounded-full animate-pulse delay-700 pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
