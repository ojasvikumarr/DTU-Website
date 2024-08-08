import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../@/components/ui/tooltip";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoIosAnalytics } from "react-icons/io";
import { FiDatabase } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { useRef } from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { DatePickerDemo } from "../components/ui/dataPicker";
import { useUser } from "../context/UserContext";
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const internprofile = () => {
  const ref = useRef();
  const [year, setYear] = useState("");
  const [sidebar, setsidebar] = useState(false);
  const [date, setdate] = useState();
  const { user, loading } = useUser();
  console.log(user);
  const [acc, setacc] = useState("");
  const [code, setcode] = useState("");
  const [reportingofficer, setreportingofficer] = useState("");
  const [depdate, setdepdate] = useState("");
  const [depno, setdepno] = useState("");
  const [period, setperiod] = useState("");
  const [stay, setstay] = useState("");
  const [cgpa, setcgpa] = useState("");
  const [back, setback] = useState("");
  const [status, setstatus] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (user) {
    }
  }, [user]);
  if (!user) {
    return <div className="">loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year") setYear(value);
    else if (name === "acc") setacc(value);
    else if (name === "reportingofficer") setreportingofficer(value);
    else if (name === "depdate") setdepdate(value);
    else if (name === "depno") setdepno(value);
    else if (name === "stay") setstay(value);
    else if (name === "cgpa") setcgpa(value);
    else if (name === "back") setback(value);
    else if (name === "status") setstatus(value);
    else if (name === "code") setcode(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = user.user.email;
    console.log(email);
    const data = {
        reportingofficer,
        depdate,
        depno,
        period,
        stay,
        cgpa,
        back,
        acc,
        code,
        email
    };
    console.log(data);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/setInternDetails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Something went wrong');
        }

        const result = await res.json();
        console.log("Success:", result.success);
        toast(result.success, {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
        });

        // Optionally clear form fields
        // setreportingofficer('');
        // setdepdate('');
        // setdepno('');
        // setperiod('');
        // setstay('');
        // setcgpa('');
        // setback('');
        // setacc('');
        // setifsc('');

    } catch (error) {
        console.error('Error:', error);
        toast(error.message, {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
        });
    }
    setTimeout(() => {
      router.push("/internprofile")
    }, 1500);
};

  const toggleCart = () => {
    setsidebar(!sidebar);
  };
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      
      <div
        ref={ref}
        className={`sidecart overflow-y-scroll bg-white fixed top-0 h-full w-10 dark:bg-zinc-900 p-10  transition-all ${
          sidebar ? "-left-0" : "-left-10"
        } shadow-lg z-50`}
      >
        {/* <h2 className="font-bold text-xl">Profile</h2> */}
        <span
          // onMouseDownCapture={toggleCart}

          className="absolute mr-1 top-4 right-2 cursor-pointer"
        >
          {sidebar ? (
            <BsLayoutSidebarInset size={24} />
          ) : (
            <BsLayoutSidebarInsetReverse size={24} />
          )}
        </span>
        <ol className="mt-4 right-0 mr-1 list-decimal font-semibold">
          <li className="flex justify-between items-center py-2 border-b">
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
              </TooltipProvider>
            </div>
          </li>
          <li className="flex justify-between items-center py-2 border-b">
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
              </TooltipProvider>
            </div>
          </li>
          <li className="flex justify-between items-center py-2 border-b">
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
              </TooltipProvider>
            </div>
          </li>
          <li className="flex justify-between items-center py-2 border-b">
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
              </TooltipProvider>
            </div>
          </li>
        </ol>
      </div>
      <section className=" py-1 bg-blueGray-50">
        <form >
          <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-2 border-zinc-200">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    Additional Details
                  </h6>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Roll No.
                      </label>
                      <input
                        type="text"
                        disabled={true}
                        className="border-2 border-zinc-200 shadow-lg disabled:text-zinc-400 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={user.user.roll}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        disabled={true}
                        className="border-2 border-zinc-200 shadow-lg disabled:text-zinc-400 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={user.user.email}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        disabled={true}
                        className="border-2 border-zinc-200 shadow-lg disabled:text-zinc-400 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={user.user.name}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone no.
                      </label>
                      <input
                        type="text"
                        disabled={true}
                        className="border-2 border-zinc-200 shadow-lg disabled:text-zinc-400 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={user.user.phone}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Intern Details
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full flex px-4">
                    <div className="relative w-4/12  mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Reporting Officer
                      </label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="border-2 border-zinc-300 shadow-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={reportingofficer}
                        name="reportingofficer"
                      />
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Period of Deployment
                        </label>
                        <Select
                          name="year"
                          value={status}
                          onValueChange={setstatus}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Continued">Continued</SelectItem>
                            <SelectItem value="New">New</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="relative w-4/12 mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Department / Branch / Event
                      </label>
                      <input
                        type="text"
                        disabled={true}
                        className="border-2 border-zinc-200 shadow-lg disabled:text-zinc-400 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={user.user.department}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Deployment date
                      </label>
                      <DatePickerDemo date={depdate} setDate={setdepdate} />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Deployment no.
                      </label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="border-2 border-zinc-200 shadow-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={depno}
                        name="depno"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Period of Deployment
                      </label>
                      <Select
                        name="year"
                        value={period}
                        onValueChange={setperiod}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Months" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nov-Dec-Jan">
                            Nov-Dec-Jan
                          </SelectItem>
                          <SelectItem value="Feb-Mar-Apr">
                            Feb-Mar-Apr
                          </SelectItem>
                          <SelectItem value="May-Jun-Jul">
                            May-Jun-Jul
                          </SelectItem>
                          <SelectItem value="Aug-Sept-Oct">
                            Aug-Sept-Oct
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        %age/CGPA till last semester
                      </label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="border-2 border-zinc-200 shadow-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={cgpa}
                        name="cgpa"
                        placeholder="CGPA upto two decimal"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Hosteller / PG / Day Scholar
                      </label>
                      <Select name="year" value={stay} onValueChange={setstay}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select stay" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hosteller">Hosteller</SelectItem>
                          <SelectItem value="pg">PG</SelectItem>
                          <SelectItem value="day-scholar">
                            Day Scholar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Back papers till last semester
                      </label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="border-2 border-zinc-200 shadow-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={back}
                        name="back"
                        placeholder="0 is none"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Account Details{" "}
                  <p className="text-zinc-700">(only intern's Own Account)</p>
                </h6>

                <div className="flex flex-row ">
                  <div className="w-full  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="acc"
                      >
                        Account number
                      </label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="border-2 border-zinc-200 shadow-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={acc}
                        name="acc"
                      />
                    </div>
                  </div>
                  <div className="w-full  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="code"
                      >
                        IFSC code
                      </label>
                      <Input
                        onChange={handleChange}
                        type="text"
                        className="border-2 border-zinc-200 shadow-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={code}
                        name="code"
                        id="code"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></h6>
              </div>
            </div>
          </div>
        </form>
        <footer className="relative  pt-8 pb-6 mt-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made By Creative Ojasvi.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default internprofile;

// deployment date
// deployment mentor name
// term monhs
// continued or deployed
// work summary
// file upload karna

// account details
// ifsc code
// acount number
// intern ke name pe ho account
