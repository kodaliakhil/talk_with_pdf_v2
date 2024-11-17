import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = ({ fileName }) => {
  return (
    <div className="flex p-4 justify-between shadow-md">
      <div className="flex">
        <h1 className="text-3xl">AI </h1>
        <Image src={"/logo.svg"} alt="AI PDF logo" width={30} height={30} />
        <h1 className="text-3xl"> PDF</h1>
      </div>
      <h2 className="font-bold">{fileName}</h2>
      <div className="flex gap-2 items-center">
        <Button>Save</Button>
      </div>
      <UserButton />
    </div>
  );
};

export default WorkspaceHeader;
