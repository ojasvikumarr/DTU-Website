"use client";
import React from "react";
import Link from "next/link";
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input";
import { cn } from "../utils/cn";
import { useRouter } from 'next/router';
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { AuroraBackground } from "../components/ui/aurora-background";
import { motion } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"


export default function SignupFormDemo() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [roll, setRoll] = useState('');
    const [year, setYear] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [dname, setdName] = useState('');
    const [dphone, setdPhone] = useState('');
    const [demail, setdEmail] = useState('');
    const [dpassword, setdPassword] = useState('');
    const [ddepartment, setdDepartment] = useState('');
    const [visible, setvisible] = useState(false)
    const [Year, setSelectedYear] = useState();
    const words = [
        {
            text: "If",
        },
        {
            text: "an",
        },
        {
            text: "intern   ",
        },
        // {
        //   text: "at DTU.",
        //   className: "text-blue-500 dark:text-blue-500",
        // },
    ];
    const wordsDeployer = [
        {
            text: "If",
        },
        {
            text: "a",
        },
        {
            text: "Deployer   ",
        },
        // {
        //   text: "at DTU.",
        //   className: "text-blue-500 dark:text-blue-500",
        // },
    ];

    useEffect(() => {
        // if(localStorage.getItem('token')){
        //   router.push("/")
        // }
    }, [])
    const isVisible = () => {
        setvisible(!visible);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        else if (name === 'dname') setdName(value);
        else if (name === 'roll') setRoll(value);
        else if (name === 'year') setYear(value);
        else if (name === 'phone') setPhone(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'department') setDepartment(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'dphone') setdPhone(value);
        else if (name === 'demail') setdEmail(value);
        else if (name === 'ddepartment') setdDepartment(value);
        else if (name === 'dpassword') setdPassword(value);
    };
    const handleYearChange = (value) => {
        setSelectedYear(value);
    };
    const InternhandleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, roll, year, phone, email, department, password };
        console.log('Submitting data:', data);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signupintern`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log("Success:", `Successfully signed up the user ${result}`);

            toast('Successfully signed up!', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });
        } catch (error) {
            toast.error(`Problem in signing up the user ${error}`, {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });

            console.error("Error:", `Problem in signing up the user ${error}`);
        }

        setEmail('');
        setRoll('');
        setYear('');
        setPhone('');
        setName('');
        setDepartment('');
        setPassword('');
        setTimeout(() => {
            router.push("/login")
        }, 1000);
    };
    const DeployerhandleSubmit = async (e) => {
        e.preventDefault();
        const data = { dname, dphone, demail, ddepartment, dpassword };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signupdeployer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log("Success:", `Successfully signed up the Deployer ${result}`);

            toast('Successfully signed up!', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });
        } catch (error) {
            toast.error(`Problem in signing up the Deployer ${error}`, {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
            });

            console.error("Error:", `Problem in signing up the Deployer ${error}`);
        }

        setdEmail('');
        setdPhone('');
        setdName('');
        setdDepartment('');
        setdPassword('');
        setTimeout(() => {
            router.push("/login")
        }, 1000);
    };
    return (
        <>
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
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
                    
                    {!visible && <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 mt-16 shadow-input bg-white dark:bg-black">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            <TypewriterEffect words={words} />
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            or
                            <button onClick={isVisible} className="border-2 p-2 rounded m-1 ">Deployer</button>
                        </p>

                        <form className="my-8" onSubmit={InternhandleSubmit}>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={handleChange} value={name} name="name" id="name" placeholder="Tyler" type="text" />
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input onChange={handleChange} value={phone} name="phone" id="phone" placeholder="xxxxxxxxxx" type="number" />
                                </LabelInputContainer>
                            </div>
                            <div className="flex items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="roll">Roll no.</Label>
                                    <Input onChange={handleChange} value={roll} name="roll" id="roll" placeholder="2K--/--/---" type="roll" />
                                </LabelInputContainer>
                                <Select name="year" value={year} onValueChange={setYear}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2019">2019</SelectItem>
                                        <SelectItem value="2020">2020</SelectItem>
                                        <SelectItem value="2021">2021</SelectItem>
                                        <SelectItem value="2022">2022</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input onChange={handleChange} value={email} name="email" id="email" placeholder="projectmayhem@fc.com" type="email" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={handleChange} value={password} name="password" id="password" placeholder="••••••••" type="password" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-8">
                                <Label htmlFor="department">Department</Label>
                                <Input onChange={handleChange} value={department} name="department" id="department" placeholder="---------" type="department" />

                            </LabelInputContainer>

                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Sign up &rarr;
                                <BottomGradient />
                            </button>

                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                            <Link href={'/login'}><button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"

                            >
                                Login &rarr;
                                <BottomGradient />
                            </button></Link>

                        </form>
                    </div>}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    {visible && <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 mt-16 shadow-input bg-white dark:bg-black">
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            <TypewriterEffect words={wordsDeployer} />
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            or
                            <button onClick={isVisible} className="border-2 p-2 rounded m-1 ">Intern</button>
                        </p>

                        <form className="my-8" onSubmit={DeployerhandleSubmit}>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={handleChange} value={dname} name="dname" id="name" placeholder="Tyler" type="text" />
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input onChange={handleChange} value={dphone} name="dphone" id="phone" placeholder="xxxxxxxxxx" type="number" />
                                </LabelInputContainer>
                            </div>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input onChange={handleChange} value={demail} name="demail" id="email" placeholder="projectmayhem@fc.com" type="email" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={handleChange} value={dpassword} name="dpassword" id="password" placeholder="••••••••" type="password" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-8">
                                <Label htmlFor="department">Department</Label>
                                <Input onChange={handleChange} value={ddepartment} name="ddepartment" id="department" placeholder="---------" type="department" />

                            </LabelInputContainer>

                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Sign up &rarr;
                                <BottomGradient />
                            </button>

                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                            <Link href={'/login'}><button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"

                            >
                                Login &rarr;
                                <BottomGradient />
                            </button></Link>

                        </form>
                    </div>}
                </motion.div>
            </AuroraBackground>
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};