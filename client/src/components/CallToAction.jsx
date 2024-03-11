import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="p-3 flex flex-col sm:flex-row items-center justify-center border border-teal-500 rounded-tl-3xl  rounded-br-3xl mx-auto text-center">
      <div className="flex-1 flex flex-col gap-2 justify-center items-center ">
        <h2 className=" text-2xl my-2">Want to learn more about ReactJs?</h2>
        <p className="  text-gray-500">Checkout these resources with ReactJs full course for Beginner</p>
        <a href="https://www.freecodecamp.org/news/learn-react-course/" target="_blank" rel="noopener noreferrer">
          <Button className=" rounded-tl-xl rounded-bl-none" gradientDuoTone={"purpleToPink"}>
            Full Course ReactJs For Beginner
          </Button>
        </a>
      </div>
      <div className="flex-1">
        <img src="https://uploads.sitepoint.com/wp-content/uploads/2017/04/1493235373large_react_apps_A-01.png" className="w-full m-h-[600px] p-3 object-cover" />
      </div>
    </div>
  );
}
