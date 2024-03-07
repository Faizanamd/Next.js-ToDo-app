import { connectToMongoose } from "@/dbConfig/config";
import UserModel from "@/models/User.Mode";

import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";
import bcrypt from 'bcrypt';
connectToMongoose();
export async function POST(request:NextRequest) {
    try {
        const data =await request.json();
        console.log("data", data);
        const checkUser = await UserModel.findOne({email:data.email});
        if(checkUser){
            return NextResponse.json({status:false, message:"User already exist"})
        }
        const hashPassword =await bcrypt.hash(data.password, 10);
        console.log(hashPassword);
        const newUser =  new UserModel({...data, password:hashPassword});
        const result = await newUser.save();
        if(!result){
            return NextResponse.json({status:false, messag:"Something went wrong"});
        }else{
            return NextResponse.json({status:true, message:"Regisration successfull"});
        }

    } catch (error:any) {
        return NextResponse.json({status:false, message:error.message});
    }
}