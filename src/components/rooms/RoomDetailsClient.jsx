"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth";
import { Button, Chip } from "@heroui/react";
import { IoIosSchool } from "react-icons/io";
import { ImManWoman } from "react-icons/im";
import BookingSection from "./BookingSection";
import { BiRightArrowAlt } from "react-icons/bi";

const RoomDetailsClient = ({ room }) => {

    const router = useRouter();
    const { data } = useSession();

    const user = data?.user;

    const handleBookClick = () => {

        if (!user) {
            router.push("/login");
            return;
        }

        const el = document.getElementById("booking-section");

        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }

    };

    return (
        <div className="max-w-7xl mx-auto px-5 py-16">

            <div className="grid md:grid-cols-2 gap-12">

                <Image
                    src={room?.image?.trim() || "/placeholder.jpg"}
                    alt={room?.roomName || "Room image"}
                    width={700}
                    height={500}
                    priority
                    className="w-full h-auto rounded-xl object-cover"
                />

                <div>

                    <h1 className="text-4xl font-bold">
                        {room.roomName}
                    </h1>

                    <p className="text-gray-500 mt-5">
                        {room.description}
                    </p>

                    <div className="mt-4 space-y-2">

                        <p className="flex items-center gap-2">
                            <IoIosSchool /> {room.floor}
                        </p>

                        <p className="flex items-center gap-2">
                            <ImManWoman /> {room.capacity}
                        </p>

                        <p className="text-xl font-bold">
                            $ {room.hourlyRate}/hr
                        </p>

                        <p>
                            📖 Bookings: {room.bookingCount || 0}
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {room.amenities?.map((item, i) => (
                            <Chip key={i} color="primary">
                                {item}
                            </Chip>
                        ))}
                    </div>

                    <div className="mt-8 flex gap-4">

                        <Button
                            onClick={handleBookClick}
                            color="primary"
                        >
                            Book Now <BiRightArrowAlt />
                        </Button>

                    </div>

                </div>

            </div>

            <BookingSection room={room}></BookingSection>
        </div>
    );
};

export default RoomDetailsClient;