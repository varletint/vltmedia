import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { BiLock, BiUser, BiMailSend, BiLogoGoogle } from "react-icons/bi";
import { useState } from "react";

export default function SignUP() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    if (formData.password.length < 8) {
      return setErrorMessage("Password must be 8 character");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = res.json();
      // console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className=' min-h-screen mt-20'>
      <div
        className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row
      md:items-center gap-5'>
        {/* left div */}
        <div className=' flex-1'>
          <Link
            to='/'
            className=' select-none font-bold dark:text-white   text-4xl'>
            <span className='px-2 py-1 bg-green mr-1 rounded-l-lg text-white'>
              Varletint
            </span>
            media
          </Link>
          <p className=' text-sm mt-5'>
            This is Blog Website. You can sign up with email and password or
            with Google to become a Member
          </p>
        </div>
        {/* right div */}
        <div className=' flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                icon={BiUser}
                onChange={loadFormData}
              />
            </div>
            <div className=''>
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='Email'
                id='email'
                icon={BiMailSend}
                onChange={loadFormData}
              />
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput
                type='text'
                placeholder='Password'
                id='password'
                icon={BiLock}
                onChange={loadFormData}
              />
            </div>
            {/* <Button
              className=" bg-gradient-to-r from-green-600
              via-green-700 to-green-800 hover:bg-green-900 "
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className=" pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button> */}
            <button
              className='btn-long btn btn-rounded'
              type='submit'
              disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className=' pl-3'>Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
