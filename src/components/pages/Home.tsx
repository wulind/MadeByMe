import * as React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Patterns from "./Patterns"
import Box from '@mui/material/Box';
import './Home.css';
import Aboutus from "./Aboutus";


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
            <Box
                id="home"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                    <p className="left">Designed by us</p>
                    <p className="right">Made by you</p>
            </Box>
            <Patterns/>
            <Aboutus/>
            <Footer />
        </>
    );
};

export default Home;