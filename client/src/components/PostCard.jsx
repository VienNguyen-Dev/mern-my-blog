import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className=" group relative w-full h-[400px] sm:w-[430px] border border-teal-500 overflow-hidden transition-all hover:border-2 rounded-lg">
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="image over" className="w-full h-[260px] object-cover group-hover:h-[200px] transition-all duration-300 z-20" />
      </Link>
      <div className="flex flex-col p-3 gap-2">
        <p className=" text-xl font-semibold line-clamp-2">{post.title}</p>

        <span className=" italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className=" z-10 group-hover:bottom-0 bottom-[-200px] left-0 right-0 transition-all duration-300 absolute text-teal-500 text-center border py-2 rounded-lg rounded-tl-none m-2 hover:bg-teal-500 hover:text-white"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
