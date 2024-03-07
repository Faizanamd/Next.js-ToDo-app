import { connectToMongoose } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToke";
import TaskModel from "@/models/Tas.kModel";
import { NextRequest, NextResponse } from "next/server";
connectToMongoose();
export async function GET(request:NextRequest) {
    try {
        const id = getDataFromToken(request);
        const tasks = await TaskModel.find({userId:id});
        // console.log("task from get user task: ", tasks);
        return NextResponse.json({tasks});
    } catch (error) {
        return NextResponse.json({status:false, message:"Something went wrong"});
    }
}