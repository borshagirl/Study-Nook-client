"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const MyListings = () => {

  const { data } = authClient.useSession();

  const user = data?.user;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRooms = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-rooms/${user?.id}`,
        {
          credentials: "include"
        }
      );

      const data = await res.json();
      setRooms(data);

    } catch (err) {
      toast.error("Failed to load rooms");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchMyRooms();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-2xl font-bold mb-5">
        My Listings
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : rooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {rooms.map((room) => (
            <div key={room._id} className="border p-3 rounded">
              <Image 
                src={room.image}
                alt={room.roomName}
                width={700}
                height={400} />

              <h2 className="font-bold mt-2">
                {room.roomName}
              </h2>

              <p className="text-sm text-gray-500">
                {room.description?.slice(0, 80)}...
              </p>

              <p className="font-bold mt-2">
                ${room.hourlyRate}/hr
              </p>

              <p className="text-sm">
                Bookings: {room.bookingCount}
              </p>

              <div className="flex gap-2 mt-3">

                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyListings;