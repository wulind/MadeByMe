import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/HomePage/Home";
import ProductPage from "./components/pages/ProductPage";
import PatternsPage from "./components/pages/PatternsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route
          path="/purchase"
          element={
            <ProductPage productId="bad35b6d-58a9-4fd3-91e0-076b0366f2fe" />
          }
        />
        
        <Route
          path="/patterns"
          element={
            <PatternsPage />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
