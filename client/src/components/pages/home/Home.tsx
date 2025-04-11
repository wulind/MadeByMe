import Box from "@mui/material/Box";
import RainRevealPage from "../../navigation/RainRevealPage";
import Footer from "../../Footer";
import Patterns from "./Pattern";
import "./Home.css";

const Home = () => {
  return (
    <div id="aboutus">
      <RainRevealPage />
      <Box
        id="home"
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="about-us-container">
          <h1 className="left-header">
            Designed by <i>us</i>
          </h1>
          <p className="about-us">
            We started with an idea between some friends, tired of limiting our
            creative abilities. We didn't know what we wanted to build, but we
            knew wanted a personal playground, where we can create anything
            without restriction. MADE BY STUDIOS is the product of this desire.
            As much as it is ours, we want this to be your creative outlet as
            well. We hope you explore a new medium, experiment with our
            patterns, and most importantly break free from creative limitations.
            Each of our crochet patterns is lovingly designed by us, but the
            real magic happens when you bring them to life with your own hands.
            Your unique touch turns our designs into something truly
            one-of-a-kind. We'd be thrilled to see what you create—share your
            finished pieces with us and join our growing community of makers who
            inspire us every day!
          </p>
          <h1 className="right-header">
            Made by <i>you</i>
          </h1>
        </div>
      </Box>
      <Patterns />
      <Footer />
    </div>
  );
};

export default Home;
