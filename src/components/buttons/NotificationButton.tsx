"use client";
import { AuthContext } from "@/context/AuthContextProvider";
import { useContext, useState } from "react";
import { IoNotifications } from "react-icons/io5";

// const Notifications = () => {
//     return <></>;
// };

export default function NotificationButton() {
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const [getNotifications, setNotifications] = useState([]);
    return (
        <>
            <div className="daisy-indicator">
                {getNotifications && getNotifications.length > 0 && <span className="daisy-indicator-item daisy-badge daisy-badge-error mr-1 mt-1 daisy-badge-xs"></span>}
                <IoNotifications className="w-6 h-6" onClick={() => {}} />
            </div>
        </>
    );
}
