
import { Card, Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { ImManWoman } from "react-icons/im";
import { IoIosSchool } from "react-icons/io";

const LatestRooms = async () => {

    const res = await fetch(
        "http://localhost:5000/rooms/latest",
        {
            cache: "no-store"
        }
    );

    const rooms = await res.json();

    return (

        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">
                        Available Study Rooms
                    </h1>
                    <p className="text-gray-500 mt-4">
                        Explore our latest study spaces and find
                        your ideal learning environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {
                        rooms?.map(room => (
                            <Card
                                key={room._id}
                                className="p-4 h-full"
                            >

                                <Image
                                    src={room.image}
                                    alt={room.roomName}
                                    width={500}
                                    height={250}
                                    className="w-full h-[220px] rounded-xl object-cover"
                                />

                                <div className="mt-5 flex flex-col flex-grow">
                                    <h2 className="text-2xl font-bold">
                                        {room.roomName}
                                    </h2>
                                    <p className="text-gray-500 mt-3">
                                        {
                                            room.description.length > 50
                                            ?
                                            room.description.slice(0, 80)+"..."
                                            :
                                            room.description
                                        }
                                    </p>
                                     <div className="mt-4">
                                                    <p className="flex items-center gap-1"><IoIosSchool /> {room.floor}</p>
                                                    <p className="flex items-center gap-1"><ImManWoman /> {room.capacity}</p>
                                                    <p className="text-xl font-bold">$ {room.hourlyRate}/hr</p>
                                                </div>
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {
                                            room.amenities
                                            ?.slice(0,3)
                                            .map(item => (
                                                <Chip
                                                    key={item}
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    {item}
                                                </Chip>
                                            ))
                                        }

                                        {
                                            room.amenities?.length > 3 && (
                                                <Chip
                                                    size="sm"
                                                >
                                                    +
                                                    {
                                                        room.amenities.length - 3
                                                    }
                                                    {" "}
                                                    more
                                                </Chip>
                                            )
                                        }
                                    </div>
    <Link
    href={`/rooms/${room._id}`}
    className="block mt-6"
>
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
        View Details
    </button>
</Link>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>
    );

};

export default LatestRooms;