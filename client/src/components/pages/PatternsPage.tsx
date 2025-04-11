import Header from "../navigation/Header";
import { useState } from "react";
import "../../assets/styles/PatternsPage.css";
import { Product } from "../../types/Product";
import { motion } from "framer-motion";
import { navigateTo } from "../../utils/navigation";
import { useNavigate } from "react-router-dom";

import { productData } from "../../data/patterns";

/*
5. Images float towards mouse
*/
interface ProductCardProps {
  key: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: string;
}

interface ProductCardGridProps {
  productList: Product[];
}

const HoverImage: React.FC = () => {
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move event
  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove} // Track mouse movement
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })} // Reset position when mouse leaves
    >
      <motion.img
        src={productData[0].imageUrl}
        style={{
          // Apply bulging effect with transform
          x: (mousePosition.x - window.innerWidth / 2) / 100,
          y: (mousePosition.y - window.innerHeight / 2) / 100,
          rotateX: (mousePosition.y - window.innerHeight / 2) / 100, // Rotate on the X-axis
          rotateY: (mousePosition.x - window.innerWidth / 2) / 100, // Rotate on the Y-axis
        }}
        transition={{
          type: "spring", // Use spring to create a natural, fluid movement
          stiffness: 300, // Adjust stiffness for how 'tight' or 'loose' the spring feels
          damping: 20, // Controls how the movement decays
        }}
      />
    </div>
  );
};

const ProductCard = (props: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <motion.img
        className="entrance-slide-in w-full h-84 object-cover rounded-lg mb-2 transition-transform  duration-300 transform hover:scale-105"
        src={props.imageSrc}
        alt={props.imageAlt}
        onClick={() => navigateTo(navigate, "product/" + props.title)}
      />
      <div className="flex flex-col items-center">
        <h2 className="entrance-blur-down uppercase">{props.title}</h2>
        <p className="entrance-blur-up">{`$ ${props.price}`}</p>
      </div>
    </div>
  );
};

const ProductCardGrid = (props: ProductCardGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {props.productList.map((product, i) => (
        <ProductCard
          key={i}
          imageSrc={product.imageUrl}
          imageAlt={"Image of " + product.title}
          title={product.title}
          price={product.price.toString()}
        />
      ))}
    </div>
  );
};

const PatternsPage = () => {
  return (
    <div>
      <Header isSticky={true} />
      <ProductCardGrid productList={productData as Product[]} />
    </div>
  );
};

export default PatternsPage;
