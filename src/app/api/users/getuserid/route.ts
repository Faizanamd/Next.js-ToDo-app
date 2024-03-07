import { getDataFromToken } from "@/helpers/getDataFromToke";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const userid =getDataFromToken(request);
        if(userid){
            return NextResponse.json({status:true, message:"Id  found", id:userid});
        }else{
            return NextResponse.json({status:false, message:"Id not found"});
        }
    } catch (error) {
        return NextResponse.json({status:false, message:"Something went wrong"});
    }
}