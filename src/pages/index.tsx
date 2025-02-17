import ButtonComponent from "@/components/buttoncomponent/Button";
import Section1 from "@/components/section1/Section1";
import { Button, Typography } from "@material-tailwind/react";
import React, { ChangeEvent, useState } from "react";

const Home = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <Section1 />
    </div>
  );
};

export default Home;
