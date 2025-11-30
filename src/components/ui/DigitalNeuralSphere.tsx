import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  connections: number[];
  px?: number;
  py?: number;
  scale?: number;
}

interface Pulse {
  path: number[];
  progress: number;
  speed: number;
}

interface Props {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  speed?: number;
}

const DigitalNeuralSphere: React.FC<Props> = ({
  className = "",
  nodeCount = 180,
  connectionDistance = 35,
  speed = 0.2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let width = canvas.offsetWidth || 600;
    let height = canvas.offsetHeight || 600;

    // Config
    const sphereRadius = Math.min(width, height) * 0.49;
    const nodes: Node[] = [];
    let pulses: Pulse[] = [];

    // Rotation state
    let rotationX = 0;
    let rotationY = 0;

    // Mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Color scheme: Purple to Blue gradient (more purple)
    const primaryColor = { r: 147, g: 51, b: 234 }; // Deep Purple (#9333ea)
    const accentColor = { r: 59, g: 130, b: 246 }; // Deep Blue (#3b82f6)

    // Helper: Generate points on a sphere (Fibonacci Sphere algorithm for even distribution)
    const initNodes = () => {
      nodes.length = 0;
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      for (let i = 0; i < nodeCount; i++) {
        const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y); // Radius at y
        const theta = phi * i; // Golden angle increment
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        nodes.push({
          id: i,
          x: x * sphereRadius,
          y: y * sphereRadius,
          z: z * sphereRadius,
          baseX: x * sphereRadius,
          baseY: y * sphereRadius,
          baseZ: z * sphereRadius,
          connections: []
        });
      }

      // Pre-calculate connections to save performance
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.baseX - otherNode.baseX;
          const dy = node.baseY - otherNode.baseY;
          const dz = node.baseZ - otherNode.baseZ;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if close enough in 3D space
          if (dist < sphereRadius * 0.35) {
             node.connections.push(j);
          }
        });
        // Limit connections per node for aesthetics
        node.connections = node.connections.slice(0, 4);
      });
    };

    // Helper: Resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      initNodes();
    };

    // Helper: Spawn a data pulse
    const spawnPulse = () => {
      if (nodes.length === 0) return;
      const startIdx = Math.floor(Math.random() * nodes.length);
      const node = nodes[startIdx];
      if (node.connections.length > 0) {
        const endIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
        pulses.push({
          path: [startIdx, endIdx],
          progress: 0,
          speed: 0.02 + Math.random() * 0.03
        });
      }
    };

    // Helper: 3D Projection
    const project = (x: number, y: number, z: number) => {
      const scale = 800 / (800 + z); // Perspective projection
      const x2d = (x * scale) + width / 2;
      const y2d = (y * scale) + height / 2;
      return { x: x2d, y: y2d, scale, z };
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update rotation based on mouse (optional, can be disabled)
      targetRotationY = (mouseX - width / 2) * 0.0003;
      targetRotationX = (mouseY - height / 2) * 0.0003;

      rotationY += (targetRotationY - rotationY) * 0.03;
      rotationX += (targetRotationX - rotationX) * 0.03;

      // Auto rotation - continuous spinning
      rotationY += speed * 0.02;
      rotationX += speed * 0.015;

      // Update node positions
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      // 1. Transform Nodes
      const projectedNodes = nodes.map(node => {
        // Rotate Y
        let x = node.baseX * cosY - node.baseZ * sinY;
        let z = node.baseZ * cosY + node.baseX * sinY;

        // Rotate X
        let y = node.baseY * cosX - z * sinX;
        z = z * cosX + node.baseY * sinX;

        const proj = project(x, y, z);
        return { ...node, x, y, z, px: proj.x, py: proj.y, scale: proj.scale };
      });

      // 2. Draw Connections
      ctx.lineWidth = 1;

      projectedNodes.forEach(node => {
        const alpha = (node.z + sphereRadius) / (2 * sphereRadius);
        if (alpha < 0) return;
        node.connections.forEach(targetIdx => {
          const target = projectedNodes[targetIdx];
          if (node.id < target.id) {
             const distAlpha = Math.max(0, (alpha + ((target.z + sphereRadius) / (2 * sphereRadius))) / 2);

             // Gradient from purple to blue for connections
             const gradient = ctx.createLinearGradient(node.px!, node.py!, target.px!, target.py!);
             gradient.addColorStop(0, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${distAlpha * 0.15})`);
             gradient.addColorStop(1, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${distAlpha * 0.15})`);
             ctx.strokeStyle = gradient;
             ctx.beginPath();
             ctx.moveTo(node.px!, node.py!);
             ctx.lineTo(target.px!, target.py!);
             ctx.stroke();
          }
        });
      });

      // 3. Update and Draw Pulses
      if (Math.random() < 0.05) spawnPulse();

      pulses = pulses.filter(p => p.progress < 1);
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;

        const startNode = projectedNodes[pulse.path[0]];
        const endNode = projectedNodes[pulse.path[1]];

        // Interpolate position
        const curX = startNode.px! + (endNode.px! - startNode.px!) * pulse.progress;
        const curY = startNode.py! + (endNode.py! - startNode.py!) * pulse.progress;

        // Size based on depth
        const zAvg = (startNode.z + endNode.z) / 2;
        const scale = 800 / (800 + zAvg);

        // Draw glow
        const alpha = 1 - Math.abs(pulse.progress - 0.5) * 2;

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(curX, curY, 2 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect with gradient (purple to blue)
        const glowGradient = ctx.createRadialGradient(curX, curY, 0, curX, curY, 6 * scale);
        glowGradient.addColorStop(0, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha * 0.5})`);
        glowGradient.addColorStop(1, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${alpha * 0.2})`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(curX, curY, 6 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Nodes
      projectedNodes.forEach(node => {
        const alpha = (node.z + sphereRadius) / (2 * sphereRadius);
        if (alpha <= 0.1) return;
        const size = 2 * node.scale!;

        // Node fill with gradient (more purple, transitioning to blue)
        const nodeGradient = ctx.createRadialGradient(node.px!, node.py!, 0, node.px!, node.py!, size * 2);
        const purpleRatio = 0.7; // 70% purple, 30% blue
        nodeGradient.addColorStop(0, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`);
        nodeGradient.addColorStop(purpleRatio, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha * 0.8})`);
        nodeGradient.addColorStop(1, `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, ${alpha * 0.6})`);
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(node.px!, node.py!, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Init
    handleResize();
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodeCount, connectionDistance, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default DigitalNeuralSphere;

