
import SearchFilter from "./SearchFilter";
import RoomCard from "./RoomCard";

const RoomList = ({ rooms }) => {

    return (
        <>
            <SearchFilter />
            {
                rooms.length === 0 ?
                (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold">
                            No rooms found
                        </h2>
                    </div>
                )
                :
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                        {
                            rooms.map(room => (
                                <RoomCard
                                    key={room._id}
                                    room={room}
                                />
                            ))
                        }
                    </div>
                )
            }
        </>
    );

};

export default RoomList;