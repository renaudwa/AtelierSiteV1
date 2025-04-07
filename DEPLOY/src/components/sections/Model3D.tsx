import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

// Palette de couleurs pastel intenses
const pastelColors = [
  "#FF6B6B", // Rouge pastel intense
  "#4ECDC4", // Turquoise pastel intense
  "#45B7D1", // Bleu pastel intense
  "#96CEB4", // Vert pastel intense
  "#FFEEAD", // Jaune pastel intense
];

// Liste des modèles disponibles
const availableModels = [
  { path: "/models/clip/Clip.gltf", scale: 0.15 },
  { path: "/models/tiroir/Tiroir.gltf", scale: 0.15 },
  { path: "/models/spray/Spray.gltf", scale: 0.15 },
  { path: "/models/fixpan/Fixpan.gltf", scale: 0.15 },
  { path: "/models/carte/Carte.gltf", scale: 0.15 },
  { path: "/models/shiba/Shiba.gltf", scale: 0.15 },
];

function Model() {
  // Sélectionne un modèle aléatoire
  const randomModel = availableModels[Math.floor(Math.random() * availableModels.length)];
  const { scene } = useGLTF(randomModel.path);
  
  // Sélectionne une couleur aléatoire de la palette
  const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

  // Traverse le modèle pour changer la couleur
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(randomColor);
    }
  });

  return <primitive object={scene} position={[0, 0, 0]} scale={randomModel.scale} />;
}

const Model3D = () => {
  return (
    <div className="w-full mx-auto" style={{ 
      height: 'var(--model-viewer-height)',
      maxWidth: 'var(--model-viewer-width)'
    }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
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
        <Environment preset="studio" />
        <Model />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={100}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Model3D;
