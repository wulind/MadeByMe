import * as React from "react";
import FixNavItem from './FixedNav/FixedNavItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Header = () => { 

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
            <ButtonGroup variant="text" aria-label="Basic button group">
                <FixNavItem
                  id={'home'}
                  label={'Home'}
                  activeIndex={0}
                  isCurrent={true}
                  index={0}
                  storeSelectionPannels={() => {}}
                />
                <FixNavItem
                  id={'patterns'}
                  label={'Patterns'}
                  activeIndex={0}
                  isCurrent={true}
                  index={0}
                  storeSelectionPannels={() => {}}
                />
                <FixNavItem
                  id={'aboutus'}
                  label={'About us'}
                  activeIndex={0}
                  isCurrent={true}
                  index={0}
                  storeSelectionPannels={() => {}}
                />
            </ButtonGroup>
        </Box>
      );
    };

export default Header;