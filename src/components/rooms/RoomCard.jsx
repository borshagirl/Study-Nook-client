import { Card, Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { ImManWoman } from "react-icons/im";
import { IoIosSchool } from "react-icons/io";

const RoomCard = ({ room }) => {
    return (
        <Card className="p-4">

            <Image
                src={room.image}
                alt={room.roomName}
                width={500}
                height={300}
                className="w-full h-55 rounded-xl object-cover"
            />

            <h2 className="font-bold text-xl mt-4">
                {room.roomName}
            </h2>

            <p className="text-gray-500 mt-3">
                {room.description.slice(0,100)}...
            </p>

            <div className="mt-4">
                <p className="flex items-center gap-1">
                    <IoIosSchool />
                    {room.floor}
                </p>

                <p className="flex items-center gap-1">
                    <ImManWoman />
                    {room.capacity}
                </p>

                <p className="text-xl font-bold">
                    ${room.hourlyRate}/hr
                </p>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
                {room.amenities?.slice(0,3).map(item=>(
                    <Chip
                        key={item}
                        size="sm"
                        color="primary"
                    >
                        {item}
                    </Chip>
                ))}
            </div>

            {/* FIX */}
            <Link
                href={`/rooms/${room._id}`}
                className="block mt-6"
            >
                <button className="w-full bg-blue-600 text-white py-5 rounded-lg">
                    View Details
                </button>
            </Link>

        </Card>
    );
};

export default RoomCard;