import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowRight,
  HiDocumentText,
  HiUsers,
  HiAnnotation,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(error);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const tabParams = new URLSearchParams(location.search);
    const tabFromUrl = tabParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className='font-[poppins] w-full md:w-56  c '>
      <Sidebar.Items>
        <Sidebar.ItemGroup className=' flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              labelColor={currentUser.isAdmin ? "green" : "yellow"}
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              className=' font-semibold'
              as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  className=' font-semibold'
                  active={tab === "users"}
                  icon={HiUsers}
                  as='div'>
                  Users
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=posts'>
                <Sidebar.Item
                  className=' font-semibold'
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  as='div'>
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  className=' font-semibold'
                  active={tab === "posts"}
                  icon={HiAnnotation}
                  as='div'>
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            className=' cursor-pointer font-[500]'
            onClick={handleSignout}
            icon={HiArrowRight}>
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
