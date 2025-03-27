import * as React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Box from '@mui/material/Box';


const Home = () => { 
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '70vh',
                    justifyContent: 'center',
                }}
            >
                <Header />
            </Box>
            <Footer />
        </>
    );
};

export default Home;