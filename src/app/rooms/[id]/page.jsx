import RoomDetailsClient from "@/components/rooms/RoomDetailsClient";

const RoomDetailsPage = async ({ params }) => {

    const { id } = await params;

    const res = await fetch(
        `http://localhost:5000/rooms/${id}`,
        {
            cache: "no-store"
        }
    );

    if (!res.ok) {
        return (
            <div className="text-center py-20">
                Room Not Found
            </div>
        );
    }

    const room = await res.json();

    return (
        <RoomDetailsClient room={room} />
    );
};

export default RoomDetailsPage;