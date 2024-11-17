"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const { user } = useUser();
  const path = usePathname();
  const GetUserInfo = useQuery(api.user.getUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(GetUserInfo);
  const filesList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  const fileCount = filesList?.length;
  const isMaxFile = fileCount >= 5 && !GetUserInfo?.upgrade ? true : false;
  return (
    <div className="shadow-md h-screen p-5">
      {/* LOGO */}
      <div className="flex items-center justify-center">
        <h1 className="text-3xl">AI </h1>
        <Image src={"/logo.svg"} alt="AI PDF logo" width={30} height={30} />
        <h1 className="text-3xl"> PDF</h1>
      </div>

      <div className="mt-10">
        <UploadPdfDialog isMaxFile={isMaxFile}>
          <Button className="w-full">+ Upload PDF</Button>
        </UploadPdfDialog>
        {isMaxFile && (
          <p className="text-sm text-red-400 mt-2">* PDF limit reached</p>
        )}
        <Link href={"/dashboard"}>
          <div
            className={` ${path === "/dashboard" && "bg-slate-200"} flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer`}
          >
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <div
            className={`${path === "/dashboard/upgrade" && "bg-slate-200"} flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer`}
          >
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>
      </div>
      {!GetUserInfo?.upgrade && (
        <div className="absolute bottom-24 w-[80%]">
          <Progress value={(fileCount / 5) * 100} />
          <p className="text-sm mt-1">{fileCount} out of 5 PDFs uploaded</p>
          <p className="text-sm text-gray-400 mt-2">
            Upgrade to upload more PDFs
          </p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
