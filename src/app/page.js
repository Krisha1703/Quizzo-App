"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-full mx-auto my-5 ">
      <Navbar />

      <div className="flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-4 mx-5">
        <Card title={"General Knowledge"} src={"/Assets/general-knowledge.png"} href={"/instruction"}/>
        <Card title={"Science & Nature"} src={"/Assets/science-nature.png"}  href={"/instruction"}/>
        <Card title={"History"} src={"/Assets/history.png"}  href={"/instruction"}/>
        <Card title={"Geography"} src={"/Assets/geography.png"}  href={"/instruction"}/>
      </div>
      
    </div>
  );
}
