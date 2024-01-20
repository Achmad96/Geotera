"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/lib/firebase";
import { OrderTypes } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { debounce } from "lodash";

import OrderItem from "@/components/orders/OrderItem";

export default function OrdersPage() {
    const { currentUser } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    useEffect(() => {
        if (!currentUser) return;
        async function fetchOrders() {
            try {
                const ordersCollection = collection(db, currentUser.uid);
                const querySnapshot = await getDocs(query(ordersCollection));
                const fetchedOrders: any = querySnapshot.docs.map(doc => doc.data());
                setOrders(fetchedOrders);
            } catch (error: any) {
                console.error("Error fetching orders:", error.message);
            }
        }

        fetchOrders();
    }, [currentUser]);

    useEffect(() => {
        setSearchTerm(orders);
    }, [orders]);

    const handleSearch = useCallback(
        (searchValue: string) => {
            if (!searchValue.trim()) {
                setSearchTerm(orders);
                return;
            }

            const searchLowerCase = searchValue.toLowerCase();
            const filteredOrders = orders.filter(
                (order: OrderTypes) =>
                    order.location.toLowerCase().includes(searchLowerCase) || order.messages?.toLowerCase().includes(searchLowerCase) || order.date.toLowerCase().includes(searchLowerCase)
            );

            setSearchTerm(filteredOrders);
        },
        [orders]
    );

    const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

    const renderOrderList = (orderList: OrderTypes[]) =>
        orderList.map((order: OrderTypes) => (
            <motion.li key={order.id} className="flex flex-col gap-5 items-center justify-center w-full" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <OrderItem order={order} user={currentUser} setOrders={setOrders} />
            </motion.li>
        ));

    return (
        <div className="flex flex-col items-center py-5 min-h-[90vh] gap-7 h-auto w-full">
            <h1 className="text-4xl">Orders</h1>
            <label className="relative block w-[50%]">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <CiSearch className="h-5 w-5 fill-slate-300" />
                </span>
                <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search for orders"
                    type="text"
                    name="search"
                    autoComplete="off"
                    onChange={e => debouncedSearch(e.target.value)}
                />
            </label>
            <AnimatePresence>{searchTerm.length > 0 ? renderOrderList(searchTerm) : <p>Temporarily no orders</p>}</AnimatePresence>
        </div>
    );
}
