import { Button, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import Plate from "@/assets/auth/Plate.svg";
import SignInIcon from "@/assets/auth/SignInIcon.svg";
import FruitList from "@/assets/auth/FruitList.svg";
import Google from "@/assets/auth/Google.svg";
import Facebook from "@/assets/auth/Facebook.svg";

const LoginComponent = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="md:w-1/2 hidden object-fill md:flex flex-col justify-center">
        <Image src={SignInIcon} alt={SignInIcon} />
      </div>
      <div className="md:w-1/2 w-full flex flex-col bg-[#132A2E] overflow-y-hidden items-center">
        <div className="w-full items-center flex justify-start">
          <Image src={Plate} alt={Plate} className="md:w-40 w-24 " />
        </div>
        <div className="flex flex-col h-full gap-4 items-center md:w-96 w-full justify-between">
          <div className="w-full flex flex-row justify-center">
            <Typography className="font-semibold font-poppins text-2xl text-white">
              Sign In
            </Typography>
          </div>
          <div className="w-full flex flex-col items-center justify-between h-60">
            <div className="md:w-full w-72 flex flex-col gap-1 px-3">
              <label className="font-poppins font-semibold text-sm text-white">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="please insert your email"
                className="bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white"
                labelProps={{
                  className: "hidden floating-none",
                }}
              />
            </div>
            <div className="md:w-full w-72 flex flex-col gap-1 px-3">
              <label className="font-poppins font-semibold text-sm text-white">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="please insert your password"
                className="bg-white focus:outline-none shadow-sm focus:ring-2 ring-white focus:border-white"
                labelProps={{
                  className: "hidden floating-none",
                }}
              />
            </div>
            <div className="md:w-80 w-60 flex flex-col justify-center items-center gap-2 text-center">
              <Button className="border-none w-full rounded-[25px] bg-[#144B3C]">
                Sign in
              </Button>
              <Typography className="font-semibold font-poppins md:text-sm text-[12px] text-white">
                Don’t have an Account? Sign up Here!
              </Typography>
            </div>
          </div>
          <div className="md:w-1/2 w-72 flex flex-col items-center gap-2">
            <Typography className="font-semibold font-poppins text-[12px] text-white">
              or
            </Typography>
            <Typography className="font-semibold font-poppins text-[12px] text-white">
              Sign Up With
            </Typography>
            <div className="flex flex-col items-center">
              <div className="flex flex-row justify-center gap-1">
                <Image src={Google} alt={Google} className="cursor-pointer" />
                <Image
                  className="cursor-pointer"
                  src={Facebook}
                  alt={Facebook}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <Image className="w-96" src={FruitList} alt={FruitList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
