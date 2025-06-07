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
  const [tdeeId, setTdeeId] = useState<number | null>(null);
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
