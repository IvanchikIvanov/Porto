import React from 'react';

interface TerminalBoxProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  borderColor?: 'green' | 'gray';
}

const TerminalBox: React.FC<TerminalBoxProps> = ({ 
  children, 
  title = 'user@siteberry:~', 
  className = '',
  borderColor = 'gray'
}) => {
  const borderClass = borderColor === 'green' ? 'border-cyber-green' : 'border-neutral-800 hover:border-cyber-green/50';

  return (
    <div className={`relative border bg-cyber-black/80 backdrop-blur-sm transition-colors duration-300 ${borderClass} ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-cyber-gray/50">
        <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">{title}</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
      {/* Decorative corners */}
      <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyber-green opacity-70"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyber-green opacity-70"></div>
    </div>
  );
};

export default TerminalBox;