"use client";
import { NotificationsType } from "@/types";
import { AuthContext } from "@/context/AuthContextProvider";
import { useContext, useReducer } from "react";
import { IoNotifications } from "react-icons/io5";

interface ActionType {
    type: "SET_NOTIFICATIONS" | "SET_VISIBILITY";
    payload: any;
}

interface StateType {
    notifications: NotificationsType[];
    visible: boolean;
}

const notificationsReducer = (state: StateType, action: ActionType): StateType => {
    const { type, payload } = action;
    switch (type) {
        case "SET_VISIBILITY":
            return { ...state, visible: payload };
        case "SET_NOTIFICATIONS":
            return { ...state, notifications: payload };
        default:
            return { ...state };
    }
};

const NotificationsItem = ({ title, message, date }: NotificationsType) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <p className="text-md">{title}</p>
                <p className="text-sm">{message}</p>
            </div>
            <p className="text-end text-xs">{date}</p>
        </div>
    );
};

const NotificationList = ({ notifs }: { notifs: NotificationsType[] }) => {
    return (
        <ul className="absolute daisy-menu w-56 rounded-box right-0 top-7 bg-[#000] text-[#2FBC9B]">
            {notifs && notifs.length > 0 ? (
                notifs.map((notif: NotificationsType) => <NotificationsItem title={notif.title} message={notif.message} date={notif.date} />)
            ) : (
                <p className="text-center">No notifications</p>
            )}
        </ul>
    );
};

export default function NotificationButton() {
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const [state, dispatch] = useReducer(notificationsReducer, { visible: false, notifications: [] });
    return (
        <>
            <div className="daisy-indicator">
                {state.notifications && state.notifications.length > 0 && <span className="daisy-indicator-item daisy-badge daisy-badge-error mr-1 mt-1 daisy-badge-xs"></span>}
                <IoNotifications className="w-6 h-6" onClick={() => dispatch({ type: "SET_VISIBILITY", payload: !state.visible })} />
                {state.visible && <NotificationList notifs={state.notifications} />}
            </div>
        </>
    );
}
