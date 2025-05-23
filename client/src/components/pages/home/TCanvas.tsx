import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { ImagePlane } from "../../common/ImagePlane";
import { Effect } from "./Effect";

export const TCanvas = () => {
  const imageSrc = [
    "IMG_4828.jpeg",
    "IMG_8518.jpeg",
    "IMG_8641.jpeg",
    "IMG_5543.jpeg",
    "IMG_5299.jpeg",
    "IMG_4688.jpeg",
  ];

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
      <color attach="background" args={["#252525"]} />
      <Suspense fallback={null}>
        <ImagePlane images={imageSrc} />
      </Suspense>
      <Effect />
    </Canvas>
  );
};
