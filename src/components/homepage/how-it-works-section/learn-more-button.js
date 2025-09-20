import Image from "next/image";
import { motion } from "framer-motion";

export default function LeanMoreButton() {
    return (
        <motion.div className="flex -mt-5"
                    initial={{x: 0}}
                    whileHover={{x:20, scale: 1.1}}
                    transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                    }}
        >
            <p className="text-primary -mt-1 text-xs md:text-sm font-bold py-3 cursor-pointer  mr-1  md:mr-4">Read More</p>
            
            <div className="scale-75 my-1cursor-pointer  xl:my-2 md:scale-100 md:my-3">
                <Image src="/Assets/next.png" quality={100} width={20} height={20} alt="read arrow" />
            </div>

        </motion.div>
    );
}