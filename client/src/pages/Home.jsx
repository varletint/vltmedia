import React from "react";
import CallToAction from "../componets/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../componets/PostCard2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className='application'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>VLT media</title>
          <meta name='og:title' content='vlt media' />
          <meta name='og:image' content='../assets/img/more.jpg' />
          <meta name='twitter:image' content='../assets/img/more.jpg' />
          <meta name='og:description' content='Home of local news' />
          <meta name='og:url' content='http://localhost:5173/' />
          {/* <link rel='canonical' href='https://vltmedia.onrender.com' /> */}
          <link rel='canonical' href='http://localhost:5173/' />
        </Helmet>
      </div>
      <section className='mb-20 font-[poppins]'>
        <div
          className='flex flex-col gap-6 px-6 lg:p-28 p-3 max-w-6xl mx-auto
        '>
          <h1 className=' text-4xl font-bold lg:text-5xl text-green mt-28'>
            Where blogs are made
          </h1>
          <p className=' text-gray-500 text-xl sm:text-2xl mb-28'>
            Here you'll find a varieties of articles and news on topics such as
            politics, education, entertainment, sports and even local news
          </p>
        </div>
        <div className='p-3 py-44 bg-gray-100 '>
          <CallToAction />
        </div>
        <div className='max-w-8xl mx-auto p-7 m-4'>
          {posts && posts.length > 0 && (
            <div className=' flex flex-col gap-6'>
              <h2
                className=' text-2xl font-semibold 
            text-center text-gray-500'>
                Recent Posts
              </h2>

              <div className='max-w-full mx-auto p-3 m-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {posts.map((post) => (
                  <PostCard key={posts._id} post={post} />
                ))}
              </div>
              <Link
                to={"/search"}
                className='text-teal-500 text-2xl hover:underline text-center'>
                {" "}
                View all posts
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
