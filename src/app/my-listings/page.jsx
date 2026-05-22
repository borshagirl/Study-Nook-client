"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import EditRoomModal from "@/components/modals/EditRoomModal";
import DeleteRoomModal from "@/components/modals/DeleteRoomModal";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";


const MyListings = () => {

  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editRoom, setEditRoom] = useState(null);
  const [deleteRoom, setDeleteRoom] = useState(null);

  useEffect(() => {

    const fetchRooms = async () => {

      if (!userId) return;

     try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-rooms/${userId}`
      );

      const data = await res.json();

      setRooms(Array.isArray(data) ? data : []);

    } catch (err) {
      toast.error("Failed to load rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRooms();
}, [userId]);


  const handleUpdate = async (id, form) => {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      }
    );

    if (res.ok) {
      setRooms(prev =>
        prev.map(r =>
          r._id === id ? { ...r, ...form } : r
        )
      );

      toast.success("Updated successfully");
      setEditRoom(null);
    }
  };

  const handleDelete = async (id) => {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );

    if (res.ok) {
      setRooms(prev => prev.filter(r => r._id !== id));
      toast.success("Deleted successfully");
      setDeleteRoom(null);
    }
  };

  if (loading) return <div className="flex flex-col items-center gap-2">
              <Spinner color="success" />
              <span className="text-xs text-muted">Loading</span>
        </div>;

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        My Listings
      </h1>

         {rooms.length === 0 && !loading && (
           <p className="text-gray-500 text-lg font-bold">
             You have no <span className="text-black text-xl">listings</span> yet!
           </p>
         )}


      <div className="grid md:grid-cols-3 gap-5">

        {rooms.map(room => (
          <div key={room._id} className="border p-4 rounded">

            <Image 
                src={room.image}
                alt={room.roomName}
               width={700}
               height={400}
            />

            <h2 className="font-bold mt-2">
              {room.roomName}
            </h2>

            <p className="text-sm text-gray-600">
              {room.description}
            </p>

            <p className="mt-2 text-sm">
              Floor: {room.floor}
            </p>

            <p className="text-sm">
              Capacity: {room.capacity}
            </p>

            <p className="font-bold">
              ${room.hourlyRate}/hr
            </p>

            <div className="flex gap-2 justify-between mt-3">

              <Button
                onClick={() => setEditRoom(room)}
              >
                Edit
              </Button>

              <Button
              variant="danger"
                onClick={() => setDeleteRoom(room)}
              >
                Delete
              </Button>

            </div>

          </div>
        ))}

      </div>

      <EditRoomModal
        room={editRoom}
        isOpen={!!editRoom}
        onClose={() => setEditRoom(null)}
        onUpdate={handleUpdate}
      />

      <DeleteRoomModal
        room={deleteRoom}
        isOpen={!!deleteRoom}
        onClose={() => setDeleteRoom(null)}
        onDelete={handleDelete}
      />

    </div>
  );
};

export default MyListings;