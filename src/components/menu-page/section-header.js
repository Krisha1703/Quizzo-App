
import { motion } from 'framer-motion';
import Image from 'next/image';

const SectionHeader = ({headingText}) => {
  return (
        <motion.div className="text-primary flex items-center justify-start font-semibold text-3xl relative group mt-5">
          <div className="relative">
            {headingText}
          </div>
    
          {/* Arrow */}
          <motion.div
              initial={{ x: 10 }}
              whileHover={{ x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/Assets/arrow.png" width={90} height={100} alt="arrow" className='cursor-pointer' />
            </motion.div>
    
        </motion.div>
    );
}

export default SectionHeader