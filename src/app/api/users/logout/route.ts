import { NextRequest, NextResponse } from "next/server";


export async function  GET(request:NextRequest) {
    try {
     
        const repsonse = NextResponse.json({
            status:true,
            message:"Successfully logout"
        }) ;
        repsonse.cookies.set('token', "", {httpOnly:true, expires:new Date(0)});
        return repsonse;
    } catch (error:any) {
        return NextResponse.json({status:false, message:error.message});
    }
}