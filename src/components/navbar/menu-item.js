import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({ title, create, panel, onClick, link, menupage }) => {
  const pathname = usePathname(); // get current route
  const isActive = link && pathname === link; // check if active

  const Content = (
    <div
      className={`relative group cursor-pointer flex flex-col ${
        panel ? "items-start" : "items-center"
      }`}
      onClick={!link ? onClick : undefined}
    >
      <motion.h1
        className={`font-semibold transition-colors ${
          panel
            ? `text-left ${menupage ? "text-2xl" : "text-lg"}`
            : `text-center ${menupage ? "text-2xl" : "text-xl"}`
        } ${
          isActive
            ? "text-secondary " // highlight current
            : panel
            ? "text-white"
            : "text-primary"
        } group-hover:text-secondary`}
      >
        {title}
      </motion.h1>

      {/* Arrow animation */}
      <motion.div
        initial={{ opacity: 0, y: -5, x: 10 }}
        animate={{ opacity: 1, y: 5 }}
        whileHover={{ x: 20 }}
        transition={{ duration: 0.5 }}
        className={`absolute mt-6 hidden group-hover:block ${
          panel ? "ml-7" : create ? "ml-5" : ""
        }`}
      >
        <Image
          src="/Assets/arrow.png"
          width={50}
          height={50}
          alt="arrow"
          className={`${panel ? "scale-125" : ""}`}
        />
      </motion.div>
    </div>
  );

  return link ? <Link href={link}>{Content}</Link> : Content;
};

export default MenuItem;
