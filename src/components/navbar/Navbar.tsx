import Image from "next/image";
import React from "react";
import Hearts from "@/assets/homepage/hearts.png";
const Navbar = () => {
  return (
    <div className="w-full h-40 flex justify-center items-center bg-[#ea50c3]">
      <Image src={Hearts} alt={""} className="w-36 h-32" />
    </div>
  );
};

export default Navbar;
