import classNames from "classnames";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { navigationStrings } from "../../assets/strings/navigation";
import { ROUTES } from "../../assets/strings/routes";
import { navigateTo } from "../../utils/navigation";
import "./NavMenu.css";

const HamburgerIcon = ({
  onClick,
  isNavOpen,
}: {
  onClick: () => void;
  isNavOpen: boolean;
}) => {
  const onNavClick = () => {
    onClick();
    const icon = document.querySelector(".hamburger-icon");
    icon?.classList.toggle("active");
  };
  return (
    <div
      className={classNames(
        "hamburger-icon absolute cursor-pointer bg-transparent m-0 p-0",
        isNavOpen ? "active" : "",
      )}
      style={{
        top: "20px",
        left: "20px",
        zIndex: 100,
      }}
      onClick={() => onNavClick()}
    >
      <div className="w-[35px] bar1 rounded"></div>
      <div className="w-[35px] bar2 rounded"></div>
      <div className="w-[35px] bar3 rounded"></div>
    </div>
  );
};

const FixedNavMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSelection, setCurrentSeletion] = useState(null);

  const isOpenMotionValue = useMotionValue(0);
  const isOpenSpring = useSpring(isOpenMotionValue, {
    stiffness: 100,
    damping: 20,
  });

  const translateX = useTransform(isOpenSpring, [0, 1], ["-100%", "0%"]);

  const onNavOpen = () => {
    setIsOpen(!isOpen);
    isOpenMotionValue.set(!isOpen ? 1 : 0);
  };

  const handleOnNavClick = (pageName: string) => {
    navigateTo(navigate, pageName);
  };

  return (
    <>
      <HamburgerIcon onClick={() => onNavOpen()} isNavOpen={isOpen} />
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-full bg-black opacity-70 z-50"
        style={{ x: translateX }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <ul className="mt-4 space-y-4">
            <li
              className="text-white text-2xl cursor-pointer"
              onClick={() => handleOnNavClick(ROUTES.HOME)}
            >
              {navigationStrings.HOME}
            </li>
            <li
              className="text-white text-2xl cursor-pointer"
              onClick={() => handleOnNavClick(ROUTES.COLLECTIONS.PATTERNS)}
            >
              {navigationStrings.SHOP}
            </li>
            <li
              className="text-white text-2xl cursor-pointer"
              onClick={() => handleOnNavClick(ROUTES.ABOUT_US)}
            >
              {navigationStrings.ABOUT_US}
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default FixedNavMenu;
