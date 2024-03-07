import { connectToMongoose } from "@/dbConfig/config";
import TaskModel from "@/models/Tas.kModel";
import { NextRequest, NextResponse } from "next/server";

connectToMongoose();
export async function POST(request:NextRequest) {
    try {
        const data =await request.json();
        const newtask = new TaskModel(data);
        const result = await newtask.save();
        if(!result){
            return NextResponse.json({status:false, message:"Something went wrong"});
        }
        return NextResponse.json({status:true, message:"New task added"});
    } catch (error) {
        return NextResponse.json({status:false, message:"Something went wrong"});
    }
}