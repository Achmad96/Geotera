"use client";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/lib/firebase";
import { UserRecord } from "firebase-admin/auth";
import { getDocs, collection, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { OrderTypes } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import OrderItem from "@/components/orders/OrderItem";

export default function OrdersPage() {
    const { currentUser }: { currentUser: UserRecord } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function readDocs() {
            try {
                const ordersCollection = collection(db, `${currentUser?.uid}`);
                const que = query(ordersCollection);
                const datasDocs = await getDocs(que);
                setOrders(datasDocs.docs.map(doc => doc.data()) as []);
            } catch (error: any) {
                console.error("Error fetching orders:", error.message);
            }
        }
        readDocs();
    }, []);

    return (
        <div className="flex flex-col items-center py-5 min-h-[90dvh] gap-7 h-auto w-full">
            <h1 className="text-4xl">Orders</h1>
            <ul className="flex flex-col items-center justify-center gap-5 w-full">
                <AnimatePresence>
                    {orders?.length > 0 ? (
                        orders.map((order: OrderTypes) => (
                            <motion.li className="flex flex-col gap-5 items-center justify-center w-full" key={order.id} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <OrderItem order={order} user={currentUser} setOrders={setOrders} />
                            </motion.li>
                        ))
                    ) : (
                        <p>Temporarily no orders</p>
                    )}
                </AnimatePresence>
            </ul>
        </div>
    );
}
