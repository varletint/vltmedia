import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loading from "./Loading";
import { set } from "mongoose";
import { parse } from "dotenv";
import { Link } from "react-router-dom";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [nusers, setNUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [author, isAuthor] = useState(false);
  const [makeAuthor, setMakeAuthor] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // setLoading(true);
        const res = await fetch(`/api/user/getUsers`);
        const data = await res.json();
        if (res.ok) {
          // setUsers(data.userWithOutPassword);
          // setLoading(false);
          setUsers(data.userWithOutPassword);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };

    const handleBoolen = async () => {
      try {
        const res = await fetch(`/api/user/makeAuthor/${userId}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: parse(JSON.stringify(users)),
        });
        const data = await res.json();

        setUsers({ ...data, isAuthor: !author });
      } catch (error) {
        console.log(error.message);
      }
    };
    handleBoolen();
    if (currentUser.isAdmin) {
      getUsers();
    }
  }, [currentUser._id]);

  // useEffect(() => {
  //   const handleBoolen = async () => {
  //     try {
  //       const res = await fetch(`/api/user/makeAuthor/${userId}`);
  //       const data = await res.json();

  //       setUsers({ ...data, isAuthor: !author });
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   handleBoolen();
  // }, [currentUser.isAdmin]);
  return (
    <>
      {loading && <Loading />}
      <div
        className='table-auto overflow-x-scroll 
    md:mx-auto p-3 scrollbar scrollbar-track-slate-100
    scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
     dark:scrollbar-thumb-slate-500
     font-[poppins]'>
        {currentUser.isAdmin && users.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Author</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <FaTimes className='text-red-500' />
                      )}
                    </Table.Cell>
                    <Table.Cell onClick={() => setUserId(user._id)} onChange>
                      {user.isAuthor ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <FaTimes className='text-red-500' />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className=' text-teal-500 hover:text-gray-900'
                        to={`/update-user/${user._id}`}>
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>You have no users yet!</p>
        )}
      </div>
    </>
  );
}
