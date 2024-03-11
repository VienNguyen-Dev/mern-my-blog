import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return seterrorMessage("Please fill out all fileds");
    }
    try {
      setLoading(true);
      seterrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        seterrorMessage(data.message);
        return;
      }
      setLoading(false);
      seterrorMessage(false);
      setformData(data);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      seterrorMessage(error.message);
    }
  };
  return (
    <div className=" min-h-screen mt-20">
      <div className="flex flex-col md:flex-row gap-5 md:items-center max-w-3xl mx-auto">
        {/* Left side */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold text-4xl dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Shahan's</span>Blog
          </Link>
          <p className="text-sm mt-5">This is a demo project.You can sign up with your email and password or with Google</p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Your username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button type="submit" gradientDuoTone={"purpleToPink"}>
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="text-sm mt-5 flex gap-2">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className=" text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
