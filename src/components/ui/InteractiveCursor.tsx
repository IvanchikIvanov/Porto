import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center the 32px cursor
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the target or its parent is clickable
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer');

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference hidden md:block" // Hidden on mobile
            style={{
                x: cursorX,
                y: cursorY,
            }}
        >
            <motion.div
                className={`w-full h-full rounded-full border-2 border-white transition-all duration-200 ease-out ${isHovering ? 'scale-150 bg-white' : 'scale-100 bg-transparent'
                    }`}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
            />
        </motion.div>
    );
};

export default InteractiveCursor;
