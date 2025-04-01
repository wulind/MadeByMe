import FixedNav from './FixedNav/FixedNav';
import Box from '@mui/material/Box';

const Header = () => { 

    const fixedNavItems = [
      {
        id: "home",
        label: "Home",
      },
      {
        id: "patterns",
        label: "Patterns",
      },
      {
        id: "aboutus",
        label: "About us",
      },]

    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
      );
    };

export default Header;