import Box from "@mui/material/Box";
import classNames from "classnames";
import { useLenis } from "lenis/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import strings from "../../assets/strings/common";
import {
  navigationMenuKeys,
  navigationStrings,
} from "../../assets/strings/navigation";
import { navigateTo } from "../../utils/navigation";
import FixedNav from "./FixedNav";

interface HeaderProps {
  isSticky?: boolean;
}

const Header = (props: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(props.isSticky || false);
  const navigate = useNavigate();

  useLenis((e) => {
    if (isSticky) return;

    const maxScroll = 1; // Maximum scroll value for the header to be sticky
    if (e.scroll > maxScroll) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  const fixedNavItems = [
    {
      key: navigationMenuKeys.HOME,
      id: navigationMenuKeys.HOME,
      label: navigationStrings.HOME,
    },
    {
      key: navigationMenuKeys.PATTERNS,
      id: navigationMenuKeys.PATTERNS,
      label: navigationStrings.PATTERNS,
    },
    {
      key: navigationMenuKeys.ABOUT_US,
      id: navigationMenuKeys.ABOUT_US,
      label: navigationStrings.ABOUT_US,
    },
  ];

  return (
    <div
      className={classNames(
        "bg-white w-full top-0 z-10 flex justify-center transition-[height] duration-1000 ease-in-out",
        isSticky ? "sticky h-[15vh]" : "h-screen",
      )}
      style={{
        gridArea: "header",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          "& > *": {
            // CSS selector that targets all direct child elements of Box component
            m: 0, // Applies margin to all direct child elements of Box component
          },
        }}
      >
        <h1
          className={classNames(
            "capitalize width-100 transition-[font-size] duration-1000 ease-in-out",
            isSticky
              ? "text-[3em] cursor-pointer"
              : "text-[5em] cursor-default",
          )}
          onClick={() => navigateTo(navigate, "")}
        >
          {strings.MADE_BY_STUDIOS}
        </h1>
        <FixedNav id={"fixed-nav"} items={fixedNavItems} />
        {!isSticky && (
          <>
            <div className="absolute bottom-[35px] text-gray-500 lowercase">
              {navigationStrings.SEE_MORE}
            </div>
            <i className="material-icons absolute bottom-[10px] text-gray-500">
              expand_more
            </i>
          </>
        )}
      </Box>
    </div>
  );
};

export default Header;
