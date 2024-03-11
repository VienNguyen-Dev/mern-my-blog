import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

export default function Dashboard() {
  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className=" min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className=" md:w-56">
        <DashSidebar />
      </div>
      {/* SideProfile */}
      {tab === "profile" && <DashProfile />}
      {/* Post */}
      {tab === "posts" && <DashPost />}
      {/*  */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
      {/* Dashboard component */}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
}
