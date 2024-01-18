"use client";
import { MouseEventHandler, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

interface OrderType {
    location: string;
    weight: string;
    date: string;
    prices: number;
    messages?: string;
}

export default function OrderItem({ order, onDelete }: { order: OrderType; onDelete: MouseEventHandler }) {
    const { location, weight, date, messages, prices } = order;
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="flex flex-col shadow-lg bg-neutral-100 w-[80%] p-5 pl-20 max-sm:pl-10 gap-3">
            <div className="flex justify-end ">
                <BsThreeDots className="hover:cursor-pointer w-5 h-5" onClick={() => setShowMenu(!showMenu)} />
                {showMenu && (
                    <div className="flex flex-col text-center justify-center items-center absolute text-large w-36 h-20 bg-neutral-200 shadow-sm hover:cursor-pointer">
                        <p onClick={onDelete} className="hover:bg-neutral-300 w-full h-1/2 flex items-center justify-center">
                            Delete
                        </p>
                        <p onClick={() => setShowMenu(false)} className="hover:bg-neutral-300 w-full h-1/2 flex items-center justify-center">
                            Close
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-14">
                    <p>Location</p>
                    <p>{location}</p>
                </div>
                <div className="flex gap-16">
                    <p>Weight</p>
                    <p>{weight} g</p>
                </div>
                {messages && (
                    <div className="flex gap-[4.5rem] mb-5">
                        <p>Notes</p>
                        <p>{messages}</p>
                    </div>
                )}
                <div className="flex gap-[4.5rem]">
                    <p>Prices</p>
                    <p> Rp {prices}</p>
                </div>
            </div>
            <div className="w-full flex justify-end text-xs">{date}</div>
        </div>
    );
}
