import {
  MotionOptions,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import strings from "../../../assets/strings/common";
import { ROUTES } from "../../../assets/strings/routes";
import { navigateTo } from "../../../utils/navigation";

interface ImageInfo {
  path: string;
  alt: string;
  index: number;
}

const CircularGallery = ({ imgsInfo }: { imgsInfo: ImageInfo[] }) => {
  const navigate = useNavigate();
  const radius = 300; // pixels
  const numImages = imgsInfo.length;
  const centerRef = useRef(null);
  const baseAngle = useMotionValue(0);

  // Animate rotation
  useAnimationFrame((t) => {
    baseAngle.set(t / 4000); // radians
  });

  const Image = ({ info }: { info: ImageInfo }) => {
    const angleOffset = (info.index / numImages) * 2 * Math.PI;
    const x = useTransform(
      baseAngle,
      (angle) => radius * Math.cos(angle + angleOffset),
    );
    const y = useTransform(
      baseAngle,
      (angle) => radius * Math.sin(angle + angleOffset),
    );
    return (
      <motion.img
        key={info.index}
        src={info.path}
        className="absolute mix-blend-difference w-[200px] h-[200px] object-cover"
        style={
          {
            x,
            y,
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
          } as MotionOptions
        }
      />
    );
  };

  return (
    <div className="relative w-[80vw] h-[80vh] mx-auto my-20">
      <h1
        ref={centerRef}
        className="text-white w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold uppercase text-[10em] hover:cursor-pointer"
        onClick={() => navigateTo(navigate, ROUTES.COLLECTIONS.PATTERNS)}
      >
        {strings.SHOP_PATTERNS}
      </h1>

      {Array.from({ length: numImages }).map((_, i) => {
        return <Image info={imgsInfo[i]} />;
      })}
    </div>
  );
};

const HeroPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "start start"],
  });

  const rawRotation = useTransform(scrollYProgress, [0, 1], [270, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const rotation = useSpring(rawRotation, {
    stiffness: 60, // lower = smoother
    damping: 20, // lower = more bounce/inertia
    mass: 0.5,
  });

  return (
    <motion.div
      ref={heroRef}
      className="bg-black h-[150vh] flex justify-center items-center"
      style={{ scale, rotate: rotation }}
    >
      <CircularGallery
        imgsInfo={[
          { path: `images/unraveland.webp`, alt: "", index: 0 },
          { path: `images/unraveland2.webp`, alt: "", index: 1 },
          { path: `images/unraveland3.webp`, alt: "", index: 2 },
          { path: `images/dwaynejoe.jpg`, alt: "", index: 3 },
          { path: `images/unraveland.webp`, alt: "", index: 4 },
          { path: `images/unraveland2.webp`, alt: "", index: 5 },
          { path: `images/unraveland3.webp`, alt: "", index: 6 },
          { path: `images/dwaynejoe.jpg`, alt: "", index: 7 },
        ]}
      />
    </motion.div>
  );
};

export default HeroPage;
