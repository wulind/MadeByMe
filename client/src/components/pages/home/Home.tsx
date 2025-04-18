import Footer from "../../Footer";
import FixedNavMenu from "../../navigation/FixedNavMenu";
import TitleSection from "./TitleSection";

const Home = () => {
  return (
    <div className="relative">
      <FixedNavMenu />
      <TitleSection />
      <Footer />
    </div>
  );
};

export default Home;
