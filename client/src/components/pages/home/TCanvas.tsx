import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { ImagePlane } from "../../common/ImagePlane";
import { Effect } from "./Effect";

export const TCanvas = () => {
  const imageSrc = ["unraveland.webp", "unraveland2.webp", "unraveland3.webp"];
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
        <ImagePlane images={imageSrc} />
      </Suspense>
      <Effect />
    </Canvas>
  );
};
