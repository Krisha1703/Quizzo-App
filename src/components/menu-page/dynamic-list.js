import React from "react";
import Image from "next/image";
import { sub } from "framer-motion/m";

const DynamicList = ({ items, subheading }) => {
  return (
    <>
    <p className="text-xl my-3 max-w-xl">{subheading}</p>
    <ul className="space-y-3 my-5">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          {/* Custom Icon instead of bullet */}
          <Image src={"/Assets/bulletin.svg"} alt="bullet" width={30} height={20} />

          {/* List Text */}
          <span className="text-xl">{item}</span>
        </li>
      ))}
    </ul>
    </>
  );
};

export default DynamicList;
