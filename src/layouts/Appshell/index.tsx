import Navbar from "@/components/navbar/Navbar";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const dissableNavbar = [
  "/auth/register",
  "/auth/login",
  "/auth/forget-password",
  "/404",
];

const AppShell: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="md:w-full md:px-10 px-0 bg-[#132A2E]">
      <div className="md:px-20 px-0 h-screen">
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
