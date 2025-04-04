import * as React from "react";
import Header from "../FixedNav/Header";
import Footer from "../Footer";
import Patterns from "./Patterns"
import Box from '@mui/material/Box';
import './Home.css';
import AboutUsPage from "./AboutUsPage";


const Home = () => { 
    return (
        <>
            <Header />
            <Box
                id="home"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '30vh',
                }}
            >
                    <p className="left">Designed by us</p>
                    <p className="right">Made by you</p>
            </Box>
            <Patterns/>
            <AboutUsPage/>
            <Footer />
        </>
    );
};

export default Home;