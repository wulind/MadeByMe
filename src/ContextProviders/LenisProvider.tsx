import React, { createContext, useContext, ReactNode } from 'react';
import Lenis from 'lenis';

// Define the type for the Lenis context
interface LenisContextType {
  lenis: Lenis;
}

// Create a context to store the Lenis instance
const LenisContext = createContext<LenisContextType>({lenis: new Lenis()});

export const useLenis = (): LenisContextType => {
  return useContext(LenisContext);
};

interface LenisProviderProps {
  lenisInstance: Lenis;
  children: ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ lenisInstance, children }) => {
  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
};
