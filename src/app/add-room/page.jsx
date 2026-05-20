"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";


const AddRoom = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    console.log(user)
  
    const [loading, setLoading] = useState(false);
  
    const [form, setForm] = useState({
      roomName: "",
      description: "",
      image: "",
      floor: "",
      capacity: "",
      hourlyRate: "",
      amenities: []
    });
  
    const amenitiesList = [
      "WiFi",
      "Whiteboard",
      "Projector",
      "Power Outlets",
      "Quiet Zone",
      "AC"
    ];
  
    const handleAmenity = (value) => {
      setForm((prev) => {
        const exists = prev.amenities.includes(value);
      
        return {
          ...prev,
          amenities: exists
            ? prev.amenities.filter((a) => a !== value)
            : [...prev.amenities, value]
        };
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!user) {
        toast.error("Please login first");
        return;
      }
    
      if (!form.roomName || !form.description) {
        toast.error("Room name & description required");
        return;
      }
    
      try {
        setLoading(true);
      
        const payload = {
          ...form,
          ownerId: user.id || user._id
        };
      
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
          }
        );
      
        const data = await res.json();
      
        if (!res.ok) {
          throw new Error(data.message || "Failed to add room");
        }
      
        toast.success("Room added successfully");
      
        setForm({
          roomName: "",
          description: "",
          image: "",
          floor: "",
          capacity: "",
          hourlyRate: "",
          amenities: []
        });
      
      } catch (error) {
        toast.error(error.message);
      
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <div className="max-w-2xl mx-auto p-5 shadow-2xl">

      <h1 className="text-2xl font-bold mb-5">
        Add Study Room
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          placeholder="Room Name"
          value={form.roomName}
          onChange={(e) => setForm({ ...form, roomName: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Floor"
          value={form.floor}
          onChange={(e) => setForm({ ...form, floor: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Hourly Rate"
          value={form.hourlyRate}
          onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
          className="border p-2 w-full"
        />

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.amenities.includes(item)}
                onChange={() => handleAmenity(item)}
              />
              {item}
            </label>
          ))}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {loading ? "Adding..." : "Add Room"}
        </Button>

      </form>
    </div>
  );
};

export default AddRoom;