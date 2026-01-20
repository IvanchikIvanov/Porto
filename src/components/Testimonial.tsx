import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import GlowingButton from './ui/GlowingButton';
import { MoveUpRight } from 'lucide-react';

const Testimonial: React.FC = () => {
    const { t } = useApp();

    return (
        <section className="py-32 bg-cyber-black relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cyber-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Label */}
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-1.5 h-1.5 bg-cyber-accent rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-[0.2em]">{t('testimonial.label')}</span>
                </div>

                {/* Big Headline */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-[1.1] mb-20">
                    <span className="italic block">The modern investor</span>
                    <span className="block font-sans font-bold tracking-tighter">doesn't fit in a</span>
                    <span className="block italic text-neutral-400">single market – they stake,</span>
                    <span className="block italic text-neutral-500">they hedge, compound smart.</span>
                    <span className="block mt-4">
                        <span className="font-serif italic text-white">This protocol </span>
                        <span className="font-sans font-bold">was made for them.</span>
                    </span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

                    {/* Portrait Image */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-md grayscale hover:grayscale-0 transition-all duration-700"
                        >
                            <img
                                src="/images/portrait.jpg"
                                alt="Investor Portrait"
                                className="object-cover w-full h-full"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </motion.div>
                    </div>

                    {/* Quote Content */}
                    <div className="space-y-12 pb-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <span className="text-6xl font-serif text-neutral-700 absolute -top-8 -left-4">"</span>
                            <blockquote className="text-2xl md:text-3xl font-light text-neutral-300 leading-relaxed font-sans">
                                {t('testimonial.quote')}
                            </blockquote>
                        </motion.div>

                        <div className="h-px w-24 bg-cyber-primary/50" />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
                            <div className="flex items-center gap-2 border border-neutral-800 rounded-full px-4 py-2 bg-neutral-900/50 backdrop-blur-sm">
                                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Portfolio Volume</span>
                                <span className="text-xs font-bold text-cyber-primary">UP 17%</span>
                                <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Since Inception</span>
                                <MoveUpRight className="w-3 h-3 text-cyber-primary" />
                            </div>

                            <GlowingButton href="#invest" className="w-full sm:w-auto">
                                <span className="flex items-center gap-2 font-bold tracking-wide">
                                    Start Investing
                                </span>
                            </GlowingButton>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonial;
