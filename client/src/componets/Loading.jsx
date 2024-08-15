import React from "react";
import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className=' min-h-screen flex  justify-center items-centerw-full mx-auto max-w-3xl'>
      {/* <Spinner size={"xl"} color={"success"} /> */}
      <div className='loader'></div>
    </div>
  );
}
