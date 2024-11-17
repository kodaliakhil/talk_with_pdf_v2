"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { FileText, PhoneForwarded } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  const filesList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(filesList);
  return (
    <div>
      <h2 className="font-medium text-3xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {filesList?.length > 0
          ? filesList?.map((file, index) => (
              <Link key={index} href={`/workspace/${file?.fileId}`}>
                <div className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <FileText width={50} height={50} />
                  <h2 className="mt-3 font-medium text-lg">{file?.fileName}</h2>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <div
                key={index}
                className=" bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
