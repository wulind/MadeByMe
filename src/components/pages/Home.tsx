import * as React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Patterns from "./Patterns"
import Box from '@mui/material/Box';
import './Home.css';


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
            <div className="row">
                <div className="column display-flex justified-center align-items-center flex-wrap">
                    <img src="/images/unraveland.webp" />
                    <img src="/images/dwaynejoe.jpg" />
                    <img src="/images/horizontaleditorial.webp" />
                </div>
                <div className="column display-flex justified-center align-items-center flex-wrap">
                    <img src="/images/flower3.png" />
                    <img src="/images/flower2.png" />
                    <img src="/images/flower1.png" />
                </div>
            </div>
            <Patterns/>
            <Footer />
        </>
    );
};

export default Home;