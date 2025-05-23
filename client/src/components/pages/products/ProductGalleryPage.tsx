import {
  Environment,
  Image,
  MeshReflectorMaterial,
  Text,
  useCursor,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as THREE from "three";
import getUuid from "uuid-by-string";

import Header from "../../navigation/Header";

const GOLDENRATIO = 1.61803398875;

const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: "" },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "" },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: "" },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: "/images/IMG_5299.jpeg",
    title: "Dumplings",
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: "",
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: "/images/IMG_5771.jpeg",
    title: "Beanie 1",
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "/images/IMG_4828.jpeg",
    title: "Tote bag",
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "",
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: "",
  },
];

export const ProductGallery = () => (
  <div className="grid-container w-screen h-screen overflow-hidden bg-black">
    <Header />
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 0, 15]} />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </Canvas>
  </div>
);

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}: {
  images: any[];
  q?: THREE.Quaternion;
  p?: THREE.Vector3;
}) {
  const ref = useRef<THREE.Object3D>(null);
  const clicked = useRef<THREE.Object3D>(null);
  const [selectedItem, setSelectedItem] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId && ref.current) {
      clicked.current = ref.current.getObjectByName(productId) ?? null;
      if (clicked.current && clicked.current.parent) {
        clicked.current.parent.updateWorldMatrix(true, true);
        clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
        clicked.current.parent.getWorldQuaternion(q);
      }
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        navigate(
          clicked.current === e.object
            ? "/"
            : "/collections/patterns/" + e.object.name,
        )
      )}
      onPointerMissed={() => navigate("/collections/patterns")}
    >
      {images.map((props: any, i) => (
        <Frame key={i} {...props} />
      ))}
    </group>
  );
}

function Frame({
  url,
  title,
  c = new THREE.Color(),
  ...props
}: {
  url: string;
  title: string;
  c: THREE.Color;
}) {
  const image = useRef<THREE.Mesh>(null);
  const frame = useRef<THREE.Mesh>(null);
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);

  const frameInitialY = useRef<number>(0);

  useCursor(hovered);

  useFrame((state, dt) => {
    if (frameInitialY.current === 0 && frame.current) {
      frameInitialY.current = frame.current.position.y;
    }

    if (image.current) {
      (image.current.material as any).zoom =
        2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    }

    if (frame.current && frameInitialY.current) {
      const targetY = hovered
        ? frameInitialY.current + 0.1
        : frameInitialY.current;
      easing.damp3(
        frame.current.position,
        new THREE.Vector3(
          frame.current.position.x,
          targetY, // Lift up slightly on hover
          frame.current.position.z,
        ),
        0.1,
        dt,
      );
    }
  });
  return (
    <group {...props}>
      <mesh
        ref={frame}
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          scale={[0.85, 0.9]}
          url={url == "" ? "/images/coming_soon.png" : url}
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
      >
        {title ? title : "Coming Soon"}
      </Text>
    </group>
  );
}

export default ProductGallery;
