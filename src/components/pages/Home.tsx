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
                }}
            >
                <img src="/images/flower3.png"/>
            </Box>
            <Footer />
        </>
    );
};

export default Home;