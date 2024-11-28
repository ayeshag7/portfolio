import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "./CanvasLoader";

type BallProps = {
  imgUrl: string;
};

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {/* Ambient and directional lights */}
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.5} />
      
      {/* Border mesh with slightly larger size */}
      <mesh scale={1.45} >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="transparent"  // Making the mesh itself transparent
          emissive="hsl(var(--triangle-color) / <alpha-value>)"  // Using your global CSS variable for border color
          emissiveIntensity={1}  // This makes the border glow-like
        />
      </mesh>

      {/* Ball mesh */}
      <mesh castShadow receiveShadow scale={2.25}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* Only render Decal if the texture is loaded */}
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
          />
        )}
      </mesh>
    </Float>
  );
};

type BallCanvasProps = {
  icon: string;
};

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
