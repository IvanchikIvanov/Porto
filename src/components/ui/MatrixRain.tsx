import React, { useEffect, useRef } from 'react';

interface Props {
    className?: string;
}

const MatrixRain: React.FC<Props> = ({ className = "" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = canvas.offsetWidth || 600;
        let height = canvas.offsetHeight || 600;

        // Characters to use
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]/*-+=$#@!?';
        const charArray = chars.split('');

        // Column settings
        const fontSize = 14;
        let columns = Math.floor(width / fontSize);
        let drops: number[] = [];

        // Colors - Cyan palette
        const primaryColor = '#22d3ee'; // Cyan
        const primaryColorDim = 'rgba(34, 211, 238, 0.6)';

        const initDrops = () => {
            columns = Math.floor(width / fontSize);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100;
            }
        };

        const handleResize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
            initDrops();
        };

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Pick a random character
                const char = charArray[Math.floor(Math.random() * charArray.length)];

                // Calculate position
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Create gradient effect based on position
                const progress = (y / height);

                // Cyan color scheme
                const alpha = Math.min(1, progress + 0.3);
                ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.8})`;

                // Draw head character brighter (white/light cyan)
                if (drops[i] > 0 && drops[i] < height / fontSize) {
                    ctx.fillStyle = 'rgba(200, 255, 255, 0.9)'; // Light cyan head
                    ctx.fillText(char, x, y);

                    // Draw trailing character in violet
                    ctx.fillStyle = primaryColor;
                    ctx.fillText(charArray[Math.floor(Math.random() * charArray.length)], x, y - fontSize);
                } else {
                    ctx.fillText(char, x, y);
                }

                // Reset drop to top with random delay
                if (y > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                // Normal speed
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Event Listeners
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(canvas);

        // Init
        handleResize();
        draw();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full opacity-60 ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default MatrixRain;
