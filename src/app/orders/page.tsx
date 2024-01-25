"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { doc, deleteDoc, getDocs, collection, query } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/lib/firebase";
import { OrderTypes } from "@/TypesNInterfaces";
import { AnimatePresence } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { debounce } from "lodash";
import { Space, Table, Tag } from "antd";
import { UserRecord } from "firebase-admin/auth";
import type { TableProps } from "antd";

interface DataType {
    key: string;
    location: string;
    date: string;
    weight: number;
    prices: number;
    status: string;
}

async function onDelete(user: UserRecord, orderId: string, setDatas: Function) {
    try {
        await deleteDoc(doc(db, `users/${user.uid}`, `orders/${orderId}`));
        setDatas((prevDatas: []) => prevDatas.filter((order: OrderTypes) => order.key !== orderId));
    } catch (error) {
        console.error("Error deleting order:", error);
    }
}

export default function OrdersPage() {
    const { currentUser } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    useEffect(() => {
        if (!currentUser) return;
        async function fetchOrders() {
            try {
                const ordersCollection = collection(db, `users/${currentUser.uid}/orders`);
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
                    order.location.toLowerCase().includes(searchLowerCase) || order.notes?.toLowerCase().includes(searchLowerCase) || order.date.toLowerCase().includes(searchLowerCase)
            );

            setSearchTerm(filteredOrders);
        },
        [orders]
    );
    const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);
    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Weight",
            dataIndex: "weight",
            key: "weight",
            render: (_, { weight }) => {
                return <p className="font-bold">{weight} g</p>;
            },
        },
        {
            title: "Prices",
            dataIndex: "prices",
            key: "prices",
            render: (_, { prices }) => {
                return <p className="font-bold">Rp {prices}</p>;
            },
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (_, { status }) => {
                const color = status === "complete" ? "green" : "volcano";
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => onDelete(currentUser, record.key, setOrders)}>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex flex-col items-center py-5 bg-[#F3F3F3] min-h-[90vh] gap-7 h-auto w-full">
            <label className="relative block w-[50%] max-lg:w-[80%]">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <CiSearch className="h-5 w-5 fill-slate-700" />
                </span>
                <input
                    className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
                    placeholder="Search by id or name"
                    type="text"
                    name="search"
                    autoComplete="off"
                    onChange={e => debouncedSearch(e.target.value)}
                />
            </label>
            <AnimatePresence>{searchTerm.length > 0 ? <Table columns={columns} dataSource={orders} /> : <p>Temporarily no orders</p>}</AnimatePresence>
        </div>
    );
}
