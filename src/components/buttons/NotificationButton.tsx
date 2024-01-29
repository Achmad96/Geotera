"use client";
import { NotificationsType } from "@/TypesNInterfaces";
import { AuthContext } from "@/context/AuthContextProvider";
import { useContext, useReducer } from "react";
import { IoNotifications } from "react-icons/io5";

type ActionType = {
    type: "SET_NOTIFICATIONS" | "SET_VISIBILITY";
    payload?: any;
};

type StateType = {
    notifications: NotificationsType[];
    visible: boolean;
};

const notificationsReducer = (state: StateType, action: ActionType) => {
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

const showNotifications = () => {
    return (
        <ul className="absolute right-0 top-7 daisy-menu bg-[#000] text-[#2FBC9B] w-56 rounded-box">
            <li>Hello world</li>
            <li>Halo dunia</li>
            <li>Halo, apa kabar guys</li>
        </ul>
    );
};

export default function NotificationButton() {
    const { isAuth }: { isAuth: boolean } = useContext(AuthContext);
    const [state, dispatch] = useReducer(notificationsReducer, { notifications: [], visible: false });
    return (
        <>
            <div className="daisy-indicator">
                {state.notifications && state.notifications.length > 0 && <span className="daisy-indicator-item daisy-badge daisy-badge-error mr-1 mt-1 daisy-badge-xs"></span>}
                <IoNotifications className="w-6 h-6" onClick={() => dispatch({ type: "SET_VISIBILITY", payload: !state.visible })} />
                {state.visible && showNotifications()}
            </div>
        </>
    );
}
