import ButtonComponent from "@/components/buttoncomponent/Button";
import Section1 from "@/components/homepage/Section1";
import Section2 from "@/components/homepage/Section2";
import { Button, Typography } from "@material-tailwind/react";
import React, { ChangeEvent, useState } from "react";
import { useInView } from "react-intersection-observer";

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Section1 />
      <Section2 />
    </div>
  );
};

export default HomePage;
