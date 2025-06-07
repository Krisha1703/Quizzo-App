import Image from "next/image"
import { motion } from "framer-motion"

const Syllabus = ({ description, learningOutcomes, schedules }) => {
  return (
    <div className="p-6 w-5/6 mx-auto"> 
      <h2 className="text-xl font-semibold mb-4">Course Description</h2>
      <p className="mb-6">{description}</p>

        <h3 className="text-xl font-semibold mb-4">Learning Outcomes</h3>
      <ul className="space-y-3">
        {learningOutcomes.map((outcome, index) => (
            <li key={index} className="flex items-center gap-2">
            <Image src="/Assets/bulletin.svg" alt="bullet" width={25} height={25} className="" />
            <span>{outcome}</span>
            </li>
        ))}
        </ul>


       <h3 className="text-xl font-semibold mt-8 mb-4">Class Schedule</h3>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {schedules.map((schedule, index) => {

        const [dayAndStart, endTime] = schedule.split(" - ");
        const [day, ...startTimeParts] = dayAndStart.split(" ");
        const startTime = startTimeParts.join(" ");

        return (
          <motion.div
            key={index}
            className="relative overflow-hidden bg-secondary border border-border rounded-xl shadow-md p-3 cursor-pointer text-white"
            whileHover="hover"
          >

            <motion.div
              className="absolute top-0 left-0 h-full bg-primary z-0"
              variants={{ hover: { width: "100%" } }}
              initial={{ width: "0%" }}
              transition={{ duration: 0.6 }}
            />

        
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-1">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 9h10m2-5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z"
                  />
                </svg>
                <span className="text-lg font-semibold capitalize">{day}</span>
              </div>
              <p className="text-sm">
                {startTime} - {endTime}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>

  </div>
  )
}

export default Syllabus