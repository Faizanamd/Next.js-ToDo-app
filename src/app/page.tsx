"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {

  return (
    <>
      <Toaster />
      <div className="w-full h-screen  bg-black text-center pt-12 text-xl ">
        <div className='text-2xl font-mono font-normal text-black  bg-orange-500 w-fit mx-auto px-4 py-2 rounded-lg '>
          <Typewriter
            options={{
              strings: [
                "It's a basic ToDo App for acknowledging NextJS",
                "You can make your personalized ToDo with secure database"
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <p className='mt-2 text-xl '>Login to access your todo app</p>
        <div className='flex space-x-4 mt-2 justify-center'>
          <Link className='uppercase bg-orange-500 px-4 py-2 rounded-lg text-black  font-semibold hover:bg-orange-600  ' href={'/login'}>Login</Link>
          <Link className='uppercase bg-orange-500 px-4 py-2 rounded-lg text-black  font-semibold hover:bg-orange-600  ' href={'/register'}>Register</Link>
        </div>
      </div>
    </>
  );
}
