import * as React from "react";
import Button from '@mui/material/Button';
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
            <h1>Made by Me</h1>
            <ButtonGroup variant="text" aria-label="Basic button group">
                <Button>Home</Button>
                <Button>About us</Button>
                <Button>Patterns</Button>
            </ButtonGroup>
        </Box>
      );
    };

export default Header;