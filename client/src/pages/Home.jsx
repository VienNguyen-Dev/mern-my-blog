import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className=" flex flex-col gap-6 p-28 px-3 mx-auto max-w-6xl ">
        <h1 className=" text-3xl md:text-6xl">Wellcome to my Blog</h1>
        <p className=" text-xs text-gray-500 md:text-sm">Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.</p>
        <Link to={"/search"} className=" text-teal-500 font-bold hover:underline sm:text-sm text-xs">
          View all posts
        </Link>
      </div>
      <div className=" p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="p-3 py-7 max-w-6xl mx-auto flex flex-col gap-8">
        {currentUser && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h1 className=" font-semibold text-2xl text-center">Recent Posts</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={"/dashboard?tab=posts"} className=" text-teal-500 text-center hover:underline font-semibold text-lg">
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
