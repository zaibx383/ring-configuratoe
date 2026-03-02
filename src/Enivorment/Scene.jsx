import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Ring } from "./Ring";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useRef } from "react";

export default function Scene({
  metalColor,
  bigDiamondColor,
  smallDiamondColor,
  controlsRef,
  autoRotate,
}) {
  return (
    <Canvas
    dpr={[1,2]}
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 3.5, 8], fov: 45 }}
    gl={{
  antialias: true,
  toneMapping: THREE.ACESFilmicToneMapping,
  outputColorSpace: THREE.SRGBColorSpace,
  powerPreference: "high-performance"
}}
    >
      <Suspense fallback={null}>

        {/* background={false} preset="city" */}
      <color attach="background" args={["#0a0a0a"]} />
   <Environment files="/back.hdr" background />
     <directionalLight position={[5,5,5]} intensity={2} />
     <directionalLight position={[5,0,4]} color={"white"} intensity={2} />

<directionalLight position={[-5,3,-5]} intensity={1.5} />
      <ambientLight intensity={0.2} />

      <Ring
        metalColor={metalColor}
        bigDiamondColor={bigDiamondColor}
        smallDiamondColor={smallDiamondColor}
        />

     </Suspense>
   <EffectComposer multisampling={0}>
  <Bloom
    luminanceThreshold={0.85}
    luminanceSmoothing={0.4}
    intensity={0.8}
    mipmapBlur
  />
</EffectComposer>

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enableRotate={true}
        enablePan={false}
        maxDistance={15}
        minDistance={4.5}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        dampingFactor={0.05}
        enableDamping={true}
        autoRotate={autoRotate}
        autoRotateSpeed={1.0}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}



