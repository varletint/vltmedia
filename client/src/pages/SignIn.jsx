import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function Signin() {
  return (
    <div className=" min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto  flex-col md:flex-row md:items-center gap-5">
        <div className=" flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span
              className=" px-2 py-2 bg-gradient-to-r 
            from-lime-600 via-lime-800 to-green-800 
            rounded-lg text-white"
            >
              Landmark
            </span>
            Blog
          </Link>
          <p className=" text-sm mt-5">
            {" "}
            This is my Blog Website. So stay tune!!!
          </p>
        </div>
        <div className=" flex-1">
          <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <Button className="" pill>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
