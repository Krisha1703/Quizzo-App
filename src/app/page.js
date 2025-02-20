"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-5/6 mx-auto p-4 my-5">
      <Navbar />

      <div className="md:flex flex-col justify-between space-y-4 md:space-x-4 md:space-y-0">
        <Card title={"General Knowledge"} src={"/Assets/general-knowledge.png"} onClick={router.push("/quiz")}/>
        <Card title={"Science & Nature"} src={"/Assets/science-nature.png"}/>
        <Card title={"Geography"} src={"/Assets/geography.png"}/>
      </div>
    </div>
  );
}
