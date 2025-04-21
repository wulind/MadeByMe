import {
  Environment,
  Image,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

import Header from "../navigation/Header";

const ProductPage = () => {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Canvas camera={{ position: [0, 0, 20], fov: 10 }}>
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
        </ScrollControls>
        <Environment preset="dawn" background blur={0.5} />
      </Canvas>
    </div>
  );
};

const Rig = (props: any) => {
  const ref = useRef<THREE.Mesh | null>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents 360 degrees
    }
    const target = new THREE.Vector3(
      -state.pointer.x * 2,
      state.pointer.y + 1.5,
      10,
    );
    state.camera.position.lerp(target, 1 - Math.exp(-5 * delta)); // smoothFactor ≈ 0.3
    state.camera.lookAt(0, 0, 0); // Look at center
  });

  return <group ref={ref} {...props} />;
};

const Carousel = ({ radius = 1.4, count = 8 }) => {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/images/unraveland2.webp`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
};

const Card = ({ url, ...props }: { url: string }) => {
  const ref = useRef<THREE.Mesh | null>(null);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: Event) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  useFrame((_, delta) => {
    const targetScale = hovered ? 1.15 : 1;
    const smoothing = 1 - Math.exp(-10 * delta); // ≈ 0.1 damping

    if (ref.current) {
      // Smoothly scale (x, y, z)
      ref.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        smoothing,
      );

      // Smoothly animate hover effect
      const radiusTarget = hovered ? 0.25 : 0.1;
      (ref.current.material as any).radius +=
        (radiusTarget - (ref.current.material as any).radius) *
        (1 - Math.exp(-10 * delta)); // ≈ 0.2 damping

      const zoomTarget = hovered ? 1 : 1.5;
      (ref.current.material as any).zoom +=
        (zoomTarget - (ref.current.material as any).zoom) *
        (1 - Math.exp(-10 * delta));
    }
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <planeGeometry args={[1, 1]} />
    </Image>
  );
};

export default ProductPage;

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import "../../assets/styles/PatternsPage.css";
// import { productData } from "../../data/patterns";
// import { Product } from "../../types/Product";
// import { navigateTo } from "../../utils/navigation";
// import Header from "../navigation/Header";

// /*
// 5. Images float towards mouse
// */
// interface ProductCardProps {
//   key: number;
//   imageSrc: string;
//   imageAlt: string;
//   title: string;
//   price: string;
// }

// interface ProductCardGridProps {
//   productList: Product[];
// }

// const HoverImage: React.FC = () => {
//   // State to track mouse position
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   // Handle mouse move event
//   const handleMouseMove = (event: React.MouseEvent) => {
//     setMousePosition({
//       x: event.clientX,
//       y: event.clientY,
//     });
//   };

//   return (
//     <div
//       onMouseMove={handleMouseMove} // Track mouse movement
//       onMouseLeave={() => setMousePosition({ x: 0, y: 0 })} // Reset position when mouse leaves
//     >
//       <motion.img
//         src={productData[0].imageUrl}
//         style={{
//           // Apply bulging effect with transform
//           x: (mousePosition.x - window.innerWidth / 2) / 100,
//           y: (mousePosition.y - window.innerHeight / 2) / 100,
//           rotateX: (mousePosition.y - window.innerHeight / 2) / 100, // Rotate on the X-axis
//           rotateY: (mousePosition.x - window.innerWidth / 2) / 100, // Rotate on the Y-axis
//         }}
//         transition={{
//           type: "spring", // Use spring to create a natural, fluid movement
//           stiffness: 300, // Adjust stiffness for how 'tight' or 'loose' the spring feels
//           damping: 20, // Controls how the movement decays
//         }}
//       />
//     </div>
//   );
// };

// const ProductCard = (props: ProductCardProps) => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <motion.img
//         className="entrance-slide-in w-full h-84 object-cover rounded-lg mb-2 transition-transform  duration-300 transform hover:scale-105"
//         src={props.imageSrc}
//         alt={props.imageAlt}
//         onClick={() => navigateTo(navigate, "product/" + props.title)}
//       />
//       <div className="flex flex-col items-center">
//         <h2 className="entrance-blur-down uppercase text-white">
//           {props.title}
//         </h2>
//         <p className="entrance-blur-up text-white">{`$ ${props.price}`}</p>
//       </div>
//     </div>
//   );
// };

// const ProductCardGrid = (props: ProductCardGridProps) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
//       {props.productList.map((product, i) => (
//         <ProductCard
//           key={i}
//           imageSrc={product.imageUrl}
//           imageAlt={"Image of " + product.title}
//           title={product.title}
//           price={product.price.toString()}
//         />
//       ))}
//     </div>
//   );
// };

// const PatternsPage = () => {
//   return (
//     <div className="bg-black">
//       <Header />
//       <ProductCardGrid productList={productData as Product[]} />
//     </div>
//   );
// };

// export default PatternsPage;
