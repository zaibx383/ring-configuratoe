import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Ring } from "./Ring";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";

export default function Scene({
  metalColor,
  bigDiamondColor,
  smallDiamondColor,
  controlsRef,
  autoRotate,
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 3.5, 8], fov: 40 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0a0a0a"]} />
        <Environment files="/back.hdr" background environmentIntensity={1.0} />
        <directionalLight
          castShadow
          position={[5, 6, 4]}
          intensity={1.6}
        />
        <directionalLight
          castShadow
          position={[-4, 3, -5]}
          intensity={0.7}
        />
        <directionalLight position={[0, 4, -4]} intensity={0.5} />
        <ambientLight intensity={0.2} />

        <Ring
          metalColor={metalColor}
          bigDiamondColor={bigDiamondColor}
          smallDiamondColor={smallDiamondColor}
        />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={1.1}
          luminanceSmoothing={0.2}
          intensity={0.25}
        />
      </EffectComposer>

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enableRotate={true}
        enablePan={false}
        maxDistance={15}
        minDistance={3}
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



