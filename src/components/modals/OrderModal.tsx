"use client";

import React, { useReducer, useEffect, FormEvent, KeyboardEvent, ChangeEvent } from "react";

import { useOrderModal } from "@/providers/OrderModalProvider";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/firebase";
import { OrderStatus, OrderTypes } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

import ConfirmModal from "@/components/modals/ConfirmModal";

import LocationInput from "@/components/inputs/LocationInput";
import WeightInput from "@/components/inputs/WeightInput";
import DateInput from "@/components/inputs/DateInput";
import NotesInput from "@/components/inputs/NotesInput";
import { isPickUpTimeValid } from "@/utils/time";
import { toast } from "react-toastify";
import { defaultToastConfig } from "@/utils/toastConfig";
import { useAuth } from "@/providers/AuthProvider";

export type OrderModalStateType = {
    formData: OrderTypes;
    isVisible: boolean;
};

export type OrderModalActionType = {
    type: "orderFormData" | "orderModalVisibility";
    payload: any;
};

const initialState: OrderModalStateType = {
    formData: {
        id: "",
        location: {
            name: "",
            long: 0,
            lat: 0,
        },
        time: 0,
        weight: 100,
        prices: 90,
        status: null,
        notes: null,
    } as OrderTypes,
    isVisible: false,
};

const formReducer = (state: OrderModalStateType, action: OrderModalActionType): OrderModalStateType => {
    switch (action.type) {
        case "orderFormData":
            return { ...state, formData: { ...state.formData, ...action.payload } };
        case "orderModalVisibility":
            return { ...state, isVisible: action.payload };
        default:
            return state;
    }
};

const OrderModal = () => {
    const { isModalOpen, setIsModalOpen } = useOrderModal();
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { isAuth, user } = useAuth();
    useEffect(() => {
        if (isModalOpen) {
            document.documentElement.style.overflowY = "hidden";
            const element: HTMLInputElement | null = document.querySelector<HTMLInputElement>("input[type=text]");
            element && element.focus();
        }
        return () => {
            document.documentElement.style.overflowY = "auto";
        };
    }, [isModalOpen]);

    const onOrder = async () => {
        dispatch({
            type: "orderFormData",
            payload: { id: uuidv4(), status: OrderStatus.Pending },
        });
        try {
            if (!isAuth) {
                throw new Error("User not found.");
            }
            if (!state.formData.id) {
                throw new Error("Order ID is EMPTY.");
            }
            const orderDocs = doc(db, `users/${user?.uid}`);
            await setDoc(orderDocs, { orders: arrayUnion(state.formData) }, { merge: true });
            document.querySelectorAll<HTMLInputElement>("form input,select,textarea").forEach((v: HTMLInputElement) => (v.value = ""));
            toast.success("Successfully place an order!", defaultToastConfig);
        } catch (e: any) {
            console.log(e.message);
            toast.error("Failed to place an order!", defaultToastConfig);
        }
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        dispatch({ type: "orderModalVisibility", payload: true });
                    }}
                    className={"fixed flex justify-center items-center w-full h-dvh z-20 bg-transparent top-0 bottom-0"}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed h-dvh z-30 top-0 left-0 bottom-0 w-full bg-black backdrop-blur-sm bg-opacity-30"
                    />
                    <ConfirmModal title="Hold on!" message="The data cannot be changed, do you want to confirm?" visibility={{ isVisible: state.isVisible, dispatch }} callback={onOrder} />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.1 }}
                        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => e.key === "Escape" && setIsModalOpen(false)}
                        className="absolute flex flex-col w-[60%] min-h-64 z-40 gap-10 bg-white rounded-xl p-10 pl-24 pb-5 max-lg:pl-20 max-sm:pl-10 max-sm:w-[90%]"
                    >
                        <button className="absolute top-2 right-5 z-50 daisy-btn daisy-btn-circle daisy-btn-outline" onClick={() => setIsModalOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <LocationInput dispatch={dispatch} />
                        <WeightInput state={state} dispatch={dispatch} />
                        <DateInput
                            name="date"
                            type="datetime-local"
                            label="date"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const date = new Date(e.target.value);
                                if (isPickUpTimeValid(date)) {
                                    dispatch({
                                        type: "orderFormData",
                                        payload: {
                                            time: date.getTime(),
                                        },
                                    });
                                } else {
                                    toast.error("The time must be equal or greater than 1 hour from now!", defaultToastConfig);
                                }
                            }}
                        />
                        <NotesInput
                            name="notes"
                            label="Notes (optional)"
                            placeholder="Notes to rubbish collectors"
                            required={false}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value.length <= 100) {
                                    dispatch({
                                        type: "orderFormData",
                                        payload: { notes: e.target.value },
                                    });
                                } else {
                                    toast.error("Notes must be less or equal than 100 characters.", defaultToastConfig);
                                }
                            }}
                        />
                        <button type="submit" className="btn-geo">
                            Submit
                        </button>
                    </motion.div>
                </form>
            )}
        </AnimatePresence>
    );
};

export default OrderModal;
