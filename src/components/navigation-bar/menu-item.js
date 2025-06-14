import { motion } from "framer-motion";
import Image from "next/image";

const MenuItem = ({ title, create, panel, onClick }) => {
  return (
    <div
      className={`relative group cursor-pointer flex flex-col ${panel ? "items-start" : "items-center"}`}
      onClick={onClick}
    >
   
      <motion.h1
        className={`font-semibold ${
          panel ? "text-white text-left text-lg" : "text-primary text-center  text-xl"
        } group-hover:text-secondary`}
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: -5, x: 10 }}
        animate={{ opacity: 1, y: 5 }}
        whileHover={{ x: 20 }}
        transition={{ duration: 0.5 }}
        className={`absolute mt-6 hidden group-hover:block ${panel ? "ml-7" : create ? "ml-5" : ""}`}
      >
        <Image src="/Assets/arrow.png" width={50} height={50} alt="arrow" className={`${panel ? "scale-125" : "" } `}/>
      </motion.div>
    </div>
  );
};

export default MenuItem;
