import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export const getDataFromToken = (request:NextRequest) =>{
    try {
        const token = request.cookies.get("token")?.value || '';
        const descoredToken:any = jwt.verify(token, process.env.SECRET_KEY!);
        return descoredToken.id;
    } catch (error:any) {
        return NextResponse.json({status:false, message:"Something went wrong"});
    }
}