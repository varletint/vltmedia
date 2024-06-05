import { Button, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BiSearch, BiMoon } from "react-icons/bi";

export default function Header2() {
  return (
    <Navbar className=" border-b-2">
      <Link
        to="/"
        className=" self-center whitespace-nowrap font-semibold text-sm sm:text-xl
       "
      >
        <span
          className=" px-3 py-1 self-center bg-gradient-to-r
         from-pink-600 via-pink-800  to-red-600
         text-white rounded-lg"
        >
          LandMark
        </span>
        Blog
      </Link>
      <form action="">
        <TextInput
          type="text"
          placeholder="Searching..."
          rightIcon={BiSearch}
          className=" hidden lg:inline"
        />
      </form>
      <Button className=" h-10 w-12" color="gray" pill>
        <BiSearch />
      </Button>
      <div className=" flex gap-2 md:order-2">
        <Button className=" h-10 w-12 hidden lg:inline" color="gray" pill>
          <BiMoon />
        </Button>
        <Button
          className=" bg-green-600 text-white hover:text-black"
          color="green"
        >
          Sign In
        </Button>
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link>
          <Link>hello</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
