import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { BiRightArrowAlt } from "react-icons/bi";
const ButtonOne = (props:any) => {
  return (
    <Link
      href={props.href}
      className={twMerge("flex gap-2 justify-center items-center text-base px-4 py-4 rounded-xl text-primary  font-bold w-[129px]",
        props?.className
      )}
    > <span>{props.title}</span>
      
    </Link>
  );
};

export default ButtonOne;