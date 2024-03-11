import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiAnnotation, HiArrowNarrowUp, HiOutlineDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.lastMonthComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, []);
  return (
    <div className="p-3 md:mx-auto">
      <div className=" flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col gap-4 p-3 border dark:border-gray-700  rounded-lg dark:bg-gray-800 w-full md:w-72 shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" uppercase text-md text-gray-500">Total users</h3>
              <p className=" text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="shadow-lg text-white p-3 text-5xl bg-teal-600 rounded-full" />
          </div>
          <div className="flex text-sm gap-2">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className=" text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-3 border dark:border-gray-700  rounded-lg dark:bg-gray-800 w-full md:w-72 shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" uppercase text-md text-gray-500">Total Comments</h3>
              <p className=" text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="shadow-lg text-white p-3 text-5xl bg-indigo-600 rounded-full" />
          </div>
          <div className="flex text-sm gap-2">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className=" text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-3 border dark:border-gray-700 rounded-lg dark:bg-gray-800 w-full md:w-72 shadow-md ">
          <div className="flex justify-between">
            <div className="">
              <h3 className=" uppercase text-md text-gray-500">Total posts</h3>
              <p className=" text-2xl">{totalPosts}</p>
            </div>
            <HiOutlineDocumentText className=" text-white p-3 text-5xl bg-lime-600 rounded-full shadow-lg" />
          </div>
          <div className="flex text-sm gap-2">
            <span className="flex items-center text-green-500 ">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>

            <div className=" text-gray-500">Last month</div>
          </div>
        </div>
      </div>

      <div className=" py-3 flex flex-wrap justify-center  gap-6 mx-auto">
        <div className="flex flex-col p-2 dark:bg-slate-800 border dark:border-gray-700 rounded-md w-full md:w-auto shadow-md">
          <div className="p-3 flex justify-between items-center">
            <h2 className=" font-semibold text-sm">Recent users</h2>
            <Link to={"/dashboard?tab=users"}>
              <Button gradientDuoTone={"purpleToPink"} outline>
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className=" divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500" />
                    </Table.Cell>
                    <Table.Cell className=" font-semibold">{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col p-2 dark:bg-slate-800 border dark:border-gray-700 rounded-md w-full md:w-auto shadow-md">
          <div className="p-3 flex justify-between items-center">
            <h2 className=" font-semibold text-sm">Recent comments</h2>
            <Link to={"/dashboard?tab=comments"}>
              <Button gradientDuoTone={"purpleToPink"} outline>
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment comtent</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className=" divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell className=" font-semibold">{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col p-2 dark:bg-slate-800 border dark:border-gray-700 rounded-md w-full md:w-auto shadow-md">
          <div className="p-3 text-sm flex justify-between items-center">
            <h2 className=" font-semibold text-sm">Recent posts</h2>
            <Link to={"/dashboard?tab=posts"}>
              <Button gradientDuoTone={"purpleToPink"} outline>
                See all
              </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Post category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className=" divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img src={post.image} alt="user" className="w-14 h-10 bg-gray-500 rounded-md" />
                    </Table.Cell>
                    <Table.Cell className=" font-semibold">{post.title}</Table.Cell>
                    <Table.Cell className=" font-semibold">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
