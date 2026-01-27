import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const WireframeGeometry: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [themeIndex, setThemeIndex] = useState(0);
    const [isStar, setIsStar] = useState(false);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const config = {
            activePaletteIndex: themeIndex,
            isMorphed: isStar,
            morphProgress: 0,
        };

        const colorPalettes = [
            [new THREE.Color(0x22d3ee), new THREE.Color(0x3b82f6), new THREE.Color(0x9333ea), new THREE.Color(0x7e22ce)],
            [new THREE.Color(0xF59E0B), new THREE.Color(0xF97316), new THREE.Color(0xDC2626), new THREE.Color(0x7F1D1D)],
            [new THREE.Color(0x10B981), new THREE.Color(0xA3E635), new THREE.Color(0xFACC15), new THREE.Color(0xFB923C)]
        ];

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1200);
        camera.position.set(0, 0, 40);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            powerPreference: "high-performance",
            alpha: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const starField = new THREE.Points(
            new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 2000 * 3 }, () => THREE.MathUtils.randFloatSpread(200)), 3)),
            new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, sizeAttenuation: true, depthWrite: false, opacity: 0.5, transparent: true })
        );
        scene.add(starField);

        const controls = new OrbitControls(camera, renderer.domElement);
        Object.assign(controls, {
            enableDamping: true,
            dampingFactor: 0.05,
            rotateSpeed: 0.5,
            minDistance: 10,
            maxDistance: 100,
            autoRotate: true,
            autoRotateSpeed: 0.5,
            enablePan: false,
            enableZoom: false
        });

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
        composer.addPass(bloomPass);
        composer.addPass(new FilmPass(0.1, false));
        composer.addPass(new OutputPass());

        const pulseUniforms = {
            uTime: { value: 0.0 },
            uPulsePositions: { value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)] },
            uPulseTimes: { value: [-1e3, -1e3, -1e3] },
            uPulseSpeed: { value: 15.0 },
        };

        const sharedShaderCode = `
            uniform float uTime;
            uniform vec3 uPulsePositions[3];
            uniform float uPulseTimes[3];
            uniform float uPulseSpeed;
            float getPulseIntensity(vec3 worldPos) {
                float totalIntensity = 0.0;
                for (int i = 0; i < 3; i++) {
                    if (uPulseTimes[i] < 0.0) continue;
                    float timeSinceClick = uTime - uPulseTimes[i];
                    if (timeSinceClick < 0.0 || timeSinceClick > 3.5) continue;
                    float pulseRadius = timeSinceClick * uPulseSpeed;
                    float distToClick = distance(worldPos, uPulsePositions[i]);
                    float pulseThickness = 4.0;
                    float waveProximity = abs(distToClick - pulseRadius);
                    totalIntensity += smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.5, 0.0, timeSinceClick);
                }
                return min(totalIntensity, 1.0);
            }`;

        const nodeShader = {
            vertexShader: `
                ${sharedShaderCode}
                attribute vec3 color;
                varying vec3 vColor;
                varying float vPulseIntensity;
                #include <morphtarget_pars_vertex>
                void main() {
                    vColor = color;
                    vec3 transformed = vec3(position);
                    #include <morphtarget_vertex>
                    vec3 worldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
                    vPulseIntensity = getPulseIntensity(worldPos);
                    float pointSize = 1.0 + vPulseIntensity * 5.0;
                    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
                    gl_PointSize = pointSize * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }`,
            fragmentShader: `
                varying vec3 vColor;
                varying float vPulseIntensity;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    vec3 finalColor = vColor;
                    if (vPulseIntensity > 0.0) {
                        finalColor = mix(vColor, vec3(1.0), vPulseIntensity);
                        finalColor *= (1.0 + vPulseIntensity * 0.5);
                    }
                    float alpha = (1.0 - dist * 2.0) * (1.0 + vPulseIntensity);
                    gl_FragColor = vec4(finalColor, alpha);
                }`
        };

        const connectionShader = {
            vertexShader: `
                ${sharedShaderCode}
                attribute vec3 color;
                varying vec3 vColor;
                varying float vPulseIntensity;
                #include <morphtarget_pars_vertex>
                void main() {
                    vColor = color;
                    vec3 transformed = vec3(position);
                    #include <morphtarget_vertex>
                    vec3 worldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
                    vPulseIntensity = getPulseIntensity(worldPos);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                }`,
            fragmentShader: `
                varying vec3 vColor;
                varying float vPulseIntensity;
                void main() {
                    vec3 finalColor = vColor;
                    if (vPulseIntensity > 0.0) {
                        finalColor = mix(vColor, vec3(1.0), vPulseIntensity);
                        finalColor *= (1.0 + vPulseIntensity * 0.5);
                    }
                    gl_FragColor = vec4(finalColor, 0.2 + vPulseIntensity * 0.6);
                }`
        };

        const scale = 15;
        const baseGeometry = new THREE.IcosahedronGeometry(scale, 4);
        const sphereVertices = [];
        const spherePositions = baseGeometry.attributes.position.array;
        const uniqueVerticesMap = new Map();

        for (let i = 0; i < spherePositions.length; i += 3) {
            const key = `${spherePositions[i].toFixed(3)},${spherePositions[i + 1].toFixed(3)},${spherePositions[i + 2].toFixed(3)}`;
            if (!uniqueVerticesMap.has(key)) {
                const vertex = new THREE.Vector3(spherePositions[i], spherePositions[i + 1], spherePositions[i + 2]);
                uniqueVerticesMap.set(key, vertex);
                sphereVertices.push(vertex);
            }
        }

        const starVertices = sphereVertices.map(v => {
            const v_clone = v.clone();
            const spherical = new THREE.Spherical().setFromVector3(v_clone);
            const spikeFactor = 0.4 * Math.sin(spherical.phi * 6) * Math.sin(spherical.theta * 6);
            spherical.radius *= 1 + spikeFactor;
            return new THREE.Vector3().setFromSpherical(spherical);
        });

        const edgeGeometry = new THREE.EdgesGeometry(baseGeometry, 1);
        const sphereConnectionPositions = edgeGeometry.attributes.position.array;
        const starConnectionPositions = new Float32Array(sphereConnectionPositions.length);
        const tempVec = new THREE.Vector3();

        for (let i = 0; i < sphereConnectionPositions.length; i += 3) {
            tempVec.set(sphereConnectionPositions[i], sphereConnectionPositions[i + 1], sphereConnectionPositions[i + 2]);
            const spherical = new THREE.Spherical().setFromVector3(tempVec);
            const spikeFactor = 0.4 * Math.sin(spherical.phi * 6) * Math.sin(spherical.theta * 6);
            spherical.radius *= 1 + spikeFactor;
            tempVec.setFromSpherical(spherical);
            starConnectionPositions[i] = tempVec.x;
            starConnectionPositions[i + 1] = tempVec.y;
            starConnectionPositions[i + 2] = tempVec.z;
        }

        const palette = colorPalettes[config.activePaletteIndex];
        const nodeGeometry = new THREE.BufferGeometry();
        nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sphereVertices.flatMap(v => [v.x, v.y, v.z]), 3));
        nodeGeometry.morphAttributes.position = [new THREE.Float32BufferAttribute(starVertices.flatMap(v => [v.x, v.y, v.z]), 3)];

        const nodeColors = new Float32Array(sphereVertices.length * 3);
        for (let i = 0; i < sphereVertices.length; i++) {
            const color = palette[Math.floor(Math.random() * palette.length)];
            nodeColors[i * 3] = color.r;
            nodeColors[i * 3 + 1] = color.g;
            nodeColors[i * 3 + 2] = color.b;
        }
        nodeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

        const nodeMaterial = new THREE.ShaderMaterial({
            uniforms: pulseUniforms,
            vertexShader: nodeShader.vertexShader,
            fragmentShader: nodeShader.fragmentShader,
            transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
        });
        const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
        scene.add(nodesMesh);

        const connectionGeometry = new THREE.BufferGeometry();
        connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sphereConnectionPositions, 3));
        connectionGeometry.morphAttributes.position = [new THREE.Float32BufferAttribute(starConnectionPositions, 3)];

        const connectionColors = new Float32Array(sphereConnectionPositions.length);
        for (let i = 0; i < sphereConnectionPositions.length / 6; i++) {
            const color = palette[Math.floor(Math.random() * palette.length)];
            connectionColors[i * 6] = connectionColors[i * 6 + 3] = color.r;
            connectionColors[i * 6 + 1] = connectionColors[i * 6 + 4] = color.g;
            connectionColors[i * 6 + 2] = connectionColors[i * 6 + 5] = color.b;
        }
        connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));

        const connectionMaterial = new THREE.ShaderMaterial({
            uniforms: pulseUniforms,
            vertexShader: connectionShader.vertexShader,
            fragmentShader: connectionShader.fragmentShader,
            transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
        });
        const connectionsMesh = new THREE.LineSegments(connectionGeometry, connectionMaterial);
        scene.add(connectionsMesh);

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        let lastPulseIndex = 0;

        const handlePointer = (clientX: number, clientY: number) => {
            const rect = renderer.domElement.getBoundingClientRect();
            pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);

            const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), scale);
            const intersectionPoint = new THREE.Vector3();
            if (raycaster.ray.intersectSphere(sphere, intersectionPoint)) {
                const time = clock.getElapsedTime();
                lastPulseIndex = (lastPulseIndex + 1) % 3;
                pulseUniforms.uPulsePositions.value[lastPulseIndex].copy(intersectionPoint);
                pulseUniforms.uPulseTimes.value[lastPulseIndex] = time;
            }
        };

        const onClick = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
        renderer.domElement.addEventListener('mousedown', onClick);

        const clock = new THREE.Clock();
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            pulseUniforms.uTime.value = t;

            const morphTarget = config.isMorphed ? 1 : 0;
            config.morphProgress = THREE.MathUtils.lerp(config.morphProgress, morphTarget, 0.05);

            nodesMesh.morphTargetInfluences![0] = config.morphProgress;
            connectionsMesh.morphTargetInfluences![0] = config.morphProgress;

            starField.rotation.y += 0.0001;
            controls.update();
            composer.render();
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousedown', onClick);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            nodeGeometry.dispose();
            connectionGeometry.dispose();
            nodeMaterial.dispose();
            connectionMaterial.dispose();
        };
    }, [themeIndex, isStar]);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[300px] overflow-hidden group">
            <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2 pointer-events-auto bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10">
                    {[0, 1, 2].map((idx) => (
                        <button
                            key={idx}
                            onClick={() => setThemeIndex(idx)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${themeIndex === idx ? 'border-white scale-110' : 'border-transparent'
                                }`}
                            style={{
                                background: idx === 0 ? 'linear-gradient(45deg, #00dfff, #a000ff)' :
                                    idx === 1 ? 'linear-gradient(45deg, #F59E0B, #DC2626)' :
                                        'linear-gradient(45deg, #10B981, #FB923C)'
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setIsStar(!isStar)}
                    className="pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-[10px] font-mono text-white/70 hover:text-white transition-colors"
                >
                    MORPH: {isStar ? 'STAR' : 'SPHERE'}
                </button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    Click to pulse • Drag to rotate
                </span>
            </div>
        </div>
    );
};

export default WireframeGeometry;
