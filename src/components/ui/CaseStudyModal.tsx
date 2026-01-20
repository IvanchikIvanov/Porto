import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code, Layers } from 'lucide-react';
import DecodingText from './DecodingText';

interface ProjectData {
    title: string;
    description: string;
    url: string;
    tech: string;
    fullDescription?: string; // More detailed description
    challenge?: string;
    solution?: string;
    images?: string[]; // Array of image URLs (placeholders for now)
}

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData | null;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, project }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                            className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-neutral-900/95 backdrop-blur z-10 border-b border-neutral-800 p-6 flex justify-between items-start">
                                <div>
                                    <div className="text-cyber-primary text-xs font-mono mb-2">CASE STUDY // {project.tech}</div>
                                    <h2 className="text-3xl font-bold text-white font-mono">
                                        <DecodingText text={project.title} />
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-8">
                                {/* Hero Image (Placeholder) */}
                                <div className="w-full h-64 bg-neutral-800 rounded-lg animate-pulse flex items-center justify-center text-neutral-600 font-mono">
                                    [PROJECT PREVIEW IMAGE]
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Left Column: Details */}
                                    <div className="md:col-span-2 space-y-6">
                                        <section>
                                            <h3 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
                                                <span className="text-cyber-primary">#</span> Challenge
                                            </h3>
                                            <p className="text-neutral-400 leading-relaxed">
                                                {project.challenge || "Identification of core problems effectively translated into technical requirements. The main goal was to create a seamless user experience while maintaining high performance under load."}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl text-white font-bold mb-3 flex items-center gap-2">
                                                <span className="text-cyber-primary">#</span> Solution
                                            </h3>
                                            <p className="text-neutral-400 leading-relaxed">
                                                {project.solution || "Implemented a robust architecture using modern technologies. Optimized rendering paths and utilized caching strategies to ensure sub-100ms response times."}
                                            </p>
                                        </section>
                                    </div>

                                    {/* Right Column: Meta */}
                                    <div className="space-y-6">
                                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                            <h4 className="text-sm text-neutral-500 uppercase tracking-wider mb-4 font-mono">Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.split(',').map((t, i) => (
                                                    <span key={i} className="px-2 py-1 bg-cyber-primary/20 text-cyber-primary text-xs rounded font-mono border border-cyber-primary/30">
                                                        {t.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full py-3 bg-white text-black font-bold text-center hover:bg-cyber-primary hover:text-white transition-all uppercase tracking-widest font-mono"
                                        >
                                            Visit Site <ExternalLink className="inline-block w-4 h-4 ml-2" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CaseStudyModal;
