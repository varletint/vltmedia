import { Footer, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsTwitter, BsGithub, BsPhone, BsTelephone } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer
      container
      className=" border border-t-8 
    border-green-200"
    >
      <div className=" w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
          <div className=" mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm
        sm:text-xl font-semibold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-lime-600
        via-lime-700 to-green-600 rounded-lg text-white"
              >
                Mr. Js
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LandMark's Blog
                </Footer.Link>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LandMark's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.github.com/intvarlet">
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full gap-6  sm:flex sm:items-center sm:justify-center">
          <Footer.Copyright
            href="home"
            by="Landmark's Blog"
            year={new Date().getFullYear()}
          />
          <div className=" flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="09123456789" icon={BsTelephone} />
          </div>
        </div>
      </div>
      {/* <div className=" min-h-screen">
        
      </div> */}
    </Footer>
  );
}
