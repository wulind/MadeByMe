import React, {useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Lenis from 'lenis';
import { LenisProvider } from './ContextProviders/LenisProvider'; // Adjust path accordingly

const App = () => {

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create the Lenis instance
    lenisRef.current = new Lenis({
      duration: 1.2,
      autoRaf: true,
      easing: (t) => t,
    });

    return () => {
      // Clean up on unmount
      lenisRef.current = null;
    };
  }, []);


  return (
    <LenisProvider lenisInstance={lenisRef.current!}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </Router>
    </LenisProvider>
  );
}

export default App;
