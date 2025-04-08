import FixedNav from "./FixedNav";
import Box from "@mui/material/Box";
import { useLenis } from "lenis/react";
import { useState } from "react";
import classNames from "classnames";
import strings from "../../assets/strings/strings";

interface HeaderProps {
  isSticky?: boolean;
}

const Header = (props: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(props.isSticky || false);

  useLenis((e) => {
    if (isSticky) return;
    let r = document.querySelector(":root");
    const maxScroll = 1; // Maximum scroll value for the header to be sticky
    const minFontSize = 2.5; // Minimum font size in em
    const maxFontSize = 5; // Maximum font size in em

    // Calculate the font size based on scroll position
    const fontSize = Math.max(
      minFontSize,
      maxFontSize - (e.scroll / maxScroll) * (maxFontSize - minFontSize)
    );
    // Apply the calculated font size to the CSS variable
    // (r as any).style.setProperty('--scale', '20%');

    if (e.scroll > maxScroll) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  const fixedNavItems = [
    {
      key: "home",
      id: "home",
      label: strings.HOME,
    },
    {
      key: "patterns",
      id: "patterns",
      label: strings.PATTERNS,
    },
    {
      key: "aboutus",
      id: "aboutus",
      label: strings.ABOUT_US,
    },
  ];

  return (
    <div className={classNames("header", isSticky ? "sticky" : "")}>
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
            "logo uppercase",
            isSticky ? "font-size-3em" : "font-size-5em"
          )}
        >
          {strings.MADE_BY_STUDIOS}
        </h1>
        <FixedNav id={"fixed-nav"} items={fixedNavItems} />
        {!isSticky && (
          <>
            <div className="see-more lowercase">{strings.SEE_MORE}</div>
            <i className="material-icons">expand_more</i>
          </>
        )}
      </Box>
    </div>
  );
};

export default Header;
