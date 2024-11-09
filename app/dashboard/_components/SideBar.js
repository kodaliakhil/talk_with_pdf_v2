import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";

const SideBar = () => {
  return (
    <div className="shadow-md h-screen p-5">
      {/* LOGO */}
      <div className="flex items-center justify-center">
        <h1 className="text-3xl">AI </h1>
        <Image src={"/logo.svg"} alt="AI PDF logo" width={30} height={30} />
        <h1 className="text-3xl"> PDF</h1>
      </div>

      <div className="mt-10">
        <Button className="w-full">+ Upload PDF</Button>
        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-1">2 out of 5 PDFs uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to upload more PDFs</p>
      </div>
    </div>
  );
};

export default SideBar;
