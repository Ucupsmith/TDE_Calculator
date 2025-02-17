import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { button, Button, Typography } from "@material-tailwind/react";
import ModalOne from "../modal/ModalOne";
import Image from "next/image";
import border from "@/assets/homepage/OJZ2R60.jpg";

const Section1 = () => {
  const [buttonShow, setShowButton] = useState<boolean>(false);
  const handleShowButton = (): void => {
    setShowButton(!buttonShow);
  };
  return (
    <div className="flex flex-col w-full max-h-min  bg-[#e639ba]">
      <div className="w-full h-full flex justify-center items-start pt-10">
        <div className="flex flex-col gap-3 h-full relative">
          <Button
            onClick={handleShowButton}
            className="py-3 px-2 bg-[#ea50c3] w-full"
          >
            <Typography className="font-sans lowercase font-semibold">
              {buttonShow ? "coba buka deh 💗 🩷" : "HAPPY VALENTINES DAY 💗"}
            </Typography>
          </Button>
          {buttonShow ? null : <ModalOne />}
          <Image src={border} alt="hehe" className="absolute w-96 top-20" />
        </div>
      </div>
    </div>
  );
};

export default Section1;
