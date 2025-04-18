import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Effect } from "./Effect";
import { ImagePlane } from "./ImagePlane";

export const TCanvas = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 2],
        fov: 50,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 2000,
      }}
      dpr={window.devicePixelRatio}
    >
      <color attach="background" args={["#000"]} />
      <Suspense fallback={null}>
        <ImagePlane />
      </Suspense>
      <Effect />
    </Canvas>
  );
};
