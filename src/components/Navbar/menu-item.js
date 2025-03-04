import { motion } from "framer-motion";
import Image from "next/image";

const MenuItem = ({ title, create, onClick }) => {
    return (
      <div className="relative group cursor-pointer flex flex-col items-center" onClick={onClick}>
        {/* Menu Text */}
        <motion.h1
          className="font-semibold text-xl text-primary group-hover:text-secondary"
        >
          {title}
        </motion.h1>
        
        {/* Arrow Appears Below on Hover */}
        <motion.div
          initial={{ opacity: 0, y: -5, x: 10 }}
          animate={{ opacity: 1, y: 5}}
          whileHover={{x:20}}
          transition={{ duration: 0.5 }}
          className={`${create ? "ml-5" : ""} absolute mt-6 hidden group-hover:block`}
        >
          <Image src="/Assets/arrow.png" width={50} height={50} alt="arrow" />
        </motion.div>
      </div>
    );
};

export default MenuItem;