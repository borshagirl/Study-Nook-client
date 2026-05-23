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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?search=${search}&amenity=${amenity}`,
    {
        cache: "no-store"
    }
  );

    if (!res.ok) {
        throw new Error("Failed to fetch rooms");
    }
    
    const data = await res.json();
    
    const rooms = Array.isArray(data) ? data : [];

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