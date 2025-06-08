import React, { createContext, useContext, useState } from 'react';

interface TdeeProps {
  children: React.ReactNode;
}

interface TdeeContextProps {
  tdeeId: number | null;
  setTdeeId: (tdeeId: number | null) => void;
}

const TdeeContext = createContext<TdeeContextProps | null>(null);
export const TdeeProvider: React.FC<TdeeProps> = ({ children }) => {
  const [tdeeId, setTdeeIdState] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const storedTdeeId = localStorage.getItem('tdeeId');
      return storedTdeeId ? Number(storedTdeeId) : null;
    }
    return null;
  });

  const setTdeeId = (newTdeeId: number | null) => {
    setTdeeIdState(newTdeeId);
    if (typeof window !== 'undefined') {
      if (newTdeeId !== null) {
        localStorage.setItem('tdeeId', String(newTdeeId));
      } else {
        localStorage.removeItem('tdeeId');
      }
    }
  };

  return (
    <TdeeContext.Provider value={{ tdeeId, setTdeeId }}>
      {children}
    </TdeeContext.Provider>
  );
};
export const useTdee = () => {
  const context = useContext(TdeeContext);

  if (!context) {
    throw new Error('useTdee must be used within a TdeeProvider');
  }
  return context;
};
