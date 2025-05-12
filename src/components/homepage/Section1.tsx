import { Avatar, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import Hero from "@/assets/homepage/Hero_Section.svg";

const Section1: React.FC = () => {
  return (
    <div className="w-full flex py-5">
      <div className="w-1/2 flex flex-col justify-evenly">
        <div className="flex flex-col items-center w-full gap-2">
          <div className="flex flex-row space-x-2">
            <Typography className="text-white font-bold font-poppins text-4xl">
              Calculate Your
            </Typography>
            <Typography className="font-bold font-poppins text-4xl text-[#34D399]">
              TDEE
            </Typography>
          </div>
          <div className="w-auto flex justify-end">
            <Typography className="font-semibold font-poppins opacity-45 text-white text-xl">
              Reach Your Health Goals
            </Typography>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button className="w-48 border-none rounded-[15px] py-3 px-2 bg-[#34D399]">
            Calculate Your BMR Now!
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <Image className="" width={300} height={300} src={Hero} alt={Hero} />
      </div>
    </div>
  );
};

export default Section1;
