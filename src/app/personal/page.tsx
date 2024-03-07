"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function PersonalHomePage() {
    const [id, setId] = useState("");
    const [isLoading, setIdLoading] = useState(true);
    const router = useRouter();
    const getId = async () => {
        const reponse = await axios.get("/api/users/getuserid");
        console.log(reponse);
        if (reponse.data.status) {
            console.log(id);
            router.push(`/personal/${reponse.data.id}`);
        }

    }
    useEffect(() => {
        getId();
        setIdLoading(false);
    }, [])
    return(
        isLoading? "Loading ...":""
    )
}