import { Alert, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";

export default function dashEdit() {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [updateMessage, setUpdateMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(user).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/adminUpdate/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(error.message);
      } else {
        setUpdateMessage("Update successfull");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/update/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {}
    };
    fetchUser();
  }, [userId]);
  // console.log(userId);
  return (
    <div
      className=' max-w-lg mx-auto 
    p-3 w-full '>
      <h1
        className=' my-7 text-center 
      font-semibold text-3xl'>
        Profile
      </h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div
          className='w-32 h-32 self-center  
        cursor-pointer shadow-md overflow-hidden 
        rounded-full mb-10'>
          <img
            src={user.profilePicture}
            alt='user'
            className=' rounded-full w-full h-full 
            object-cover border-0 border-[lightgray] 
            '
          />
        </div>
        {currentUser.isAdmin && (
          <div div className='flex flex-col gap-4'>
            <div className=''>
              <Label value='Full-name' />
              <TextInput
                type='text'
                id='fullname'
                placeholder='Full-name'
                defaultValue={user.fullname}
                onChange={handleChange}
              />
            </div>

            <div className='flex justify-between '>
              <div className=''>
                <Label value='Admin' />
                <TextInput
                  type='boolean'
                  id='isAdmin'
                  defaultValue={user.isAdmin}
                  onChange={handleChange}
                />
              </div>
              <div className=''>
                <Label value='Author' />
                <TextInput
                  type='boolean'
                  id='isAuthor'
                  defaultValue={user.isAuthor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <TextInput
              type='text'
              id='username'
              placeholder='username'
              defaultValue={user.username}
              disabled
            />
            <TextInput
              type='email'
              id='email'
              placeholder='email'
              defaultValue={user.email}
              disabled
            />
          </div>
        )}
        <div className=' flex flex-col justify-between gap-2 lg:flex-row w-full'>
          <button
            type='submit'
            className=' lg:w-24 btn btn-long btn-rounded'
            // disabled={loading}
          >
            Update
          </button>
        </div>
      </form>
      {updateMessage && (
        <Alert className='mt-5' color={"success"}>
          {updateMessage}
        </Alert>
      )}
    </div>
  );
}
