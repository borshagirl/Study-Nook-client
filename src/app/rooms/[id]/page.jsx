import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import { IoIosSchool } from "react-icons/io";
import { ImManWoman } from "react-icons/im";
import BookingSection from "@/components/rooms/BookingSection";

const RoomDetailsPage=async({params})=>{

    const {id}=await params;

    const res=await fetch(`http://localhost:5000/rooms/${id}`, {
            cache:"no-store"
        }
    )

    const room=await res.json();

    const user=null;

    const isOwner=false;

    return(
        <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 gap-12">
        <Image
            src={room.image}
            alt={room.roomName}
            width={700}
            height={500}
            className="
            w-full
            h-112
            rounded-xl
            object-cover"
        />
        <div>
        <h1 className=" text-4xl font-bold">
            {room.roomName}
        </h1>
        <p className=" text-gray-500 mt-5">
            {room.description}
        </p>
        <div className="mt-4">
            <p className="flex items-center gap-1"><IoIosSchool /> {room.floor}</p>
            <p className="flex items-center gap-1"><ImManWoman /> {room.capacity}</p>
            <p className="text-xl font-bold">$ {room.hourlyRate}/hr</p>
            <p>
                📖 Bookings:
                {room.bookingCount || 0}
            </p>
         </div>
        <div className=" flex flex-wrap gap-2 mt-6" >
        {
            room.amenities?.map(item=> <Chip key={item} color="primary" >
                {item}
            </Chip>)
        }
        </div>
        <div className=" mt-8 flex gap-4" >
        {
          user?
            <Button color="primary">
                Book Now
            </Button>
        :
            <Button color="danger" >
                Login to Book
            </Button>
        }

        {
        isOwner &&
        <>
            <Button>
                Edit
            </Button>
            <Button color="danger" >      
                Delete
            </Button>
        </>
        }
        </div>
        </div>
        </div>

        <BookingSection room={room} />
        </div>
        )
        }

export default RoomDetailsPage;