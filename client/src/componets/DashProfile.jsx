import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle delete function
  const handleDeleteUser = async () => {
    console.log("data");
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(error.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div
      className=" max-w-lg mx-auto 
    p-3 w-full "
    >
      <h1
        className=" my-7 text-center 
      font-semibold text-3xl"
      >
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className="w-32 h-32 self-center  
        cursor-pointer shadow-md overflow-hidden 
        rounded-full mb-10"
        >
          <img
            src={currentUser.profilePicture}
            alt="user"
            className=" rounded-full w-full h-full 
            object-cover border-0 border-[lightgray] 
            "
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="text"
          id="password"
          onChange={handleChange}
          placeholder="************"
        />
        <Button
          type="submit"
          className=" bg-gradient-to-r from-green-600
        via-green-600 to-green-700"
          disabled={loading}
        >
          {loading ? "loading" : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button type="button" className=" w-full" color="green">
              Create a Post
            </Button>
          </Link>
        )}
      </form>
      <div className=" flex justify-between text-red-500 mt-5">
        <span className=" cursor-pointer" onClick={() => setShowModel(true)}>
          Delete Account
        </span>
        <span onClick={handleSignout} className=" cursor-pointer">
          Sign Out
        </span>
      </div>

      {error && (
        <Alert color="failure" className=" mt5">
          {error}
        </Alert>
      )}

      <Modal
        show={showModel}
        size="md"
        onClose={() => setShowModel(false)}
        popup
      >
        <Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mx-auto mb-4" />
              <h3 className=" text-gray-400 mb-4">
                Are you sure want to delete your account
              </h3>
              <div className=" flex  justify-center gap-4">
                <Button onClick={handleDeleteUser} color="failure">
                  Yes, i'm sure
                </Button>
                <Button
                  color="green"
                  onClick={() => {
                    setShowModel(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
}
