import Box from "@mui/material/Box";
import Header from "../../FixedNav/Header";
import Footer from "../../Footer";
import Patterns from "./Pattern";
import "./Home.css";

const Home = () => {
  return (
    <div id="aboutus">
      <Header />
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
            Each of our crochet patterns is lovingly designed by us, but the
            real magic happens when you bring them to life with your own hands.
            Whether you're crafting for yourself or making a gift for someone
            special, your unique touch turns our designs into something truly
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
