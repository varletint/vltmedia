import { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
  const [user, setUser] = useState({});

  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className=' flex p-3 border-b'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className=' w-10 h-10 rounded-full'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1 text-[0.83rem]'>
        <div
          className=' font-[poppins] text-gray-500 flex 
        text-[0.75rem] items-center gap-5'>
          <span className=' font-semibold'>
            {user ? `*${user.username}` : "anonymous user"}
          </span>
          <span className=''>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className=' px-2 text-gray-500 '>{comment.content}</p>
      </div>
    </div>
  );
}
