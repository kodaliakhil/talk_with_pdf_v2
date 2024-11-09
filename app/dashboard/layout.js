import React from "react";
import SideBar from "./_components/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
};

export default DashboardLayout;