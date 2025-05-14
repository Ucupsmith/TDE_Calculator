import Image from "next/image";
import React from "react";
import Hearts from "@/assets/homepage/hearts.png";
import Link from "next/link";
import { Button, Typography } from "@material-tailwind/react";
import TdeeLogo from "@/assets/homepage/Logo.svg";
import { useRouter } from "next/router";

interface Navigation {
  label: string;
  navigate: string;
}

const Navigate: Navigation[] = [
  {
    label: "Home",
    navigate: "/home",
  },
  {
    label: "Tdee Calculator",
    navigate: "/Tdee-Calculator",
  },
  {
    label: "Meal Plan",
    navigate: "/Meal-Plan",
  },
  {
    label: "Article",
    navigate: "/Article",
  },
];

const Navbar = () => {
  const router = useRouter();
  const { push } = router;

  const handleRegist = async () => {
    return await push("/auth/register");
  };
  return (
    <div className="w-full h-14 flex flex-flex-row justify-between items-center px-3 bg-[#0B5F31] border-none rounded-[20px]">
      <div className="h-6 flex flex-col items-end justify-center">
        <Image className="w-28 pt-5" src={TdeeLogo} alt={TdeeLogo} />
      </div>
      <div className="w-full h-6 flex justify-evenly items-center">
        {Navigate !== null
          ? Navigate.map((title, id: number) => {
              return (
                <div
                  key={id}
                  className="w-auto h-6 flex justify-around items-center"
                >
                  {parseInt(title.label) === id ? (
                    <Link href={""}>
                      <Typography className="text-white font-semibold font-poppins text-[16px]">
                        {title.label}
                      </Typography>
                    </Link>
                  ) : (
                    <Link href={""}>
                      <Typography className="font-semibold font-poppins text-white text-[16px]">
                        {title.label}
                      </Typography>
                    </Link>
                  )}
                </div>
              );
            })
          : null}
      </div>
      <div className=" px-5">
        <Button
          onClick={handleRegist}
          className="w-40 h-9 flex items-center justify-center border-none px-5 rounded-[8px] bg-[#34D399]"
        >
          <Typography className="font-semibold font-poppins text-[12px]">
            Register now
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
