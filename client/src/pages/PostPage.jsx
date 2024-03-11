import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setPost(data.posts[0]);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRencentPost = async () => {
        const res = await fetch(`/api/post/getPosts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRencentPost();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  }
  return (
    <main className="flex flex-col max-w-6xl mx-auto p-3 min-h-screen">
      <h1 className=" text-3xl font-serif text-center p-3 mt-10 lg:text-4xl">{post && post.title}</h1>
      <Link to={`/search/category=${post && post.category}`} className=" mx-auto self-center">
        <Button color="gray" pill size={"xs"}>
          {post && post.category}
        </Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className="w-full max-h-[600px] object-cover p-3 mt-10" />
      <div className=" flex justify-between mx-auto border-b border-slate-500 p-3 text-xs max-w-2xl w-full">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className=" italic">{post && (post.content.length / 1000).toFixed(0)}minutes read</span>
      </div>
      <div className="p-3 mx-auto max-w-2xl post-content" dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
      <div className=" mx-auto max-w-4xl w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className=" flex flex-col items-center justify-center mb-5">
        <h1 className=" text-xl mt-5">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 items-center justify-center">{recentPosts && recentPosts.map((post) => <PostCard key={post._id} post={post} />)}</div>
      </div>
    </main>
  );
}
