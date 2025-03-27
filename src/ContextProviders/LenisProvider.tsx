import React, { createContext, useContext, ReactNode } from 'react';
import Lenis from 'lenis';

// Define the type for the Lenis context
interface LenisContextType {
  lenis: Lenis | null;
}

// Create a context to store the Lenis instance
const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const useLenis = (): LenisContextType => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider');
  }
  return context;
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
