import React from "react";

export default function About() {
  return (
    <div className=" min-h-screen  flex items-center justify-center ">
      <div className=" max-w-2xl text-center mx-auto p-3">
        <div>
          <h1 className=" text-3xl font-semibold py-7 text-center">About VienNguuen's Blog</h1>
          <div className=" text-gray-500 text-md flex flex-col gap-6">
            <p>
              Welcome to Vien Nguyen's Blog! This blog was created by Vien Nguyen as a personal project to share his thoughts and ideas with the world. Vien Nguyen is a passionate developer who loves
              to write about technology, coding, and everything in between.
            </p>
            <p>
              {" "}
              On this blog, you'll find weekly articles and tutorials on topics such as web development, software engineering, and programming languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments and reply to them as well. We believe that a community of learners can
              help each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
