import React from "react";

export default function About() {
  return (
    <div className=' flex justify-center items-center min-h-screen'>
      <div className=' max-w-2xl mx-auto p-4 sm:text-center text-left font-mono'>
        <div className=' select-none'>
          <h1 className='text-2xl flex gap-3 items-center sm:text-3xl sm:justify-center font-semibold text-green my-7 whitespace-nowrap'>
            <span className=' text-gray-500 text-3xl'>About</span> Varletint
            <span className='text-black'> Media</span>
          </h1>
          <div className=' flex flex-col gap-6 text-xl text-gray-500'>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              dolore neque vero veniam quos optio rerum totam delectus
              consequuntur velit tempore beatae, minus laudantium asperiores ut
              veritatis modi, rem distinctio.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              dolore neque vero veniam quos optio rerum totam delectus
              consequuntur velit tempore beatae, minus laudantium asperiores ut
              veritatis modi, rem distinctio.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              dolore neque vero veniam quos optio rerum totam delectus
              consequuntur velit tempore beatae, minus laudantium asperiores ut
              veritatis modi, rem distinctio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
