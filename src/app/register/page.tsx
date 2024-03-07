"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import {useRouter} from 'next/navigation';
export default function RegisterPage() {
    const [user, setUser] = React.useState({name:"", email:"", password:"", cpassword:""});
    const router = useRouter();
    
    const registerUser = async() =>{
        try {
            const response = await axios.post("/api/users/register", user );
            const data = await response.data;
            if(data.status){
                toast.success(data.message);
                router.push('/login')
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    return (
        <>
        <Toaster />
        <div className="w-full h-screen overflow-hidden bg-black flex justify-center  ">
            <div className="w-[300px] bg-orange-500 h-fit mt-32 px-2 py-2 rounded-lg shadow-md text-black border-[0.2px] border-white">
                <h1 className="uppercase text-center text-2xl font-normal mb-2 ">Register</h1>
                <div className="flex flex-col ">
                    <label className="text-xl font-medium" htmlFor="name">Username</label>
                    <input value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} type="text" className="px-2 py-2 rounded-lg outline-none text-xl " placeholder="Name..." name="" id="" />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xl font-medium" htmlFor="email">Email</label>
                    <input value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} className="px-2 py-2 rounded-lg outline-none text-xl " type="email" placeholder="Email..." name="" id="" />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xl font-medium" htmlFor="password">Password</label>
                    <input value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} className="px-2 py-2 rounded-lg outline-none text-xl " type="password" placeholder="Password..." name="password" id="" />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="text-xl font-medium" htmlFor="cpassword">Confirm Password</label>
                    <input value={user.cpassword} onChange={(e) => setUser({...user, cpassword:e.target.value})} className="px-2 py-2 rounded-lg outline-none text-xl " placeholder="Confirm Password..." type="password" name="" id="" />
                </div>
                <button onClick={registerUser} className="mt-4 w-full bg-white py-2 rounded-lg text-xl font-semibold   hover:bg-black hover:text-white   hover:cursor-pointer uppercase">REgister</button>
                <p className="mt-2 text-sm">Already registered? <Link className="text-xl underline " href={'/login'}>Login</Link></p>
            </div>
        </div>
      </>
    )
}