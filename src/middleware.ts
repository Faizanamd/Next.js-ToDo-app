import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "./helpers/getDataFromToke";


export default function middlware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    // console.log(path);
    const isPublicPath = path === '/login' || path === '/register' || path === '/';
    const token = request.cookies.get('token' )?.value || '';
    // const userid=  getDataFromToken(request);
    if(isPublicPath  && token){
        return NextResponse.redirect(new URL(`/personal`, request.nextUrl));
        // const userId = userid.id; // Extracting the ID from the object
// return NextResponse.redirect(`/personal/${userId}`);
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login'))
    }
}

export const config = {
    matcher: [
        '/',
        '/register',
        '/login',
        '/personal',
    ]
}