import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { GoProjectRoadmap } from "react-icons/go";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);

  const loadFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  return (
    <div className=" min-h-screen mt-20 ">
      <div
        className=" flex max-w-3xl m-auto flex-col md:flex-row
       p-3 md:items-center gap-5"
      >
        <div className=" flex-1">
          <Link
            className="  self-center whitespace-nowrap 
           font-bold text-4xl 
           "
          >
            <span
              className="px-2 py-1 bg-gradient-to-r
               from-lime-400 via-green-500 to-green-700 rounded-lg
              text-white  "
            >
              LandMark
            </span>
            Blog
          </Link>
          <p
            className="
           mt-5  text-justify"
          >
            It's not just a Blog Website, is where Blog are made!!. You can sign
            up using email and password or using Google to become a member
          </p>
        </div>

        <div className=" flex-1">
          <form action="" className=" flex flex-col gap-5">
            <div>
              <label htmlFor="">Your username</label>
              <TextInput
                placeholder="username"
                id="username"
                icon={GoProjectRoadmap}
                onChange={loadFormData}
              />
            </div>
            <div>
              <label htmlFor="">Your username</label>
              <TextInput
                placeholder="username"
                id="email"
                onChange={loadFormData}
              />
            </div>
            <div>
              <label htmlFor="">Your username</label>
              <TextInput
                placeholder="username"
                onChange={loadFormData}
                id="password"
              />
            </div>

            <Button
              className="  hover:text-black
               text-white"
              // color="red"
              style={{ backgroundColor: "green" }}
            >
              <Spinner size="sm">loading</Spinner>
            </Button>
            <button
              className=" px-3 py-2 rounded-lg 
              text-white hover:bg-green-700
               hover:text-black"
              // style={{ backgroundColor: color }}
              // color="red"
            >
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
