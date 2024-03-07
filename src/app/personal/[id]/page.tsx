"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function personalPage({ params }: any) {
    const router = useRouter();
    const [task, setTask] = React.useState({ title: "", description: "" });
    const [userTask, setUserTask] = useState<any>([]);
    const addNewTask = async () => {
        try {
            console.log("id:", params.id);
            const { data } = await axios.post("/api/tasks/newtask", { ...task, userId: params.id });
            if (data.status) {
                toast.success(data.message);
                setTask({ title: "", description: "" });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    }
    async function getTask() {
        const response = await axios.get('/api/tasks/getUserTask');
        setUserTask(response.data.tasks);

    }
    useEffect(() => {
        getTask();
    }, [])
    useEffect(() => {
        getTask();
    }, [task])

    const logout = async() =>{
        try {
            const repsonse =await axios.get("/api/users/logout");
            console.log(repsonse);
            if(repsonse.data.status){
                toast.success(repsonse.data.message);
                router.push("/");
            }else{
                toast.error(repsonse.data.message);
            }
            
        } catch (error) {
            toast.error("Something went wrong! Try again");
        }
    }

    return (
        <>
            <Toaster />
            <div className="w-full h-screen overflow bg-black trainsition duration-1000 ">
                <div className="w-full h-16 bg-black-900  shadow-lg border-b-2 border-b-zinc-900 flex items-center justify-around ">
                   <button onClick={logout} className="bg-orange-500 px-2 py-2 rounded-lg ">Logout</button>
                   
                </div>
                <div className="flex justify-evenly pt-16 pb-12 space-x-3">
                    <div className=" w-[280px] h-fit md:w-[500px]  flex flex-col space-y-4 ">

                        {Array.isArray(userTask) && userTask.map((t) => {
                            return (
                                <div key={t._id} className="w-full px-2 py-2 rounded-md flex justify-between space-x-2 bg-orange-500">
                                    <div>
                                        <h2 className="text-xl text-black underline mb-2">{t.title}</h2>
                                        <p className="">{t.description}</p>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <button className="bg-white px-2 py-2 rounded-lg text-black uppercase font-semibold hover:bg-black hover:text-white duration-700">Update</button>
                                        <button className="bg-white px-2 py-2 rounded-lg text-black uppercase font-semibold hover:bg-black hover:text-white duration-700">Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-[300px] bg-orange-500 h-fit  px-2 py-2 rounded-lg shadow-md text-black border-[0.2px] border-white">
                        <h1 className="uppercase text-center text-2xl font-normal mb-2 ">Create New Task</h1>
                        <div className="flex flex-col mt-4">
                            <label className="text-xl font-medium" htmlFor="title">Title</label>
                            <input value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} className="px-2 py-2 rounded-lg outline-none text-xl " type="text" placeholder="Title here..." name="" id="" />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="text-xl font-medium" htmlFor="description">Description</label>
                            <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} className="px-2 py-2 rounded-lg outline-none text-xl " name="" id="" cols={30} rows={5} placeholder="Description..."></textarea>
                        </div>
                        <button onClick={addNewTask} className="w-full bg-white  py-2 rounded-lg text-center text-xl mt-4 hover:bg-black hover:text-white uppercase duration-700">Create Task</button>
                    </div>
                </div>
            </div>
        </>
    )
}