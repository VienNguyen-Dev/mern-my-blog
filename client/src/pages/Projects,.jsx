import React from "react";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className=" flex flex-col gap-6 max-w-2xl mx-auto min-h-screen p-3 items-center justify-center">
      <h1 className=" text-3xl font-semibold text-center">Projects</h1>

      <p className="text-md text-gray-500">Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>

      <CallToAction />
    </div>
  );
}
