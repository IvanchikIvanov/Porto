import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DecodingText from './ui/DecodingText';
import TerminalBox from './ui/TerminalBox';
import MagneticButton from './ui/MagneticButton';
import WireframeGeometry from './ui/WireframeGeometry';
import FluidArt from './ui/FluidArt';
import { useApp } from '../context/AppContext';

const Playground: React.FC = () => {
    const { t } = useApp();
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.8)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></span>
                            <span className="text-yellow-500 font-mono text-sm tracking-widest">EXPERIMENTAL // R&D</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white font-mono leading-none">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600">LAB</span>
                        </h2>
                    </div>

                    <p className="text-neutral-400 font-mono max-w-md text-right">
                        A collection of UI experiments, physics simulations, and interaction patterns not suitable for standard production.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Experiment 1: Magnetic Buttons */}
                    <TerminalBox title="magnet_physics.ts" borderColor="yellow">
                        <div className="h-48 flex flex-col items-center justify-center gap-6 bg-neutral-900/50 rounded-lg p-4 mb-4">
                            <MagneticButton>
                                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-yellow-400 transition-colors">
                                    HOVER ME
                                </button>
                            </MagneticButton>
                            <div className="flex gap-4">
                                <MagneticButton>
                                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">A</div>
                                </MagneticButton>
                                <MagneticButton>
                                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">B</div>
                                </MagneticButton>
                            </div>
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                            <span className="text-yellow-500">const</span> force = useMotionValue(0);
                        </div>
                    </TerminalBox>

                    {/* Experiment 2: Glitch Effects (Visual) */}
                    <TerminalBox title="visual_distortion.glsl" borderColor="gray">
                        <div className="h-48 flex items-center justify-center bg-black overflow-hidden relative mb-4 rounded-lg group">
                            <div className="absolute inset-0 bg-neutral-900 group-hover:bg-neutral-800 transition-colors"></div>

                            <h3 className="text-4xl font-black text-white relative z-10 mix-blend-difference group-hover:skew-x-12 transition-transform duration-100">
                                GLITCH
                            </h3>
                            <h3 className="text-4xl font-black text-red-500 absolute z-0 left-[calc(50%+2px)] opacity-0 group-hover:opacity-70 mix-blend-screen">
                                GLITCH
                            </h3>
                            <h3 className="text-4xl font-black text-blue-500 absolute z-0 left-[calc(50%-2px)] opacity-0 group-hover:opacity-70 mix-blend-screen">
                                GLITCH
                            </h3>
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                            <span className="text-purple-400">#version</span> 300 es
                        </div>
                    </TerminalBox>

                    {/* Experiment 3: Morphing Geometry */}
                    <TerminalBox title="geometry_morph.ts" borderColor="gray">
                        <div className="h-64 bg-black/40 rounded-lg overflow-hidden relative mb-4">
                            <WireframeGeometry />
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                            <span className="text-blue-400">uniform</span> float uTime;
                        </div>
                    </TerminalBox>

                    {/* Experiment 4: Ink Simulation */}
                    <TerminalBox title="fluid_dynamics.glsl" borderColor="cyan">
                        <div className="h-64 bg-black rounded-lg overflow-hidden relative mb-4">
                            <FluidArt className="absolute inset-0" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-cyan-500/30 font-mono text-sm uppercase tracking-widest">Move Surface</span>
                            </div>
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                            <span className="text-cyan-400">#define</span> DISSIPATION 0.98
                        </div>
                    </TerminalBox>

                </div>
            </div>
        </section>
    );
};

export default Playground;
