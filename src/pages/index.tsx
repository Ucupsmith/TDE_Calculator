import ButtonComponent from "@/components/ButtonComponent/Button";
import { Button, Typography } from "@material-tailwind/react";
import React, { ChangeEvent, useState } from "react";

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center h-full items-center">
      <Typography className="font-poppins md:text-2xl text-sm text-green-400 font-semibold">
        ini server kita
      </Typography>
      <ButtonComponent />
    </div>
  );
};

export default Home;
