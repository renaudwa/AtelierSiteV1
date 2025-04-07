import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Scene from "./Scene"

export const Showcase = () => {
  return (
    <div className="relative w-full" style={{ height: 'var(--model-viewer-height)' }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          fov: 45,
          near: 0.4,
          far: 2000,
          position: [-1.5, 1, 3],
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
} 