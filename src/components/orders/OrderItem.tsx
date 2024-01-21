"use client";
import { useState, memo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { UserRecord } from "firebase-admin/auth";
import { OrderTypes } from "@/types";

async function onDelete(user: UserRecord, orderId: string, setDatas: Function) {
    try {
        await deleteDoc(doc(db, `${user.uid}`, `${orderId}`));
        setDatas((prevDatas: []) => prevDatas.filter((order: OrderTypes) => order.id !== orderId));
    } catch (error) {
        console.error("Error deleting order:", error);
    }
}

const OrderItem = memo(({ order, user, setOrders }: { order: OrderTypes; user: UserRecord; setOrders: Function }) => {
    const { location, weight, date, notes, prices, id, complete } = order;
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="flex flex-col shadow-lg bg-neutral-100 w-[80%] p-5 pl-20 max-sm:pl-10 gap-3">
            <div className="flex justify-end ">
                <BsThreeDots className="hover:cursor-pointer w-5 h-5" onClick={() => setShowMenu(!showMenu)} />
                {showMenu && (
                    <div className="flex flex-col text-center justify-center items-center absolute text-large w-36 h-20 bg-neutral-200 shadow-sm hover:cursor-pointer">
                        <p onClick={() => onDelete(user, id, setOrders)} className="hover:bg-neutral-300 w-full h-1/2 flex items-center justify-center">
                            Delete
                        </p>
                        <p onClick={() => setShowMenu(false)} className="hover:bg-neutral-300 w-full h-1/2 flex items-center justify-center">
                            Close
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-10">
                    <p className="font-bold">Location</p>
                    <p>{location}</p>
                </div>
                <div className="flex gap-16">
                    <p className="font-bold">Date</p>
                    <p>{date}</p>
                </div>
                <div className="flex gap-12">
                    <p className="font-bold">Weight</p>
                    <p>{weight} g</p>
                </div>
                {notes && (
                    <div className="flex gap-14">
                        <p className="font-bold">Notes</p>
                        <p>{notes}</p>
                    </div>
                )}
                <div className="flex gap-14">
                    <p className="font-bold">Prices</p>
                    <p> Rp {prices}</p>
                </div>
            </div>
            <div className="w-full flex justify-end text-xs">
                {complete ? (
                    <div className="bg-green-500 text-slate-100 p-2 px-5 rounded-full font-bold">
                        <p>Complete</p>
                    </div>
                ) : (
                    <div className="bg-red-500 text-slate-100 p-2 px-5 rounded-full font-bold">
                        <p>Pending</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default OrderItem;
