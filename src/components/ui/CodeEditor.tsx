import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const CodeEditor: React.FC = () => {
  const { t } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#9333ea] to-[#3b82f6] opacity-30 blur"></div>
      <div className="relative bg-cyber-black border border-neutral-800 p-2 shadow-2xl">
        <div className="flex items-center justify-between px-2 pb-2 border-b border-neutral-800 mb-2 bg-neutral-900/50">
           <div className="text-xs text-neutral-500">main.tsx</div>
           <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
           </div>
        </div>
        <div className="space-y-2 font-mono text-sm p-4 text-left">
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">01</span>
            <span className="text-violet-400">import</span> <span className="text-white">Future</span> <span className="text-violet-400">from</span> <span className="text-pink-400">'@siteberry/core'</span>;
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">02</span>
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">03</span>
            <span className="text-violet-400">const</span> <span className="text-blue-400">Project</span> <span className="text-white">=</span> <span className="text-pink-400">async</span> () <span className="text-violet-400">=&gt;</span> {'{'}
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">04</span>
            <span className="ml-4 text-violet-400">await</span> <span className="text-white">Future.build(</span>{'{'}
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">05</span>
            <span className="ml-8 text-white">quality:</span> <span className="text-orange-400">100</span>,
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">06</span>
            <span className="ml-8 text-white">speed:</span> <span className="text-blue-400">'MAX_VELOCITY'</span>,
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">07</span>
            <span className="ml-8 text-white">style:</span> <span className="text-blue-400">'CYBERPUNK'</span>
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">08</span>
            <span className="ml-4 text-white">{'}'});</span>
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">09</span>
            <span className="text-white">{'}'};</span>
          </div>
          <div className="flex">
            <span className="text-neutral-600 w-8 select-none">10</span>
            <span className="text-neutral-500">{t('hero.code_ready')}</span>
            <span className="animate-pulse inline-block w-2 h-4 bg-cyber-green ml-1 align-middle"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;

