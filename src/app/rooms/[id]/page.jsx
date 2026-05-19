import RoomDetailsClient from "@/components/rooms/RoomDetailsClient";


export async function generateMetadata({ params }) {

  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Fetch failed");

    const room = await res.json();

    return {
      title: `StudyNook – ${room.roomName}`,
      description: room.description?.slice(0, 150),
    };

  } catch (error) {
    return {
      title: "StudyNook – Room Details",
      description: "View study room details",
    };
  }
}


const RoomDetailsPage = async ({ params }) => {

    const { id } = await params;

     const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
      { cache: "no-store" }
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