"use client";

import { Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchFilter = () => {

    const router = useRouter();

    const [search, setSearch] = useState("");
    const [amenity, setAmenity] = useState("");

    const handleFilter = () => {
    router.push(
        `/rooms?search=${encodeURIComponent(search)}&amenity=${encodeURIComponent(amenity)}`
    );
};


    return (
        <div className="flex flex-col md:flex-row gap-4 mt-10">
            <Input
                className={"border border-gray-400"}
                label="Search room"
                value={search}
                placeholder="Searching By Room Name"
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                className="border rounded-lg px-4 py-3"
                value={amenity}
                onChange={(e) => setAmenity(e.target.value)}
            >
                <option value="">Select Amenities</option>
                <option value="Wi-Fi">Wi-Fi</option>
                <option value="Projector">Projector</option>
                <option value="Whiteboard">Whiteboard</option>
            </select>

            <button onClick={handleFilter} className="bg-blue-600 text-white px-6 rounded-lg">
                Search
            </button>

        </div>
    );
};

export default SearchFilter;