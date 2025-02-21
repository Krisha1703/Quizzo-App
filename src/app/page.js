"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="w-5/6 mx-auto p-4 my-5">
      <Navbar />

      <div className="flex md:flex-row flex-col justify-between gap-4">
        <Card title={"General Knowledge"} src={"/Assets/general-knowledge.png"} href={"/instruction"}/>
        <Card title={"Science & Nature"} src={"/Assets/science-nature.png"}  href={"/instruction"}/>
        <Card title={"Geography"} src={"/Assets/geography.png"}  href={"/instruction"}/>
      </div>
      
    </div>
  );
}
