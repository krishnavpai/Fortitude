import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import styles from "../../styles/Navbar.module.scss";

export default function L_Navbar() {
  const navigation = ["Dashboard","Blogs", "Communities", "Videos"];

  return (
    <div className="shadow-1xl">
      <div className={styles.navbar}>
        <div className="w-full bg-white">
          <nav className="  relative flex flex-wrap align-items-center justify-between mx-auto lg:justify-between xl:px-0">
            {/* //Fortitude Logo and navbar toggle */}
            {/* --------------------------------------------------------------- */}
            <Disclosure>
              {({ open }) => (
                <>
                  <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                    <Link href="/">
                      <div className={styles.brand}>Fortitude</div>
                    </Link>

                    <Disclosure.Button
                      // hamburger menu button
                      aria-label="Toggle Menu"
                      className="px-2 ml-auto text-orange-600 rounded-md lg:hidden hover:text-orange-500 focus:text-orange-500 focus:bg-orange-100 focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        {open && (
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                          />
                        )}
                        {!open && (
                          <path
                            fillRule="evenodd"
                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                          />
                        )}
                      </svg>
                    </Disclosure.Button>

                    {/* hamburger menu nav list    */}
                    <Disclosure.Panel className="flex flex-wrap w-full my-2 lg:hidden">
                      <>
                        {navigation.map((item, index) => (
                          
                            <a key ={item} className="w-full  py-2  text-black rounded-md dark:text-gray-300 hover:text-orange-500 focus:text-orange-500 focus:bg-orange-100 no-underline">
                              {item}
                            </a>
                         
                        ))}
                        <Link href="/">
                          <a className="w-full px-6 py-2 mt-3 text-center text-white bg-orange-600 rounded-md lg:ml-5 no-underline">
                            LOG IN
                          </a>
                        </Link>
                      </>
                    </Disclosure.Panel>
                  </div>
                </>
              )}
            </Disclosure>

            {/* menu  */}
            {/* Navbar */}
            <div className="hidden text-center lg:flex lg:items-center">
              <ul className="m-0 items-center justify-end flex-1 list-none lg:pt-0 lg:flex">
                {navigation.map((menu, index) => (
                  <li className="mr-3 nav__item" key={index}>
                    <Link href="/dashboard">
                      <a className="inline-block px-4 text-md font-normal text-gray-800 no-underline rounded-md dark:text-black-200 hover:text-orange-500 focus:text-orange-500 focus:bg-orange-100 focus:outline-none">
                        {menu}
                      </a>
                    </Link>
            
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden mr-3 space-x-4 lg:flex nav__item">
              <Link href="../login">
                <a className="px-6  text-white bg-orange-500 rounded-md md:ml-5 no-underline">
                  LOG IN
                </a>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
