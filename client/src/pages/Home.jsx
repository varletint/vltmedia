import React from "react";
import CallToAction from "../componets/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../componets/PostCard2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [pPosts, setPPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      const pRes = await fetch(`/api/post/getposts?category=politics`);
      const pData = await pRes.json();
      setPosts(data.posts);
      setPPosts(pData.posts);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Varletint media</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8476100834116716'
          crossorigin='anonymous'></script>
        <meta name='google-adsense-account' content='ca-pub-8476100834116716' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon.ico' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <meta property='og:title' content='var media' />
        <meta property='og:image' content={"./f-image.png"} name='image' />
        <meta property='og:description' content='Home of local news' />
        <meta property='og:url' content='https://vltmedia.onrender.com/' />
        <meta property='twitter:image' content='../assets/img/more.jpg' />
        {/* <link rel='canonical' href='https://vltmedia.onrender.com' /> */}
        <link rel='canonical' href='www.vltmedia.onrender.com/' />
      </Helmet>

      <section className='mb-20 font-[poppins]'>
        {/* <div
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
        </div> */}
        <div className='max-w-6xl mx-auto p-7 m-4 mt-[5rem]'>
          {posts && posts.length > 0 && (
            <div className=' flex flex-col gap-6'>
              <h2
                className=' text-xl font-semibold 
            text-center text-gray-500'>
                Recent Posts
              </h2>

              {/* <div className='max-w-full mx-auto p-[-81rem] grid gap-[3rem] md:grid-cols-2 lg:grid-cols-3'>
                {posts.map((post) => (
                  <PostCard key={posts._id} post={post} />
                ))}
              </div> */}
              <div className='_container'>
                <div className='news-card-grid'>
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
              <Link
                to={"/search"}
                className='mb-[5rem] text-teal-500 text-l hover:underline text-center'>
                {" "}
                View all posts
              </Link>
            </div>
          )}
          {posts && posts.length > 0 && (
            <div className=' flex flex-col gap-6'>
              <h2
                className=' text-xl font-semibold 
            text-center text-gray-500'>
                Politics
              </h2>

              {/* <div className='max-w-full mx-auto p-[-81rem] grid gap-[3rem] md:grid-cols-2 lg:grid-cols-3'>
                {posts.map((post) => (
                  <PostCard key={posts._id} post={post} />
                ))}
              </div> */}
              <div className='_container'>
                <div className='news-card-grid'>
                  {pPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
              <Link
                to={"/search"}
                className='mb-[5rem] text-teal-500 text-l hover:underline text-center'>
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
