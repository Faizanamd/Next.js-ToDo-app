import UserModel from "@/models/User.Mode";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request:NextRequest) {
    try {
        const {email, password} = await request.json();
        const checkUser = await UserModel.findOne({email:email});
        if(!checkUser){
           return NextResponse.json({status:false, message:"User doesn't exist"})
        }
        const validPasswrod = bcrypt.compare(password, checkUser.password);
        if(!validPasswrod){
            return NextResponse.json({status:false, message:"Invalid password"});
        }
        const token = jwt.sign({id:checkUser._id}, process.env.SECRET_KEY!, {expiresIn:'1d'})
        const response = NextResponse.json({status:true, message:"Login successfull",user:checkUser });
        response.cookies.set('token', token, {httpOnly:true});
        return response;
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({status:false, message:"Something went wrong"});
    }
}