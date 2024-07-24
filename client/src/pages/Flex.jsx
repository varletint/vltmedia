import React from "react";
import PostCard from "../componets/PostCard2";
import { useState, useEffect } from "react";
export default function Flex() {
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
    <div className='max-w-6xl mx-auto p-7 m-4 grid gap-4 md:grid-cols-3 '>
      {posts.map((post) => (
        <PostCard key={posts._id} post={post} />
      ))}
    </div>
  );
}
