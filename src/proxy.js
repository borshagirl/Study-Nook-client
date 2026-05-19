
import { NextResponse } from "next/server";

const privateRoutes = [
    "/add-room",
    "/my-listings",
    "/my-bookings"
];

export function proxy(request){
    const pathname = request.nextUrl.pathname;

    const isPrivateRoute = privateRoutes.some(
        route => pathname.startsWith(route)
    );

    const sessionToken = request.cookies.get(
        "better-auth.session_token"
    );

    if(isPrivateRoute && !sessionToken){
        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );
    }

    return NextResponse.next();
}

export const config={
    matcher:[

        "/add-room/:path*",
        "/my-listings/:path*",
        "/my-bookings/:path*"
    ]
}