"use client";

import { Input } from "@heroui/react";
import { useState } from "react";

const BookingSection = ({room}) => {

        const [start,setStart]=useState(8);
        const [end,setEnd]=useState(9);

        const total= (end-start)*room.hourlyRate;

    return (
        
        <div className=" mt-20 border p-8 rounded-xl"> 
        <h1 className=" text-2xl font-bold" >
            Book This Room
        </h1>
        <div className=" grid md:grid-cols-2 gap-5 mt-6" >
        <Input type="date"/>
        <select onChange={(e) => setStart( Number(e.target.value))}>  
        <option value="8">
            08:00
        </option>
        <option value="9">
            09:00
        </option>
        <option value="10">
            10:00
        </option>
        <option value="11">
            11:00
        </option>
        <option value="12">
            12:00
        </option>
        </select>

        <select onChange={(e) => setEnd(Number(e.target.value))}>
        <option value="9">
            09:00
        </option>
        <option value="10">
            10:00
        </option>
        <option value="11">
            11:00
        </option>
        <option value="12">
            12:00
        </option>
        </select>
        <Input label="Special Note" />
        </div>
        <h2 className=" text-xl font-bold mt-6" >
            Total Cost:
            ${total}
        </h2>
        <button className=" bg-blue-600 text-white px-6 py-3 rounded-lg mt-5" >
            Confirm Booking
        </button>
        </div>
    )
}

export default BookingSection;