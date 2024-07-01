

import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";


import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useRef } from "react";
import { IoBagCheckSharp } from "react-icons/io5";
import { CgTrashEmpty } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";

export default function Dashboard() {
  const ref = useRef();
  const { user, loading } = useUser();
  const [objects, setObjects] = useState([]);
  const [sidebar, setsidebar] = useState(true)
  const [Dropdown, setDropdown] = useState(false)
  const toggleCart = () => {
    setsidebar(!sidebar);
  };
  useEffect(() => {
    if (user) {
      const fetchObjects = async () => {
        try {
          const token = localStorage.getItem("token");
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
            console.log(objects);
          } else {
            console.error("Error fetching objects:", response.error);
          }
        } catch (error) {
          console.error("Error fetching objects:", error);
        }
      };

      fetchObjects();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className={`${!sidebar && 'overflow-hidden'}`}>
      <div className="bg-red-900">hello</div>
      <span onMouseLeave={() => {setTimeout(() => { setDropdown(false)}, 500) }}>
              {Dropdown && <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => { setDropdown(false) }}
                className="bg-white shadow-lg absolute z-30 top-16  right-8  py-4 rounded-md px-5 w-32">
                <ul>
                  <Link href={"/account"}><li className="text-black hover:text-pink-800">My Account</li></Link>
                  <Link href={"/order"}><li className="text-black hover:text-pink-800">Orders</li></Link>
                  <li onClick={logout} className="text-black hover:text-pink-800">LogOut</li>
                </ul>
              </div>}
              </span>
      <header className="sticky top-0 z-10 text-gray-600 body-font">
        <div className=" bg-slate-50 flex py-4 px-7 flex-col md:flex-row md:justify-start justify-center items-center shadow-md">
          <div className="logo mx-5">
            <Link href="/">
              <Image
                src="https://m.media-amazon.com/images/I/515ANNosyiL._SY879_.jpg"
                width={120}
                height={90}
                alt="Logo"
              />
            </Link>
          </div>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <Link href={"/tshirts"} className="mr-5 hover:text-gray-900">
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
            
              <span  onMouseOver={() => setDropdown(true)}  >
              {user.value && <Link
                href={"/account"}
                className="inline-flex items-center border-0  mx-2  focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0"
              >
                <MdAccountCircle className="text-3xl" />
              </Link>}
              </span>
            
            {!user.value && <Link href={"/login"}>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mx-1 ">Login</button>
            </Link>}

          </div>
          <button
            onClick={toggleCart}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            <HiOutlineShoppingCart className="text-2xl" />
          </button>
        </div>
      </header>
      <div
        ref={ref}
        className={`sidecart overflow-y-scroll fixed top-0 h-full w-80 bg-slate-300 p-10  transition-all ${sidebar? 'right-0' : '-right-96'} shadow-lg z-50`}
      >
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-2 cursor-pointer"
        >
          <IoMdCloseCircle size={24} />
        </span>
        <ol className="mt-4 list-decimal font-semibold">
              <li
                className="flex justify-between items-center py-2 border-b"
              >
                <div className="w-2/3 font-semibold text-xs">namee (size/variant)</div>
                
                <div>&#x20B9;</div>
              </li>
            
        </ol>
        <span className="mt-2 font-bold">
          subTotal :
        </span>
        <div className="flex mt-2 mx-1 justify-center">
          <Link href={"/checkout"}>
            <button   className="disabled:bg-indigo-200 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mx-1 ">
              <IoBagCheckSharp className="m-1 mx-2" />
              Checkout
            </button>
          </Link>
          <button

            className="disabled:bg-indigo-200 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mx-1 "
          >
            <CgTrashEmpty className="m-1 mx-2" />
            Clear cart
          </button>

        </div>
      </div>
    </div>
  );
}
