import FixedNav from './FixedNav';
import Box from '@mui/material/Box';
import { useLenis } from 'lenis/react';
import {useState} from "react";
import classNames from 'classnames';

interface HeaderProps {
  isSticky?: boolean;
}

const Header = (props: HeaderProps) => { 
  const [isSticky, setIsSticky] = useState(props.isSticky || false);

  useLenis((e)=> {
    if (isSticky) return; // Prevents the function from running if isSticky is true
    let r = document.querySelector(':root');
    const minFontSize = 2.5; // Minimum font size in em
    const maxFontSize = 5; // Maximum font size in em
  
    // Calculate the font size based on scroll position
    const fontSize = Math.max(
      minFontSize,
      maxFontSize - ((e.scroll / 332) * (maxFontSize - minFontSize))
    );
    // Apply the calculated font size to the CSS variable
    (r as any).style.setProperty('--header-font-size', fontSize);

    if (e.scroll > 332){
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  const fixedNavItems = [
    {
      key: "home",
      id: "home",
      label: "Home",
    },
    {
      key: "patterns",
      id: "patterns",
      label: "Patterns",
    },
    {
      key: "aboutus",
      id: "aboutus",
      label: "About us",
    }]

    return (
      <div className={classNames("header", isSticky ? "sticky" : "")}>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { // CSS selector that targets all direct child elements of Box component
                m: 1, // Applies margin to all direct child elements of Box component
              },
            }}
          >
              <h1>MADE BY STUDIOS</h1>
              <FixedNav
                id={'fixed-nav'} 
                items={fixedNavItems}
              />
          </Box>
      </div>
      );
    };

export default Header;