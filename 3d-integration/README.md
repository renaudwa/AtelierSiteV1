# Intégration des Modèles 3D

Ce dossier contient tous les fichiers nécessaires pour intégrer les modèles 3D dans un site web.

## Structure des fichiers

```
3d-integration/
├── models/                 # Dossier contenant les modèles 3D
│   ├── clip/              # Modèle Clip
│   ├── tiroir/            # Modèle Tiroir
│   ├── spray/             # Modèle Spray
│   ├── fixpan/            # Modèle Fixpan
│   └── carte/             # Modèle Carte
└── src/
    └── components/
        ├── 3d/            # Composants 3D
        └── sections/      # Sections contenant les modèles 3D
```

## Prérequis

Pour utiliser ces modèles 3D, vous aurez besoin des dépendances suivantes :

```bash
npm install @react-three/fiber @react-three/drei three
```

## Intégration

1. Copiez le dossier `models` dans le dossier `public` de votre projet
2. Copiez les composants React dans votre projet
3. Importez et utilisez les composants comme suit :

```jsx
import { Showcase } from './components/3d/Showcase';
// ou
import Model3D from './components/sections/Model3D';

// Dans votre composant
function App() {
  return (
    <div>
      <Showcase />
      {/* ou */}
      <Model3D />
    </div>
  );
}
```

## Fonctionnalités

- Affichage de modèles 3D en format glTF
- Rotation automatique des modèles
- Éclairage dynamique
- Ombres et effets visuels
- Palette de couleurs pastel aléatoire

## Personnalisation

Vous pouvez modifier les paramètres suivants dans les composants :

- Échelle des modèles
- Vitesse de rotation
- Couleurs
- Position de la caméra
- Intensité de l'éclairage

## Notes

- Les modèles sont optimisés pour le web
- Format utilisé : glTF (format standard pour le web)
- Compatible avec les navigateurs modernes 