import React, { useEffect, useState } from "react"
import { useGLTF, Caustics } from "@react-three/drei"
import { MeshRefractionMaterial } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import TransitionMaterial from "./MeshTransitionMaterial"

export function Ring({
  metalColor = "#E8E4D9",
  smallDiamondColor = "#7AB2B2",
  bigDiamondColor = "#8494FF",
  ...props
}) {
  const { nodes } = useGLTF("/Ring.glb")
  const { scene } = useThree()
  const envMap = scene.environment
  // 🔥 Get environment from <Environment />
const [envReady, setEnvReady] = useState(false)

useEffect(() => {
  if (scene.environment) {
    setEnvReady(true)
  }
}, [scene.environment])

  return (
    <group {...props} dispose={null}>
      <group
        position={[0, -0.218, 0]}
        rotation={[-Math.PI / 2, 0, -10.4]}
        scale={0.12}
      >
        {/* 💎 BIG DIAMOND */}
        {/* <Caustics
          backfaces
          color={bigDiamondColor}
          position={[0, -0.5, 0]}
          lightSource={[5, 5, -10]}
          worldRadius={0.1}
          ior={2.4}
          intensity={0.2}
        > */}
          <mesh
            geometry={nodes.Diamond_Cushion_Square.geometry}
            position={[0, 0, 13.033]}
            scale={0.65}
            castShadow
          >
            {envMap && (
              <MeshRefractionMaterial
                envMap={envMap}
                color={bigDiamondColor}
                bounces={5}
                ior={2.6}
                aberrationStrength={0.025}
                fresnel={1}
                toneMapped={false}
              />
            )}
          </mesh>
        {/* </Caustics> */}

        {/* 💎 SMALL DIAMONDS */}
        <mesh
          geometry={nodes.Gem_Count_On_Curve_Gem010.geometry}
          position={[9.958, -0.644, 0.233]}
          rotation={[3.142, 1.509, 0.193]}
          scale={[0.11, 0.11, 0.109]}
        >
          {envMap && (
            <MeshRefractionMaterial
              envMap={envMap}
              color={smallDiamondColor}
              bounces={3}
              ior={2.4}
              aberrationStrength={0.015}
              fresnel={1}
              toneMapped={false}
            />
          )}
        </mesh>

        {/* 🟡 METAL */}
        <mesh geometry={nodes.Mesh_65.geometry} castShadow receiveShadow>
          <TransitionMaterial
            transitionColor={metalColor}
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload("/Ring.glb")