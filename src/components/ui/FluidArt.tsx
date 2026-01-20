import React, { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid-enhanced';

interface FluidArtProps {
    className?: string;
    sensitivity?: number;
    dissipation?: number;
    colorScale?: number;
}

const FluidArt: React.FC<FluidArtProps> = ({
    className,
    sensitivity = 20,
    dissipation = 0.97,
    colorScale = 1.0
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        webGLFluidEnhanced.simulation(canvasRef.current, {
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 512,
            DENSITY_DISSIPATION: dissipation,
            VELOCITY_DISSIPATION: 0.98,
            PRESSURE: 0.8,
            CURL: 30,
            SPLAT_RADIUS: 0.2,
            SPLAT_FORCE: 6000 * (sensitivity / 20),
            SHADING: true,
            COLORFUL: true,
            COLOR_PALETTE: ['#22d3ee', '#9333ea', '#3b82f6', '#06b6d4', '#7e22ce'],
            HOVER: true,
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 1.2,
            BLOOM_THRESHOLD: 0.4,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: false,
            PAUSED: false,
            BACK_COLOR: { r: 0, g: 0, b: 0 },
            TRANSPARENT: true,
        });

        // The library manages its own events, but we should handle resizing
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = canvasRef.current.clientWidth;
                canvasRef.current.height = canvasRef.current.clientHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            // Note: webgl-fluid-enhanced doesn't always expose a cleanup, 
            // but the internal listeners are usually attached to the canvas.
        };
    }, [sensitivity, dissipation, colorScale]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full block cursor-crosshair ${className}`}
            style={{ touchAction: 'none' }}
        />
    );
};

export default FluidArt;
