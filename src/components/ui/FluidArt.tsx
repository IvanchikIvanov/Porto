import React, { useEffect, useRef } from 'react';
import WebGLFluidEnhanced from 'webgl-fluid-enhanced';

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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Correct usage for webgl-fluid-enhanced v0.8.0+
        const fluid = new WebGLFluidEnhanced(containerRef.current);

        fluid.setConfig({
            simResolution: 128,
            dyeResolution: 512,
            densityDissipation: dissipation,
            velocityDissipation: 0.98,
            pressure: 0.8,
            curl: 30,
            splatRadius: 0.2,
            splatForce: 6000 * (sensitivity / 20),
            shading: true,
            colorful: true,
            colorPalette: ['#00dfff', '#a000ff', '#007bff', '#00b8d4', '#8e00ce'],
            hover: true,
            bloom: true,
            bloomIterations: 8,
            bloomResolution: 256,
            bloomIntensity: 1.2,
            bloomThreshold: 0.4,
            bloomSoftKnee: 0.7,
            sunrays: false,
            transparent: true,
            brightness: colorScale * 0.5
        });

        fluid.start();

        return () => {
            fluid.stop();
        };
    }, [sensitivity, dissipation, colorScale]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full block cursor-crosshair ${className}`}
            style={{ touchAction: 'none' }}
        />
    );
};

export default FluidArt;
