import React from 'react';
import { motion } from 'framer-motion';
import FluidArt from './ui/FluidArt';
import DecodingText from './ui/DecodingText';
import { useApp } from '../context/AppContext';

const DynamicShowcase: React.FC = () => {
    const { t } = useApp();
    return (
        <section className="h-screen relative overflow-hidden bg-black border-y border-neutral-800">
            {/* Full-screen Fluid Canvas */}
            <div className="absolute inset-0 z-0">
                <FluidArt
                    className="w-full h-full opacity-80"
                    sensitivity={15}
                    dissipation={0.99}
                    colorScale={1.5}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-px w-12 bg-cyan-500"></span>
                        <span className="text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase">{t('showcase.badge')}</span>
                        <span className="h-px w-12 bg-cyan-500"></span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        {t('showcase.title_1')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            {t('showcase.title_2')}
                        </span>
                    </h2>

                    <p className="text-neutral-400 text-lg md:text-xl font-mono max-w-2xl mx-auto mb-12">
                        {t('showcase.desc')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="px-6 py-3 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 rounded-full font-mono text-xs uppercase tracking-widest backdrop-blur-md">
                            {t('showcase.webgl')}
                        </div>
                        <div className="px-6 py-3 border border-blue-500/30 bg-blue-500/5 text-blue-400 rounded-full font-mono text-xs uppercase tracking-widest backdrop-blur-md">
                            {t('showcase.fps')}
                        </div>
                        <div className="px-6 py-3 border border-purple-500/30 bg-purple-500/5 text-purple-400 rounded-full font-mono text-xs uppercase tracking-widest backdrop-blur-md">
                            {t('showcase.bloom')}
                        </div>
                    </div>
                </motion.div>

                {/* Interaction Prompt */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-6 h-10 border-2 border-neutral-700 rounded-full p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1 h-3 bg-neutral-400 rounded-full"
                        />
                    </div>
                    <span className="text-neutral-500 font-mono text-[10px] tracking-[0.5em] uppercase">{t('showcase.move_to_interact')}</span>
                </motion.div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 text-neutral-800 font-mono text-[10px] select-none">
                {t('showcase.fluid_buffer')}
            </div>
            <div className="absolute top-8 right-8 text-neutral-800 font-mono text-[10px] select-none text-right">
                {t('showcase.stable_solver')}
            </div>
            <div className="absolute bottom-8 left-8 text-neutral-800 font-mono text-[10px] select-none">
                {t('showcase.latency')}
            </div>
            <div className="absolute bottom-8 right-8 text-neutral-800 font-mono text-[10px] select-none text-right">
                {t('showcase.redesign')}
            </div>
        </section>
    );
};

export default DynamicShowcase;
