import React, { createContext, useContext, useEffect, useState } from 'react';

const SessionExpiredContext = createContext({
  open: false,
  show: () => {},
  hide: () => {}
});

export const useSessionExpired = () => useContext(SessionExpiredContext);

export const SessionExpiredProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    window.addEventListener('sessionExpired', handler);
    return () => window.removeEventListener('sessionExpired', handler);
  }, []);

  return (
    <SessionExpiredContext.Provider value={{ open, show, hide }}>
      {children}
    </SessionExpiredContext.Provider>
  );
};
