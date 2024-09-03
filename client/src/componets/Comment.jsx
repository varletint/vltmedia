import { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
  // useEffect(() => {
  //   const getFullname = async () => {
  //     try {
  //       const res = await fetch(`/api/fullname/${comment.fullnameId}`);
  //       if (res.ok) {
  //         const data = await res.json();
  //         setFullname(data);
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getFullname();
  // }, [comment]);

  return (
    <div className=' flex p-3 border-b'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className=' w-10 h-10 rounded-full'
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={"profile picture"}
        />
      </div>
      <div className='flex-1 text-[0.83rem]'>
        <div
          className=' font-[poppins] text-gray-500 flex 
        text-[0.75rem] items-center gap-5'>
          {/* fullname display */}
          {/* u */}
          <span className=' font-semibold'>{comment.fullname}</span>
          <span className=''>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className=' px-2 text-gray-500 '>{comment.content}</p>
      </div>
    </div>
  );
}
