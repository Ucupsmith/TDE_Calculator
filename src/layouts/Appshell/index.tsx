import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AppShell: React.FC<LayoutProps> = ({ children }) => {
  return <div className="w-full h-screen border gap-3">{children}</div>;
};

export default AppShell;
