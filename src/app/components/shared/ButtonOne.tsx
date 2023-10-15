import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { BiRightArrowAlt } from "react-icons/bi";
type ButtonType = {
  href: string,
  className?: string,
  title: string
  icon?: string
}

const ButtonOne = (props:ButtonType) => {
  return (
    <Link
      href={props.href}
      className={twMerge("flex gap-2 justify-center items-center text-base px-4 py-3 rounded-xl text-primary  font-bold w-fit",
        props?.className
      )}

    >{props.icon} <span>{props.title}</span>
      
    </Link>
  );
};

export default ButtonOne;