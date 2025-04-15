import { MotionStyle, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import strings from "../../assets/strings/common";
import { navigationStrings } from "../../assets/strings/navigation";

const RevealText = () => {
  const letters = strings.MADE_BY_STUDIOS.split("");

  // Used to control opacity of the "see more" text
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={container}
      className="flex justify-center items-center text-[6em] font-semibold text-black h-screen relative overflow-hidden bg-transparent"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.5,
            duration: 0.3,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      {
        <>
          <motion.div
            className="absolute bottom-[35px] text-gray-500 lowercase text-xs font-normal flex flex-col flex-center items-center"
            style={{ opacity } as MotionStyle}
          >
            <>{navigationStrings.SEE_MORE}</>
            <i className="material-icons text-gray-500 text-xs font-normal">
              expand_more
            </i>
          </motion.div>
        </>
      }
    </div>
  );
};

const Raindrop = ({ delay }: { delay: number }) => {
  const startX = Math.random() * window.innerWidth;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0.3 }}
      animate={{ y: window.innerHeight + 100, opacity: 0 }}
      transition={{ delay, duration: 2, repeat: Infinity }}
      style={
        {
          position: "absolute",
          left: startX,
          width: "2px",
          height: "20px",
          background: "black",
          filter: "blur(0.5px)",
          opacity: 0.3,
        } as MotionStyle
      }
    />
  );
};

const RainLayer = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
        <Raindrop key={i} delay={Math.random() * 3} />
      ))}
    </>
  );
};

const RainRevealPage = () => {
  return (
    <div className="relative overflow-hidden">
      <RainLayer />
      <RevealText />
    </div>
  );
};

export default RainRevealPage;
