import * as React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Box from '@mui/material/Box';


const Home = () => { 

    return (
        <>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    width: '100vw', // 100% of the viewport width
                    height: '100vh', // 100% of the viewport height
                }}
            >
                <img src="/images/flower1.png"/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <img src="/images/flower2.png"/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', 
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <img src="/images/flower3.png"/>
            </Box>
            <Footer />
        </>
    );
};

export default Home;