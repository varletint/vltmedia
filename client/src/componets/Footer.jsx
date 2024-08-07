import { Footer, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsTwitter, BsGithub, BsPhone, BsTelephone } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer
      container
      className=' border border-t- 
    border-gray-500 bg-gray-950'>
      <div className=' w-full max-w-7xl mx-auto'>
        <div className=' grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className=' mt-5 select-none '>
            <Link
              to='/'
              className='cursor-none self-center whitespace-nowrap text-sm
        sm:text-xl font-bold text-gray-400 dark:text-white '>
              <span className='px-2 py-1 bg-green mr-1 rounded-l text-white'>
                Varletint
              </span>
              media
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='/' target='_blank' rel='noopener noreferrer'>
                  Varletint
                </Footer.Link>
                <Footer.Link href='/' target='_blank' rel='noopener noreferrer'>
                  Mr Js
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://www.github.com/intvarlet'>
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=' w-full gap-6  sm:flex sm:items-center sm:justify-center'>
          <Footer.Copyright
            href='home'
            by="Intvarlet's Media"
            year={new Date().getFullYear()}
          />
          <div className=' flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon
              href='https://www.github.com/intvarlet'
              icon={BsGithub}
            />
            <Footer.Icon href='Phone/09123456789' icon={BsTelephone} />
          </div>
        </div>
      </div>
      {/* <div className=" min-h-screen">
        
      </div> */}
    </Footer>
  );
}
