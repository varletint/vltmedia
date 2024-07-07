import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../componets/DashSidebar";
import DashProfile from "../componets/DashProfile";
import DashPost from "../componets/DashPost";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const tabParams = new URLSearchParams(location.search);
    const tabFromUrl = tabParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className=" min-h-screen flex  flex-col md:flex-row ">
      <div className=" md:w-56 ">
        {/* Sidebar */}

        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab == "posts" && <DashPost />}
    </div>
  );
}
