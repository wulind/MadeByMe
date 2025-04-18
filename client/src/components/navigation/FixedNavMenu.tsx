import classNames from "classnames";
import { useState } from "react";

import "./HamburgerIcon.css";

const HamburgerIcon = ({
  onClick,
  isNavOpen,
}: {
  onClick: () => null;
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return isOpen ? (
    <div className="fixed top-0 left-0 w-[50%] h-full bg-white opacity-50 z-50">
      <HamburgerIcon onClick={() => null} isNavOpen={true} />
    </div>
  ) : (
    <HamburgerIcon onClick={() => null} isNavOpen={false} />
  );
};

export default FixedNavMenu;
