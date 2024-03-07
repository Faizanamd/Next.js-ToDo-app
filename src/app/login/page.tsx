"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({email:"", password:""});
    const loginUser = async() =>{
        try {
            const {data} = await axios.post("/api/users/login", user);
            console.log(data)
            if(data.status){
                toast.success(data.message);
                router.push(`/personal/${data.user._id}`);
            }else{
                toast.error(data.message);
            }
        } catch (error:any) {
            console.log(error.message);
        }
    }
    return (
        <>
        
        <Toaster/>
        
        <div className="w-full h-screen overflow-hidden bg-black flex justify-center  ">
            <div className="w-[300px] bg-orange-500 h-fit mt-32 px-2 py-2 rounded-lg shadow-md text-black border-[0.2px] border-white">
                <h1 className="uppercase text-center text-2xl font-normal mb-2 ">LOGIN</h1>
                <div className="flex flex-col mt-4">
                    <label className="text-xl font-medium" htmlFor="email">Email</label>
                    <input value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} className="px-2 py-2 rounded-lg outline-none text-xl " type="email" placeholder="Email..." name="" id="" />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xl font-medium" htmlFor="password">Password</label>
                    <input value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} className="px-2 py-2 rounded-lg outline-none text-xl " type="password" placeholder="Password..." name="password" id="" />
                </div>
                <button onClick={loginUser} className="mt-4 w-full bg-white py-2 rounded-lg text-xl font-semibold   hover:bg-black hover:text-white   hover:cursor-pointer">LOGIN</button>
                <p className="mt-2 text-sm">Do not have account? <Link className="text-xl underline " href={'/register'}>Register</Link></p>
            </div>
        </div>
        </>
    )
}
export default LoginPage;