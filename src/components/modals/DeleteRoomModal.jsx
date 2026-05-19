"use client";

import { Button } from "@heroui/react";

const DeleteRoomModal = ({ room, isOpen, onClose, onDelete }) => {

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[90%] max-w-sm p-5 rounded-lg text-center border p-4 mt-5">

        <h2 className="text-xl font-bold mb-3">
          Delete Room
        </h2>

        <p className="mb-3">
          Are you sure you want to delete <b>{room.roomName}</b>?
        </p>

        <div className="flex gap-2 justify-between">

          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={() => onDelete(room._id)}
          >
            Confirm Delete
          </Button>

        </div>

      </div>

    </div>
  );
};

export default DeleteRoomModal;