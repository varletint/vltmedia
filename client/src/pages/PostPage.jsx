import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../componets/CallToAction";
import CommentSection from "../componets/CommentSection";
import moment from "moment";
import { Helmet } from "react-helmet";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  if (loading)
    return (
      <div className='  min-h-screen flex  justify-center items-center'>
        {/* <Spinner size={"xl"} /> */}
        <div className='loader'></div>
      </div>
    );
  return (
    <>
      <Helmet>
        <title>{post && post.title}</title>
        <meta property='og:title' content={post && post.title} />
        <meta property='og:description' content={post && post.title} />
        <meta property='og:image' content={post && post.image} />
        {/* <meta property='og:slug' content={post && post.slug} /> */}
        <link
          rel='conical'
          href={`https://vltmedia.onrender.com/${post && post.slug}`}
        />
      </Helmet>
      <main className='font-[poppins] p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1
          className=' self-start font-semibold text-3xl mt-10 p-3 text-left 
       max-w-6xl lg:text-4xl text-gray-600'>
          {post && post.title}
        </h1>
        <Link
          to={`/search?category=${post && post.category}`}
          className=' self-center mt-5'>
          <Button className='rounded' color={"gray"} size={"xs"}>
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.title}
          className=' mt-10 
      p-3 max-h-[600px] w-full object-cover'
        />
        <div
          className=' flex justify-between p-3 border-b border-slate-500 mx-auto
      w-full max-w-2xl text-xs'>
          <span> {post && moment(post.createdAt).format("MMM DD, YYYY")} </span>
          <span className=' italic'>
            {" "}
            {post && (post.content.length / 1000).toFixed(0)} mins read{" "}
          </span>
        </div>
        <div
          className=' text-gray-500 p-3 max-w-2xl mx-auto w-full post-content'
          dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
        <div className=' max-w-4xl mx-auto w-full '>
          <CallToAction />
        </div>
        <CommentSection postId={post._id} />
      </main>
    </>
  );
}
