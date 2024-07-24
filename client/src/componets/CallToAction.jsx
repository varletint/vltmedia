import React from "react";
import img from "../assets/img/more.jpg";

export default function CallToAction() {
  return (
    <div className=''>
      <div className='flex flex-col sm:flex-row p-3  justify-center items-center  text-center '>
        <div className=' flex-1 justify-center flex flex-col lg:px-7 '>
          <h1 className=' text-2xl text-green font-bold'>
            Want to know more about
          </h1>
          <p className=' text-gray-500 my-3'>Checkout these resources</p>
          <button className=' btn btn-long rounded-tl-xl rounded-bl-none '>
            <a href='/' target='_blank' rel='nooperner moferrer'>
              Sport news
            </a>
          </button>
        </div>
        <div className='p-5 flex-1'>
          <img src={img} />
        </div>
      </div>
    </div>
  );
}
