import React from 'react';
import { motion } from 'framer-motion';

interface GlowingButtonProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    target?: string;
    rel?: string;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, onClick, href, className = '', ...props }) => {
    const Component = href ? motion.a : motion.button;

    return (
        <div className={`relative group ${className}`}>
            {/* Animated Gradient Border */}
            <div className="absolute -inset-[1px] rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,cyan_360deg)] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 3,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    style={{ width: '300%', height: '300%', left: '-100%', top: '-100%' }}
                />
            </div>

            {/* Inner Content */}
            <Component
                href={href}
                onClick={onClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center w-full h-full px-8 py-3 bg-black/90 text-white rounded-full backdrop-blur-3xl border border-white/10"
                {...props as any}
            >
                {children}
            </Component>
        </div>
    );
};

export default GlowingButton;
