"use client";
import { AuthContext } from "@/context/AuthContextProvider";
import { useContext, useState } from "react";
import { IoNotifications } from "react-icons/io5";

const NotificationModal = () => {
    return <></>;
};

export default function NotificationButton() {
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const [isModalOpen, setModalOpen] = useState();
    return (
        <>
            <IoNotifications className="w-6 h-6" onClick={() => {}} />
        </>
    );
}
