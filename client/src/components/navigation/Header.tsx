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
import { ROUTES } from "../../assets/strings/routes";
import { navigateTo } from "../../utils/navigation";
import FixedNavMenu from "./FixedNavMenu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-black w-full top-0 z-50 flex justify-center items-center sticky h-[15vh]"
      style={{
        gridArea: "header",
      }}
    >
      <FixedNavMenu />
      <h1
        className="capitalize width-100 text-[3em] cursor-pointer text-white font-bold"
        onClick={() => navigateTo(navigate, "")}
      >
        {strings.MADE_BY_STUDIOS}
      </h1>
    </div>
  );
};

export default Header;
