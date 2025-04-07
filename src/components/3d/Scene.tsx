import React, { Suspense } from "react"
import { 
  ContactShadows, 
  Float, 
  Environment, 
  useGLTF, 
  OrbitControls, 
  Html, 
  RandomizedLight 
} from "@react-three/drei"
import type { Object3D } from 'three'

// Palette de couleurs pastel intenses
const pastelColors = [
  "#FF6B6B", // Rouge pastel intense
  "#FF8C42", // Orange foncé pastel
  "#6B5B95", // Violet pastel
  "#88B04B", // Vert olive pastel
  "#E6A8D7", // Rose pastel
]

// Liste des modèles disponibles
const availableModels = [
  { path: "/models/clip/Clip.gltf", scale: 0.5 },
  { path: "/models/tiroir/tiroir.gltf", scale: 0.5 },
  { path: "/models/spray/spray.gltf", scale: 0.5 },
  { path: "/models/fixpan/fixpan.gltf", scale: 0.5 },
  { path: "/models/carte/Carte.gltf", scale: 0.07 },
]

function LoadingScreen() {
  return (
    <Html center>
      <div className="text-white text-xl bg-black bg-opacity-50 px-4 py-2 rounded">
        Chargement du modèle...
      </div>
    </Html>
  )
}

function Model() {
  // Sélectionne un modèle aléatoire
  const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)]
  const { scene } = useGLTF(randomModel.path)
  
  // Sélectionne une couleur aléatoire de la palette
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]

  // Traverse le modèle pour changer la couleur
  scene.traverse((child: Object3D) => {
    if ('isMesh' in child && child.isMesh) {
      child.material.color.set(randomColor)
    }
  })

  return <primitive object={scene} position={[0, 0, 0]} scale={randomModel.scale} />
}

export default function Scene() {
  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#ffffff"
      />
      <pointLight 
        position={[-5, 5, -5]} 
        intensity={0.5} 
        color="#ff6900"
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
      />

      {/* Environnement et modèle */}
      <Environment preset="studio" />
      <Float 
        rotationIntensity={0.3}
        floatIntensity={0.5}
        speed={2}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Model />
        </Suspense>
      </Float>
      <ContactShadows 
        position={[0, 0.1, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={1.5}
      />

      {/* Contrôles */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={1}
        minDistance={2}
        maxDistance={10}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
      />
    </>
  )
} 