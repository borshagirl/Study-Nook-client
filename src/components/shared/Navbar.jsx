"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

const Navbar = () => {

    const user = null;

    return (
        <nav className="bg-[#0F172A] text-white px-6 py-4 flex justify-between items-center">

            {/* Brand */}
            <Link href="/" className="text-xl font-bold text-indigo-400">
                StudyNook
            </Link>

            {/* Links */}
            <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/rooms">Rooms</Link>

                {user && (
                    <>
                        <Link href="/add-room">Add Room</Link>
                        <Link href="/my-listings">My Listings</Link>
                        <Link href="/my-bookings">My Bookings</Link>
                    </>
                )}
            </div>

            {/* Auth buttons */}
            <div className="flex gap-3">

                {user ? (
                    <Button color="primary">
                        Profile
                    </Button>
                ) : (
                    <>
                      <Link href={"/login"}>
                        <Button as={Link} href="/login" variant="bordered">
                            Login
                        </Button>
                      </Link>

                      <Link href={"/register"}>
                        <Button as={Link} href="/register" color="primary">
                            Register
                        </Button>
                      </Link>
                    </>
                )}

            </div>

        </nav>
    );
};

export default Navbar;