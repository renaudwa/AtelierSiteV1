import React, { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"

export const Showcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestion du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const height = parent.clientHeight;
          containerRef.current.style.height = `${height}px`;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 2, 5],
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ 
          background: 'transparent',
          height: '100%',
          width: '100%'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
} 