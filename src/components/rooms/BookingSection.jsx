"use client";

import { Input } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth";

import { useRouter } from "next/navigation";

const BookingSection = ({ room }) => {

    const { data } = useSession();
    const user = data?.user;

    const router = useRouter();

    const [date, setDate] = useState("");
    const [start, setStart] = useState(8);
    const [end, setEnd] = useState(9);
    const [note, setNote] = useState("");

    const total = (end - start) * room.hourlyRate;

    const handleBooking = async () => {

        if (!user) {
            toast.error("Please login first");
            return;
        }

        const bookingData = {
            roomId: room._id,
            roomName: room.roomName,
            image: room.image,
            userId: user?.id,
            date,
            startHour: start,
            endHour: end,
            specialNote: note
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Room booked successfully");
        
            router.push("/my-bookings"); 
        } else {
            toast.error(data.message || "Booking failed");
        }
    };

    return (
        <div
            id="booking-section"
            className="mt-20 border p-8 rounded-xl"
        >

            <h1 className="text-2xl font-bold">
                Book This Room
            </h1>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

                <Input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                />

                <select
                    onChange={(e) =>
                        setStart(Number(e.target.value))
                    }
                    className="border p-2 rounded"
                >
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                </select>

                <select
                    onChange={(e) =>
                        setEnd(Number(e.target.value))
                    }
                    className="border p-2 rounded"
                >
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                </select>

                <Input
                    label="Special Note"
                    onChange={(e) => setNote(e.target.value)}
                />

            </div>

            <h2 className="text-xl font-bold mt-6">
                Total Cost: ${total}
            </h2>

            <button
                onClick={handleBooking}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-5"
            >
                Confirm Booking
            </button>

        </div>
    );
};

export default BookingSection;