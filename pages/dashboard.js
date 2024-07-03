
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../@/components/ui/tooltip"
import { IoIosAnalytics } from "react-icons/io";
import { FiDatabase } from "react-icons/fi";
import Image from "next/image";
import { CgDarkMode } from "react-icons/cg";
import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import Input from "../components/ui/input"

import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useRef } from "react";
import { IoBagCheckSharp } from "react-icons/io5";
import { CgTrashEmpty } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export default function Dashboard() {
  const ref = useRef();
  const { user, loading } = useUser();
  const [objects, setObjects] = useState([]);
  const [sidebar, setsidebar] = useState(false)
  const [Dropdown, setDropdown] = useState(false)
  const [search, setsearch] = useState('')
  const [intern, setIntern] = useState('');
  const toggleCart = () => {
    setsidebar(!sidebar);
  };



  useEffect(() => {
    if (user) {
      const fetchObjects = async () => {
        try {
          // const token = localStorage.getItem("token");
          const response = await fetch("/api/fetchInterns", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ user }),
          });

          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setObjects(data.groupedInterns);
            setIntern(data.groupedInterns[2022] || []);

          } else {
            console.error("Error fetching objects:", response.error);
          }
        } catch (error) {
          console.error("Error fetching objects:", error);
        }
      };

      fetchObjects();

    }
  }, [user]);;
  if (!intern || intern.length === 0) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }
  // let intern = objects[2022];
  // const handlebutton = (e) => {
  //   let {name , value} = e.target ;
  //   if(name == "2021") intern = objects[value];
  //   else if(name == "2022") intern = objects[value];
  //   else if(name == "2023") intern = objects[value];
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'search') setsearch(value);
  }
  // console.log(objects[2021]);
  const handleButton = (e) => {
    const year = e.target.value;
    console.log(`Year selected: ${year}`);
    console.log(`Data for ${year}:`, objects[year]);
    setIntern(objects[year] || []);  // Use empty array as fallback
  };
  console.log(objects);


  return (
    <>
      <div className={`${!sidebar && 'overflow-hidden'}`}>
        <span onMouseLeave={() => { setTimeout(() => { setDropdown(false) }, 500) }}>
          {Dropdown && <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => { setDropdown(false) }}
            className="bg-white shadow-lg absolute z-30 top-14  right-8  py-4 rounded-md px-5 w-32">
            <ul>
              <Link href={"/account"}><li className="text-black hover:text-pink-800">My Account</li></Link>
              <Link href={"/order"}><li className="text-black hover:text-pink-800">Orders</li></Link>
              <li className="text-black hover:text-pink-800">LogOut</li>
            </ul>
          </div>}
        </span>
        <header className="sticky top-0 z-10 text-gray-600 body-font">
          <div className=" bg-slate-50 flex py-4 px-7 flex-col md:flex-row md:justify-start justify-center items-center shadow-md">
            {/* <div className="logo mx-5">
            <Link href="/">
              <Image
                src="https://m.media-amazon.com/images/I/515ANNosyiL._SY879_.jpg"
                width={120}
                height={90}
                alt="Logo"
              />
            </Link>
          </div> */}
            <button
              onClick={toggleCart}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              {/* <HiOutlineShoppingCart className="text-2xl" /> */}
            </button>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
              <Link href={"/tshirts"} className="mr-5 hover:text-red-900">
                T-shirts
              </Link>
              <Link href={"/hoodies"} className="mr-5 hover:text-gray-900">
                Hoodies
              </Link>
              <Link href={"/stickers"} className="mr-5 hover:text-gray-900">
                Stickers
              </Link>
              <Link href={"/mugs"} className="mr-5 hover:text-gray-900">
                Mugs
              </Link>
              <Link href={"/zipper"} className="mr-5 hover:text-gray-900">
                Zipper
              </Link>
            </nav>
            <div className="cursor-pointer z-100">
              {/* <Input onChange={handleChange} value={search} name="search" id="search" placeholder="••••••••" type="text" /> */}
              <span onMouseOver={() => setDropdown(true)}  >
                {user && <Link
                  href={"/account"}
                  className="inline-flex items-center border-0  mx-2  focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0"
                >
                  <MdAccountCircle className="text-3xl" />
                </Link>}
              </span>

              {!user && <Link href={"/login"}>
                <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mx-1 ">Login</button>
              </Link>}

            </div>

          </div>
        </header>
        <div
          ref={ref}
          className={`sidecart overflow-y-scroll bg-white fixed top-0 h-full w-10 dark:bg-zinc-900 p-10  transition-all ${sidebar ? '-left-0' : '-left-10'} shadow-lg z-50`}
        >
          {/* <h2 className="font-bold text-xl">Profile</h2> */}
          <span
            // onMouseDownCapture={toggleCart}

            className="absolute mr-1 top-4 right-2 cursor-pointer"
          >
            {sidebar ? <BsLayoutSidebarInset size={24} /> :
              <BsLayoutSidebarInsetReverse size={24} />}
          </span>
          <ol className="mt-4 right-0 mr-1 list-decimal font-semibold">
            <li
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="w-2/3  font-semibold text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <FaHome className="" size={24} />
                        <span className="sr-only">Dashboard</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider></div>
            </li>
            <li
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="w-2/3  font-semibold text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <IoIosAnalytics className="" size={24} />
                        <span className="sr-only">Dashboard</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider></div>
            </li>
            <li
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="w-2/3  font-semibold text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <CgDarkMode size={24} />
                        <span className="sr-only">Dashboard</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider></div>
            </li>
            <li
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="w-2/3  font-semibold text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <FiDatabase size={24} />
                        <span className="sr-only">Dashboard</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider></div>
            </li>

          </ol>
          <span className="mt-2 font-bold">
          </span>
          <div className="flex mt-2 mx-1 justify-center">
            {/* <Link href={"/checkout"}>
            <button   className="disabled:bg-indigo-200 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mx-1 ">
              <IoBagCheckSharp className="m-1 mx-2" />
            </button>
          </Link> */}
            {/* <button

            className="disabled:bg-indigo-200 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mx-1 "
          >
            <CgTrashEmpty className="m-1 mx-2" />
            Clear cart
          </button> */}

          </div>
        </div>
        <div className="container ml-2 mt-3">
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <button onClick={handleButton} value="2021" className="border-zinc-500 border-1 rounded mx-2 my-1 bg-slate-200 px-2 mt-2 py-1">2021</button>
                    <button onClick={handleButton} value="2022" className="border-zinc-500 border-1 rounded mx-2 my-1 bg-slate-200 px-2 mt-2 py-1">2022</button>
                    <button onClick={handleButton} value="2023" className="border-zinc-500 border-1 rounded mx-2 my-1 bg-slate-200 px-2 mt-2 py-1">2023</button>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-x-3">
                              <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                              <button className="flex items-center gap-x-2">
                                <span>Roll No.</span>

                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                  <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                  <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                </svg>
                              </button>
                            </div>
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Period
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Status
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Intern
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Serve period
                          </th>

                          <th scope="col" className="relative py-3.5 px-4">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {intern.map((intern) => {
                          return (
                            <tr kry={intern.roll}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />

                                  <span>{intern.roll}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{intern.createdAt}</td>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>

                                  <h2 className="text-sm font-normal">Paid</h2>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                  <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                  <div>
                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{intern.name}</h2>
                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{intern.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                  <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                    Archive
                                  </button>

                                  <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                    Download
                                  </button>
                                </div>
                              </td>
                            </tr>)

                        })}

                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex items-center justify-between mt-6">
              <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                  previous
                </span>
              </a>

              <div className="items-center hidden md:flex gap-x-3">
                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
              </div>

              <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                  Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </section >

        </div >
      </div >
    </>
  );
}






{/* <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                        <span>#3065</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 5, 2022</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                        <h2 className="text-sm font-normal">Cancelled</h2>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt=""/>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Andi Lane</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">andi@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                            Archive
                                        </button>

                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                        <span>#3064</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 5, 2022</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                        <h2 className="text-sm font-normal">Paid</h2>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" alt=""/>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Kate Morrison</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">kate@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                            Archive
                                        </button>

                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                        <span>#3063</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 4, 2022</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                        <h2 className="text-sm font-normal">Paid</h2>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&q=80" alt=""/>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Candice Wu</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">candice@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                            Archive
                                        </button>

                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                        <span>#3062</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 4, 2022</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                        <h2 className="text-sm font-normal">Refunded</h2>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=644&q=80" alt=""/>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Orlando Diggs</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">orlando@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                            Archive
                                        </button>

                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr> */}