import RoomList from "@/components/rooms/RoomList";


export const metadata = {
  title: "StudyNook-Available Rooms",
  description:
    "Browse all available study rooms, filter by amenities, floor and price, and book instantly.",
};


const RoomsPage = async ({ searchParams }) => {

    const params = await searchParams;

    const search = params?.search || "";
    const amenity = params?.amenity || "";

    const res = await fetch(
        `http://localhost:5000/rooms?search=${search}&amenity=${amenity}`,
        {
            cache: "no-store"
        }
    );

    const rooms = await res.json();

    return (

        <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-center">
                Available Rooms
            </h1>
            <RoomList rooms={rooms} />
        </div>
    );
};

export default RoomsPage;