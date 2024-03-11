import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid  md:grid-cols-1 w-full sm:flex justify-between sm:items-center">
          <div className="mt-5">
            <Link to={"/"} className=" self-center font-semibold text-sm sm:text-xl whitespace-nowrap dark:text-white">
              <span
                className=" 
           rounded-lg
        px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              >
                Sahand's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 mt-4 sm:gap-6 gap-8">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">
                  100 Js Projects
                </Footer.Link>
                <Footer.Link href="/about">Shahan's Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/VienNguyen-Dev" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-cente sm:justify-between">
          <Footer.Copyright href="#" by="Shahan's Blog" year={new Date().getFullYear()} />
          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsTwitter} />
            <Footer.Icon icon={BsGithub} />
            <Footer.Icon icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
