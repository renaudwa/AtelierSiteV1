import React, { Suspense } from "react"
import { ContactShadows, Float, Environment, useGLTF, OrbitControls, Html, RandomizedLight } from "@react-three/drei"

function LoadingScreen() {
  return (
    <Html center>
      <div className="text-white text-xl bg-black bg-opacity-50 px-4 py-2 rounded">
        Chargement du modèle...
      </div>
    </Html>
  )
}

// Palette de couleurs pastel intenses
const pastelColors = [
  "#FF6B6B", // Rouge pastel intense
  "#4ECDC4", // Turquoise pastel intense
  "#45B7D1", // Bleu pastel intense
  "#96CEB4", // Vert pastel intense
  "#FFEEAD", // Jaune pastel intense
]

// Liste des modèles disponibles
const availableModels = [
  { path: "/models/clip/Clip.gltf", scale: 0.2 },
  { path: "/models/tiroir/tiroir.gltf", scale: 0.3 },
  { path: "/models/spray/spray.gltf", scale: 0.35 },
  { path: "/models/fixpan/fixpan.gltf", scale: 0.25 },
  { path: "/models/carte/Carte.gltf", scale: 0.035 },
  
  
]

function Model() {
  // Sélectionne un modèle aléatoire
  const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)]
  const { scene } = useGLTF(randomModel.path)
  
  // Sélectionne une couleur aléatoire de la palette
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]

  // Traverse le modèle pour changer la couleur
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(randomColor)
    }
  })

  return <primitive object={scene} position={[0, 0, 0]} scale={randomModel.scale} />
}

export default function Scene() {
  return (
    <>
      {/* Éclairage ambiant global */}
      <ambientLight intensity={0.5} />

      {/* Éclairage directionnel principal (comme le soleil) */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#ffffff"
      />

      {/* Éclairage ponctuel (comme une lampe) */}
      <pointLight 
        position={[-5, 5, -5]} 
        intensity={0.5} 
        color="#ff6900"
      />

     
      {/* Éclairage spot (comme un projecteur) */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
      />

      <Environment preset="studio" />
      <Float rotationIntensity={0.3}>
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
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
} 