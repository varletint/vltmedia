import { Link } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { BiLock, BiUser, BiMailSend, BiLogoGoogle } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=" min-h-screen mt-20">
      <div
        className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-5"
      >
        {/* left div */}
        <div className=" flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-lime-600
        via-lime-700 to-green-600 rounded-lg text-white"
            >
              Mr Js
            </span>
            Blog
          </Link>
          <p className=" text-sm mt-5">
            This is Blog Website. You can sign up with email and password or
            with Google to become a Member
          </p>
        </div>
        {/* right div */}
        <div className=" flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                icon={BiMailSend}
                onChange={loadFormData}
              />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput
                type="text"
                placeholder="**********"
                id="password"
                icon={BiLock}
                onChange={loadFormData}
              />
            </div>
            <Button
              className=" bg-green-700 hover:bg-green-900 "
              type="submit"
              // disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className=" pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
