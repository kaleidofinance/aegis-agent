import React from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}) => {
  const variants: Record<'primary' | 'secondary', string> = {
    primary: "bg-[#00dd72] text-black shadow-lg shadow-[#00dd72]/20",
    secondary: "bg-black text-white border border-[#00dd72]/30 hover:border-[#00dd72]/60",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 font-bold rounded-lg transition-all relative overflow-hidden ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
