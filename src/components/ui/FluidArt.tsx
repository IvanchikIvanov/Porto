import React, { useEffect, useRef } from 'react';

interface FluidArtProps {
    className?: string;
    sensitivity?: number;
    dissipation?: number;
    colorScale?: number;
}

const FluidArt: React.FC<FluidArtProps> = ({
    className,
    sensitivity = 20,
    dissipation = 0.98,
    colorScale = 1.0
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false
        });
        if (!gl) return;

        // Extensions
        gl.getExtension('OES_texture_float');
        gl.getExtension('OES_texture_float_linear');

        // Shaders
        const baseVertexShader = `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 texelSize;

            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const copyShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2 uTexture;
            void main () {
                gl_FragColor = texture2D(uTexture, vUv);
            }
        `;

        const displayShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2 uTexture;
            uniform sampler2 uBloom;
            void main () {
                vec3 base = texture2D(uTexture, vUv).rgb;
                vec3 bloom = texture2D(uBloom, vUv).rgb;
                gl_FragColor = vec4(base + bloom, 1.0);
            }
        `;

        const bloomPrefilterShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2 uTexture;
            void main () {
                vec3 color = texture2D(uTexture, vUv).rgb;
                float brightness = max(color.r, max(color.g, color.b));
                float threshold = 0.4;
                gl_FragColor = vec4(color * step(threshold, brightness), 1.0);
            }
        `;

        const bloomBlurShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2 uTexture;
            uniform vec2 texelSize;
            uniform vec2 direction;
            void main () {
                vec3 color = texture2D(uTexture, vUv).rgb * 0.227027;
                color += texture2D(uTexture, vUv + direction * texelSize * 1.384615).rgb * 0.316216;
                color += texture2D(uTexture, vUv - direction * texelSize * 1.384615).rgb * 0.316216;
                color += texture2D(uTexture, vUv + direction * texelSize * 3.230769).rgb * 0.070270;
                color += texture2D(uTexture, vUv - direction * texelSize * 3.230769).rgb * 0.070270;
                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const splatShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2 uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            void main () {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `;

        const advectionShader = `
            precision highp float;
            varying vec2 vUv;
            uniform sampler2 uVelocity;
            uniform sampler2 uSource;
            uniform vec2 texelSize;
            uniform float dt;
            uniform float dissipation;
            void main () {
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy;
                gl_FragColor = dissipation * texture2D(uSource, coord);
            }
        `;

        const divergenceShader = `
            precision highp float;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2 uVelocity;
            void main () {
                float L = texture2D(uVelocity, vL).x;
                float R = texture2D(uVelocity, vR).x;
                float T = texture2D(uVelocity, vT).y;
                float B = texture2D(uVelocity, vB).y;
                float div = 0.5 * (R - L + T - B);
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `;

        const pressureShader = `
            precision highp float;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2 uPressure;
            uniform sampler2 uDivergence;
            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                float div = texture2D(uDivergence, vUv).x;
                float p = (L + R + B + T - div) * 0.25;
                gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
            }
        `;

        const gradientSubtractShader = `
            precision highp float;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2 uPressure;
            uniform sampler2 uVelocity;
            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity -= vec2(R - L, T - B);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `;

        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSource: string, fsSource: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
            gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
            }
            return program;
        };

        const programs = {
            copy: createProgram(baseVertexShader, copyShader),
            display: createProgram(baseVertexShader, displayShader),
            splat: createProgram(baseVertexShader, splatShader),
            advection: createProgram(baseVertexShader, advectionShader),
            divergence: createProgram(baseVertexShader, divergenceShader),
            pressure: createProgram(baseVertexShader, pressureShader),
            gradientSubtract: createProgram(baseVertexShader, gradientSubtractShader),
            bloomPrefilter: createProgram(baseVertexShader, bloomPrefilterShader),
            bloomBlur: createProgram(baseVertexShader, bloomBlurShader)
        };

        interface FBO {
            tex: WebGLTexture;
            fbo: WebGLFramebuffer;
            w: number;
            h: number;
        }

        interface DoubleFBO {
            read: FBO;
            write: FBO;
            swap: () => void;
        }

        const createFBO = (w: number, h: number): FBO => {
            const tex = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            const fbo = gl.createFramebuffer()!;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

            return { tex, fbo, w, h };
        };

        const createDoubleFBO = (w: number, h: number): DoubleFBO => {
            let fbo1 = createFBO(w, h);
            let fbo2 = createFBO(w, h);
            return {
                get read() { return fbo1; },
                get write() { return fbo2; },
                swap() { [fbo1, fbo2] = [fbo2, fbo1]; }
            };
        };

        const simRes = 128; // Lower for performance, fluid looks fine
        const dyeRes = 512;
        const bloomRes = 256;

        const velocity = createDoubleFBO(simRes, simRes);
        const density = createDoubleFBO(dyeRes, dyeRes);
        const divergence = createFBO(simRes, simRes);
        const pressure = createDoubleFBO(simRes, simRes);
        const bloom = createDoubleFBO(bloomRes, bloomRes);

        const quadBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const blit = (target: WebGLFramebuffer | null, w: number, h: number) => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, target);
            gl.viewport(0, 0, w, h);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        // Pointer state
        const pointer = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            moved: false,
            pressed: false
        };

        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
            const rect = canvas.getBoundingClientRect();
            const nx = (x - rect.left) / rect.width;
            const ny = 1.0 - (y - rect.top) / rect.height;
            pointer.dx = nx - pointer.x;
            pointer.dy = ny - pointer.y;
            pointer.x = nx;
            pointer.y = ny;
            pointer.moved = true;
        };

        const handlePointerDown = () => { pointer.pressed = true; };
        const handlePointerUp = () => { pointer.pressed = false; };

        canvas.addEventListener('mousemove', handlePointerMove);
        canvas.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('mouseup', handlePointerUp);
        canvas.addEventListener('touchstart', handlePointerMove);
        canvas.addEventListener('touchmove', handlePointerMove);
        canvas.addEventListener('touchend', handlePointerUp);

        const splat = (target: DoubleFBO, x: number, y: number, dx: number, dy: number, color: number[]) => {
            gl.useProgram(programs.splat);
            gl.uniform1i(gl.getUniformLocation(programs.splat, 'uTarget'), 0);
            gl.bindTexture(gl.TEXTURE_2D, target.read.tex);
            gl.uniform1f(gl.getUniformLocation(programs.splat, 'aspectRatio'), canvas.width / canvas.height);
            gl.uniform2f(gl.getUniformLocation(programs.splat, 'point'), x, y);
            gl.uniform3f(gl.getUniformLocation(programs.splat, 'color'), color[0], color[1], color[2]);
            gl.uniform1f(gl.getUniformLocation(programs.splat, 'radius'), 0.002);
            blit(target.write.fbo, target.read.w, target.read.h);
            target.swap();
        };

        const multipleSplats = (amount: number) => {
            for (let i = 0; i < amount; i++) {
                const color = [Math.random() * 10, Math.random() * 10, 1.0];
                const x = Math.random();
                const y = Math.random();
                const dx = (Math.random() - 0.5) * 0.1;
                const dy = (Math.random() - 0.5) * 0.1;
                splat(velocity, x, y, dx, dy, color);
                splat(density, x, y, dx, dy, [Math.random() * colorScale, Math.random() * colorScale, Math.random() * colorScale]);
            }
        };

        // Initial splats
        multipleSplats(10);

        let lastTime = Date.now();
        let nextAmbientSplat = Date.now() + 1000;

        const update = () => {
            const now = Date.now();
            const dt = Math.min((now - lastTime) / 1000, 0.016);
            lastTime = now;

            // Ambient Splats
            if (now > nextAmbientSplat) {
                multipleSplats(1);
                nextAmbientSplat = now + 500 + Math.random() * 1500;
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
            const posAttr = gl.getAttribLocation(programs.copy, 'aPosition');
            gl.enableVertexAttribArray(posAttr);
            gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

            // Interaction
            if (pointer.moved) {
                const color = [pointer.dx * sensitivity, pointer.dy * sensitivity, 1.0];
                splat(velocity, pointer.x, pointer.y, pointer.dx, pointer.dy, color);

                // Fancy color palette: Indigo, Cyan, Magenta mixtures
                const time = now * 0.001;
                const r = Math.sin(time) * 0.5 + 0.5;
                const g = Math.cos(time * 0.5) * 0.5 + 0.5;
                const b = Math.sin(time * 0.7) * 0.5 + 0.5;

                const inkColor = [r * colorScale, g * colorScale, b * colorScale];
                splat(density, pointer.x, pointer.y, pointer.dx, pointer.dy, inkColor);
                pointer.moved = false;
            }

            // Sim Steps
            gl.useProgram(programs.advection);
            gl.uniform1f(gl.getUniformLocation(programs.advection, 'dt'), dt);
            gl.uniform1f(gl.getUniformLocation(programs.advection, 'dissipation'), 0.98);
            gl.uniform2f(gl.getUniformLocation(programs.advection, 'texelSize'), 1 / velocity.read.w, 1 / velocity.read.h);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uVelocity'), 0);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 0);

            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            blit(velocity.write.fbo, velocity.read.w, velocity.read.h);
            velocity.swap();

            gl.uniform1f(gl.getUniformLocation(programs.advection, 'dissipation'), dissipation);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.activeTexture(gl.TEXTURE1);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 1);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            blit(density.write.fbo, density.read.w, density.read.h);
            density.swap();
            gl.activeTexture(gl.TEXTURE0);

            gl.useProgram(programs.divergence);
            gl.uniform2f(gl.getUniformLocation(programs.divergence, 'texelSize'), 1 / velocity.read.w, 1 / velocity.read.h);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            blit(divergence.fbo, divergence.w, divergence.h);

            gl.useProgram(programs.pressure);
            gl.uniform2f(gl.getUniformLocation(programs.pressure, 'texelSize'), 1 / velocity.read.w, 1 / velocity.read.h);
            gl.bindTexture(gl.TEXTURE_2D, divergence.tex);
            for (let i = 0; i < 20; i++) {
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
                blit(pressure.write.fbo, pressure.read.w, pressure.read.h);
                pressure.swap();
            }
            gl.activeTexture(gl.TEXTURE0);

            gl.useProgram(programs.gradientSubtract);
            gl.uniform2f(gl.getUniformLocation(programs.gradientSubtract, 'texelSize'), 1 / velocity.read.w, 1 / velocity.read.h);
            gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            blit(velocity.write.fbo, velocity.read.w, velocity.read.h);
            velocity.swap();
            gl.activeTexture(gl.TEXTURE0);

            // Bloom passes
            gl.useProgram(programs.bloomPrefilter);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            blit(bloom.write.fbo, bloom.read.w, bloom.read.h);
            bloom.swap();

            gl.useProgram(programs.bloomBlur);
            gl.uniform2f(gl.getUniformLocation(programs.bloomBlur, 'texelSize'), 1 / bloom.read.w, 1 / bloom.read.h);
            // Horizontal
            gl.uniform2f(gl.getUniformLocation(programs.bloomBlur, 'direction'), 1, 0);
            gl.bindTexture(gl.TEXTURE_2D, bloom.read.tex);
            blit(bloom.write.fbo, bloom.read.w, bloom.read.h);
            bloom.swap();
            // Vertical
            gl.uniform2f(gl.getUniformLocation(programs.bloomBlur, 'direction'), 0, 1);
            gl.bindTexture(gl.TEXTURE_2D, bloom.read.tex);
            blit(bloom.write.fbo, bloom.read.w, bloom.read.h);
            bloom.swap();

            // Display
            gl.useProgram(programs.display);
            gl.uniform1i(gl.getUniformLocation(programs.display, 'uTexture'), 0);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.display, 'uBloom'), 1);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, bloom.read.tex);
            blit(null, canvas.width, canvas.height);
            gl.activeTexture(gl.TEXTURE0);

            requestAnimationFrame(update);
        };

        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            // Texel size uniform update if needed
            Object.values(programs).forEach(p => {
                gl.useProgram(p);
                gl.uniform2f(gl.getUniformLocation(p, 'texelSize'), 1 / canvas.width, 1 / canvas.height);
            });
        };
        window.addEventListener('resize', resize);
        resize();
        update();

        return () => {
            canvas.removeEventListener('mousemove', handlePointerMove);
            canvas.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('mouseup', handlePointerUp);
            canvas.removeEventListener('touchstart', handlePointerMove);
            canvas.removeEventListener('touchmove', handlePointerMove);
            canvas.removeEventListener('touchend', handlePointerUp);
            window.removeEventListener('resize', resize);
        };
    }, [sensitivity, dissipation, colorScale]);

    return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};

export default FluidArt;
