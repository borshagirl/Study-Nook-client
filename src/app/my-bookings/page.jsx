"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";

const MyBookings = () => {

  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBookings = async () => {

      if (!userId) return;

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${userId}`
        );

        const data = await res.json();
        setBookings(data);

      } catch (error) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }

    };

    fetchBookings();

  }, [userId]);

  const handleCancel = async (id) => {

    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (!res.ok) {
        throw new Error("Cancel failed");
      }

      setBookings(prev =>
        prev.map(b =>
          b._id === id
            ? { ...b, status: "cancelled" }
            : b
        )
      );

      toast.success("Booking cancelled");

    } catch (error) {
      toast.error(error.message);
    }

  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-2">
            <Spinner color="success" />
            <span className="text-xs text-muted">Loading</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {
        bookings.length === 0 ? (

          <p className="text-gray-500">
            You have no bookings yet
          </p>

        ) : (

          <div className="grid md:grid-cols-2 gap-5">

            {bookings.map(booking => (

              <div
                key={booking._id}
                className="border p-4 rounded-xl shadow"
              >

                <Image 
                    src={booking?.image}
                    alt={booking?.roomName}
                    width={700}
                    height={400}
                 />

                <h2 className="font-bold text-lg">
                  {booking.roomName}
                </h2>

                <p className="text-sm mt-1">
                  Date: {booking.date}
                </p>

                <p className="text-sm">
                  Time: {booking.startHour}:00 - {booking.endHour}:00
                </p>

                <p className="text-sm mt-1">
                  Note: {booking.specialNote || "N/A"}
                </p>

                <p className="mt-2">
                  Status:
                  <span className={
                    booking.status === "confirmed"
                      ? "text-green-600 font-bold ml-1"
                      : "text-red-600 font-bold ml-1"
                  }>
                    {booking.status}
                  </span>
                </p>

                {
                  booking.status === "confirmed" && (
                    <Button
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel Booking
                    </Button>
                  )
                }

              </div>

            ))}

          </div>

        )
      }

    </div>
  );
};

export default MyBookings;