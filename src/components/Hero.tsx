import React from 'react';
import { motion } from 'framer-motion';
import DecodingText from './ui/DecodingText';
import { ArrowRight, Code, Database, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Hero: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Matrix-lite effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="space-y-2 font-mono">
              <p className="text-cyber-green text-sm typing-effect overflow-hidden whitespace-nowrap border-r-2 border-cyber-green w-fit pr-1 animate-pulse">
                root@siteberry:~$ {t('hero.cmd')}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                <DecodingText text={t('hero.digital')} startDelay={500} /><br />
                <span className="text-neutral-500">{t('hero.reality')}</span><br />
                {/* We use text-white for scramble here to contrast against the primary text in dark mode. 
                    In light mode 'text-white' maps to dark text via tailwind config override. */}
                <DecodingText 
                  text={t('hero.architects')}
                  className="text-cyber-green" 
                  scrambleClassName="text-white" 
                  startDelay={1500}
                />
              </h1>
            </div>

            <p className="text-neutral-400 max-w-lg text-lg leading-relaxed border-l-2 border-neutral-800 pl-4">
              {t('hero.desc')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="group relative inline-flex items-center gap-3 px-8 py-3 bg-cyber-green text-white font-bold font-mono tracking-wider overflow-hidden hover:bg-white hover:text-black hover:border-transparent border border-transparent transition-all"
              >
                <span>{t('hero.btn_start')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#services" 
                className="inline-flex items-center gap-3 px-8 py-3 border border-neutral-700 text-white font-mono tracking-wider hover:border-cyber-green hover:text-cyber-green transition-all bg-cyber-black/50"
              >
                <span>{t('hero.btn_docs')}</span>
              </a>
            </div>
            
            <div className="pt-8 flex items-center gap-8 text-neutral-600">
               <div className="flex items-center gap-2">
                 <Code className="w-4 h-4" />
                 <span className="text-xs">{t('hero.clean_code')}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Database className="w-4 h-4" />
                 <span className="text-xs">{t('hero.scalable')}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Globe className="w-4 h-4" />
                 <span className="text-xs">{t('hero.global')}</span>
               </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyber-green to-pink-600 opacity-30 blur"></div>
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
                    <span className="ml-8 text-white">speed:</span> <span className="text-pink-400">'MAX_VELOCITY'</span>,
                  </div>
                  <div className="flex">
                    <span className="text-neutral-600 w-8 select-none">07</span>
                    <span className="ml-8 text-white">style:</span> <span className="text-pink-400">'CYBERPUNK'</span>
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
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;