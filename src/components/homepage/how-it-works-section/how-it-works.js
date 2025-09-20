/* Importing required libraries and media */
import Image from "next/image";
import LeanMoreButton from "./learn-more-button";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import SectionHeader from "@/components/menu-page/section-header";

/* Details for each user card */
const users = [
  {
    heading: "Teachers",
    text: "Teachers can create quizzes, manage classes, and track progress easily.",
    image: "/Assets/teacher.svg",
    link: "/how-it-works",
  },
  {
    heading: "Students",
    text: "Students can join classes, take quizzes, and boost your learning.",
    image: "/Assets/student.svg",
    link: "/how-it-works",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <div className="w-2/3 mx-10">
        {/* Heading for the user section */}
        <SectionHeader headingText="How It Works" />
         <p className="text-xl my-3 max-w-xl">Empowering Students and Teachers to Learn and Teach Smarter</p>
      </div>

      {/* Large Screen Slider */}
      <div className=" flex justify-between mx-10 relative">
        {users.map((user, index) => (
          <div
            key={index}
            className={`flex ${
              index === 0 ? "justify-start" : "justify-end"
            } relative`}
          >

            {/* Card */}
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={false}>
              <div
                className={`lg:scale-90 xl:scale-100  flex mt-5 `}
              >
                <div className={`${index === 1 ? "xl:ml-10" : ""}`}>
                  <Image
                    src={user.image}
                    width={350}
                    height={350}
                    alt={user.heading}
                    className="rounded-[2vw] rounded-br-none relative"
                  />
                </div>

                <div className="mt-6 rounded-tr-[2vw]  bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-emerald-500 via-emerald-300 from-1% to-emerald-200 to-100% xl:w-[200px] xl:h-[180px] lg:w-[200px] lg:h-[170px] ">
                  <p className="text-primary font-medium p-4 xl:py-8 lg:py-6">
                    {user.text}
                  </p>
                  <div className="mx-10 xl:scale-125 ">
                    <Link href={user.link}>
                     
                        <LeanMoreButton />
                     
                    </Link>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
}
