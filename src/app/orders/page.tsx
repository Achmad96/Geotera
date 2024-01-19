"use client";
import OrderItem from "@/components/orders/OrderItem";
import Orders from "@/components/orders/Orders";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/lib/firebase";
import { OrderTypes } from "@/types";
import { UserRecord } from "firebase-admin/auth";
import { getDocs, collection, query } from "firebase/firestore";
import { ContextType, useContext, useEffect, useState } from "react";

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
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        readDocs();
    }, []);

    return <Orders>{orders && orders.map((order: OrderTypes) => <OrderItem key={order.id} order={order} user={currentUser} setOrders={setOrders} />)}</Orders>;
}
