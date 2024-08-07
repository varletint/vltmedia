import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [color, setColor] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(searchTerm);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}&order=${"desc"}`);
  };

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
  return (
    <Navbar className='border-b-2 font-[poppins]'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm
        sm:text-xl font-bold dark:text-white
        text-green shadow-md
        select-none cursor-none '>
        <span
          className='px-2 py-1 bg-green mr-1 rounded text-white
         text-[24px] shadow'>
          VLT
        </span>
        Varletint
      </Link>

      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='search...'
          rightIcon={AiOutlineSearch}
          className=' hidden lg:inline '
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Link to={"/search"}>
        <Button className='w-12 h-10 lg:hidden ' color='gray'>
          <AiOutlineSearch />
        </Button>
      </Link>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden lg:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                class=' h-10 w-10 '
                img={currentUser.profilePicture}
                alt='user'
                rounded
              />
            }>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                @{currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in' className='flex '>
            {/* <Button className=" bg-green text-white hover:bg-green-700" pill >
              Sign In
            </Button> */}
            <button
              className=' px-3 py-2 text-white font-[500] bg-[#12a32d]
              hover:bg-[#127725]  transition-all duration-300
              shadow-md rounded'>
              Sign in
            </button>
          </Link>
        )}
        <Navbar.Toggle color='gray' />
      </div>
      <Navbar.Collapse className=' font-bold text-green-400'>
        <Navbar.Link active={path == "/"} as={"div"}>
          {path == "/" ? (
            <Link className=' font-bold ' to='/'>
              Home
            </Link>
          ) : (
            <Link className=' font-bold text-green' to='/'>
              Home
            </Link>
          )}
        </Navbar.Link>
        <Navbar.Link active={path == "/about"} as={"div"}>
          {path == "/about" ? (
            <Link className=' font-bold' to='/about'>
              About
            </Link>
          ) : (
            <Link className=' font-bold text-green' to='/about'>
              About
            </Link>
          )}
        </Navbar.Link>
        {/* <Navbar.Link active={path == "/projects"} as={"div"}>
          <Link className=' font-bold text-green' to='/projects'>
            Projects
          </Link>
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
