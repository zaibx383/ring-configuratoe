import { useState, useRef } from "react";
import "./App.css";
import Scene from "./Enivorment/Scene";
import Configurator from "./Configurator";
import Controller from "./Controller";
import { Loader } from "@react-three/drei";

function App() {
  const [metalColor, setMetalColor] = useState("#f2f3f7");
  const [bigDiamondColor, setBigDiamondColor] = useState("#ffffff");

  const [smallDiamondColor, setSmallDiamondColor] = useState("#ffffff");
  const [autoRotate, setAutoRotate] = useState(false);
  const controlsRef = useRef();

  const handleResetView = () => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    // Move camera to minDistance position
    controls.object.position.set(0, 0, 3);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  const handleRotateCamera = () => {
    setAutoRotate((prev) => !prev);
  };

  const handleFitObject = () => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    // Reset to default camera position
    controls.object.position.set(0, 3.5, 8);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  const handleFullscreen = () => {
    // Simulate F11 — use the Fullscreen API
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
    <Loader/>
      <Controller
        onResetView={handleResetView}
        onRotateCamera={handleRotateCamera}
        onFitObject={handleFitObject}
        onFullscreen={handleFullscreen}
        autoRotate={autoRotate}
      />
      <Configurator
        metalColor={metalColor}
        setMetalColor={setMetalColor}
        bigDiamondColor={bigDiamondColor}
        smallDiamondColor={smallDiamondColor}
        setBigDiamondColor={setBigDiamondColor}
        setSmallDiamondColor={setSmallDiamondColor}
      />
      <Scene
        metalColor={metalColor}
        setMetalColor={setMetalColor}
        bigDiamondColor={bigDiamondColor}
        setBigDiamondColor={setBigDiamondColor}
        smallDiamondColor={smallDiamondColor}
        setSmallDiamondColor={setSmallDiamondColor}
        controlsRef={controlsRef}
        autoRotate={autoRotate}
      />
    </>
  );
}

export default App;
