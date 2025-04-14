import { motion } from "framer-motion";

import strings from "../../assets/strings/common";

const RevealText = () => {
  const letters = strings.MADE_BY_STUDIOS.split("");

  return (
    <div
      style={{
        display: "flex",
        fontSize: "6rem",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "black",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
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
      style={{
        position: "absolute",
        left: startX,
        width: "2px",
        height: "20px",
        background: "black",
        filter: "blur(0.5px)",
        opacity: 0.3,
      }}
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
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <RainLayer />
      <RevealText />
    </div>
  );
};

export default RainRevealPage;
