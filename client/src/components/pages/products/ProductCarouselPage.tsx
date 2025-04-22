import { Image, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import * as THREE from "three";

import { Product } from "../../../types/Product";
import Header from "../../navigation/Header";
import "./ProductCarouselPage.css";

interface ProductCarouselPageProps {
  products: Product[];
}

const ProductCarouselPage = (props: ProductCarouselPageProps) => {
  // Which product card is currently showing
  const [activeIndex, setActiveIndex] = useState(0);
  const lenis = useLenis();

  lenis?.on("scroll", ({ progress }) => {
    const index = Math.round(progress * (props.products.length - 1));
    setActiveIndex(index);
  });

  const scrollToCard = (index: number) => {
    if (0 <= index || index <= props.products.length) {
      setActiveIndex(index);
      if (lenis) {
        const clamped = Math.max(0, Math.min(index, props.products.length - 1));
        const scrollY =
          (clamped / (props.products.length - 1)) * lenis.limit
            ? lenis.limit
            : 0;
        lenis.scrollTo(scrollY);
      }
    }
  };

  return (
    <div className="grid-container w-screen h-screen bg-black">
      <Header />

      {/* Product carousel */}
      <div className="carousel-container flex justify-center items-center">
        <Canvas camera={{ position: [0, 0, 10], fov: 10 }}>
          <Rig>
            <Carousel
              products={props.products}
              activeIndex={activeIndex}
            ></Carousel>
          </Rig>
        </Canvas>
      </div>

      {/* Scroll arrows */}
      <div className="nav-buttons flex justify-center z-50">
        <div
          className="w-[72px] h-[26px] cursor-pointer"
          style={{
            backgroundImage: "url(/images/navi_left.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          onClick={() => scrollToCard(activeIndex - 1)}
        />
        <p className="text-white uppercase">Scroll</p>
        <div
          className="w-[72px] h-[26px] cursor-pointer"
          style={{
            backgroundImage: "url(/images/navi_right.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          onClick={() => scrollToCard(activeIndex + 1)}
        />
      </div>
    </div>
  );
};

const Rig = (props: any) => {
  useFrame((state, delta) => {
    const target = new THREE.Vector3(
      -state.pointer.x * 2,
      state.pointer.y + 1.5,
      10,
    );
    state.camera.position.lerp(target, 1 - Math.exp(-5 * delta)); // smoothFactor ≈ 0.3
    state.camera.lookAt(0, 0, 0); // Look at center
  });

  return <group {...props} />;
};

const CARD_SPACING = 1.5; // Adjust spacing between cards

const Carousel = ({
  products,
  activeIndex,
}: {
  products: Product[];
  activeIndex: number;
}) => {
  return (
    <>
      {products.map((product, i) => {
        if (Math.abs(i - activeIndex) > 1) return null;

        const offset = i - activeIndex;
        const position = [offset * CARD_SPACING, 0, 0]; // side by side layout
        const isActive = i === activeIndex;

        return (
          <Card
            key={i}
            title={product.title}
            price={product.price.toString()}
            imgSrc={product.imageUrl}
            position={position as [number, number, number]}
            isActive={isActive}
          />
        );
      })}
    </>
  );
};

interface CardProps {
  imgSrc: string;
  title: string;
  price: string;
  position: [number, number, number];
  isActive: boolean;
}

const Card = (props: CardProps) => {
  const ref = useRef<THREE.Mesh | null>(null);
  const [hover, setHover] = useState(false);
  const pointerOver = (e: Event) => (e.stopPropagation(), setHover(true));
  const pointerOut = () => setHover(false);

  useFrame((_, delta) => {
    const targetScale = hover ? 1.15 : 1;
    const smoothing = 1 - Math.exp(-10 * delta); // ≈ 0.1 damping

    if (ref.current) {
      // Smoothly scale (x, y, z)
      ref.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        smoothing,
      );

      // Smoothly animate hover effect
      const radiusTarget = hover ? 0.25 : 0.1;
      (ref.current.material as any).radius +=
        (radiusTarget - (ref.current.material as any).radius) *
        (1 - Math.exp(-10 * delta)); // ≈ 0.2 damping

      const zoomTarget = hover ? 1 : 1.25;
      (ref.current.material as any).zoom +=
        (zoomTarget - (ref.current.material as any).zoom) *
        (1 - Math.exp(-10 * delta));
    }
  });
  return (
    <>
      {props.isActive && hover ? (
        <>
          <Text
            fontSize={0.1}
            anchorY="bottom"
            anchorX="right"
            color="black"
            lineHeight={0.8}
            position={[0.5, -0.6, 0.1]}
          >
            {props.title}
          </Text>
          <Text
            fontSize={0.1}
            anchorY="bottom"
            anchorX="right"
            color="black"
            lineHeight={0.8}
            position={[0.5, -0.7, 0.1]}
          >
            {props.price}
          </Text>
        </>
      ) : (
        <></>
      )}
      <Image
        ref={ref}
        url={props.imgSrc}
        transparent
        grayscale={props.isActive ? 0 : 1}
        side={THREE.DoubleSide}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        {...props}
        onClick={() => {}}
      >
        <planeGeometry args={[1.2, 1.5]} />
      </Image>
    </>
  );
};

export default ProductCarouselPage;

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
