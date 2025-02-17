import Navbar from "@/components/navbar/Navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AppShell: React.FC<LayoutProps> = ({ children }) => {
  return <div className="w-full h-screen">{children}</div>;
};

export default AppShell;
