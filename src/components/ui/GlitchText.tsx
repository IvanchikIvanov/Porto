import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'span', className = '' }) => {
  return (
    <Tag className={`relative inline-block group font-mono ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-accent opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none delay-75">
        {text}
      </span>
    </Tag>
  );
};

export default GlitchText;

