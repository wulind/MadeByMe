import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Lenis from 'lenis'

const App = () => {

  React.useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
        autoRaf: true,
    });
    
    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
        console.log(e);
    });

}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
