import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const dissableNavbar = ["/auth/register", "/auth/login"];

const AppShell: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <div className="w-full h-screen px-10 py-3 bg-[#132A2E]">
      <div className="px-20">
        {!dissableNavbar.includes(pathname) ? (
          <Navbar />
        ) : (
          dissableNavbar.includes(pathname)
        )}
        {children}
      </div>
    </div>
  );
};

export default AppShell;
