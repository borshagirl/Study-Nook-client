"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

const EditRoomModal = ({ room, isOpen, onClose, onUpdate }) => {

  const [form, setForm] = useState({
    roomName: "",
    description: "",
    floor: "",
    capacity: "",
    hourlyRate: ""
  });

  useEffect(() => {
    if (room) {
      setForm({
        roomName: room.roomName || "",
        description: room.description || "",
        floor: room.floor || "",
        capacity: room.capacity || "",
        hourlyRate: room.hourlyRate || ""
      });
    }
  }, [room]);

  if (!isOpen || !room) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(room._id, form);
  };

  return (
    <div className="fixed w-[50%] mx-auto inset-0 bg-black/50 flex items-center justify-center z-50 mt-5">

      <div className="bg-white w-[50%] max-w-md p-5 rounded-lg">

        <h2 className="text-xl font-bold mb-3">
          Edit Room
        </h2>

        <input
          name="roomName"
          value={form.roomName}
          onChange={handleChange}
          placeholder="Room Name"
          className="w-full border p-2 mb-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 mb-2"
        />

        <input
          name="floor"
          value={form.floor}
          onChange={handleChange}
          placeholder="Floor"
          className="w-full border p-2 mb-2"
        />

        <input
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          className="w-full border p-2 mb-2"
        />

        <input
          name="hourlyRate"
          value={form.hourlyRate}
          onChange={handleChange}
          placeholder="Hourly Rate"
          className="w-full border p-2 mb-4"
        />

        <div className="flex gap-2 justify-between mt-3">

          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
          >
            Save
          </Button>

        </div>

      </div>

    </div>
  );
};

export default EditRoomModal;