// import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillExclamationCircle } from "react-icons/ai";
import { Alert, Textarea } from "flowbite-react";
import { BsChat } from "react-icons/bs";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const param = useParams();
  const slug = param.postSlug;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (comment === "") {
      return setErrorMessage("Comment cannot be blank");
    }

    setErrorMessage(null);
    if (comment.length > 200) {
      return setErrorMessage(
        "Comment cannot be blank nor its character to be greater than 200 characters"
      );
    }
    try {
      setErrorMessage(null);
      const res = await fetch("/api/comment/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setErrorMessage(null);
        setComment(" ");

        setComments([data, ...comments]);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const getCommentPosts = async () => {
      try {
        const res = await fetch(`/api/comment/getCommentPosts/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setErrorMessage(null);
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    };
    getCommentPosts();
  }, [postId]);

  return (
    <div className='max-w-2xl mx-auto w-full p-3 font-[poppins]'>
      {currentUser ? (
        <div className='flex gap-1 my-5 font-semibold text-sm'>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt='Profile Picture'
          />
          <Link
            className=' italic text-teal-500 hover:underline'
            to={"/dashboard?tab=profile"}>
            <p>*{currentUser.username}</p>
          </Link>
        </div>
      ) : (
        <div className=' mb-10'>
          <p
            className=' self-center text-center text-2xl font-semibold
            text-gray-500 my-4 mb-5'>
            Comments
          </p>
          <Link
            className='text-red-500 flex items-center gap-1'
            to={"/sign-in"}>
            <AiFillExclamationCircle className='w-5 h-5' />
            <p>Sign in to comment</p>
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className=' border-2  p-3 rounded-lg bg-gray-50 mb-16'
          onClick={handleSubmit}>
          <textarea
            className=' w-full rounded-lg '
            placeholder='Comment...'
            maxLength={"200"}
            rows={"3"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='flex items-center justify-between p-3'>
            <p className=' text-gray-500 text-[12px] '>
              {200 - comment.length} Characters Remaining
            </p>{" "}
            <button
              className='bg-[#12a32d] hover:bg-[#127725] text-white font-semibold
           py-[0.5rem] px-4 btn-green rounded-md shadow shadow-gray-300
            transition-all duration-400 disabled:cursor-not-allowed
            disabled:bg-current'
              type={"submit"}>
              Submit
            </button>
          </div>
          {errorMessage && (
            <Alert
              color={"failure"}
              className='mt-5
          '>
              {errorMessage}
            </Alert>
          )}
        </form>
      )}
      {comments.length > 0 ? (
        <>
          <div className=''>
            <div className='mb-5'>
              <p className=' text-xl italic text-gray-500'>Community matters</p>
              <p className=' text-xl italic font-semibold text-gray-500 mt-10'>
                Top Comments
              </p>
            </div>
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </>
      ) : (
        <div className=''> No comments yet</div>
      )}
    </div>
  );
}
