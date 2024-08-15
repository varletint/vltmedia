import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../componets/DashSidebar";
import DashProfile from "../componets/DashProfile";
import DashPosts from "../componets/DashPosts";
import DashUsers from "../componets/DashUsers";
import DashComments from "../componets/DashComments";
import DashboardComp from "../componets/DashboardComp";
import DashAllPosts from "../componets/DashAllPosts";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const tabParams = new URLSearchParams(location.search);
    const tabFromUrl = tabParams.get("tab");
    // console.log(tabFromUrl);

    // checking if there is url tab
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div
      className=' min-h-screen  
    bg-[#faf6f6]
    flex  flex-col md:flex-row '>
      <div className=' md:w-56 '>
        {/* Sidebar */}

        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
      {tab === "dash" && <DashboardComp />}
      {tab === "allposts" && <DashAllPosts />}
    </div>
  );
}
