"use client";
import { getDataFromToken } from "@/helpers/getDataFromToke";
import axios from "axios";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SSG_GET_INITIAL_PROPS_CONFLICT } from "next/dist/lib/constants";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";
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