"use client";
import React, { useContext, useReducer, FormEvent, memo, useEffect } from "react";

import { OrderModalContext } from "@/providers/OrderModalProvider";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { UserRecord } from "firebase-admin/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/firebase/index";
import { AuthContext } from "@/providers/AuthProvider";
import { OrderTypes } from "@/types";
import { validate_date } from "@/utils/DateUtils";
import { AnimatePresence, motion } from "framer-motion";

import ConfirmModal from "@/components/modals/ConfirmModal";

import LocationInput from "@/components/inputs/LocationInput";
import WeightInput from "@/components/inputs/WeightInput";
import DateInput from "@/components/inputs/CustomInput";
import NotesInput from "@/components/inputs/CustomInput";

export type StateType = {
    formDatas: OrderTypes;
    isVisible: boolean;
};
export type ActionType = {
    type: "SET_FORM_DATAS" | "SET_VISIBILITY";
    payload: any;
};

const initialState: StateType = {
    formDatas: {
        weight: 100,
        prices: 90,
    } as OrderTypes,
    isVisible: false,
};

const formReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "SET_FORM_DATAS":
            return { ...state, formDatas: { ...state.formDatas, ...action.payload } };
        case "SET_VISIBILITY":
            return { ...state, isVisible: action.payload };
        default:
            return state;
    }
};

const OrderModal = memo(() => {
    const { isModalOpen, setIsModalOpen } = useContext(OrderModalContext);
    const { currentUser }: { currentUser: UserRecord } = useContext(AuthContext);
    const [state, dispatch] = useReducer(formReducer, initialState);

    useEffect(() => {
        if (isModalOpen) {
            document.documentElement.style.overflowY = "hidden";
        } else {
            document.documentElement.style.overflowY = "auto";
        }
        return () => {
            document.documentElement.style.overflowY = "auto";
        };
    }, [isModalOpen]);

    const onOrder = async () => {
        validate_date(state.formDatas.date);
        const orderDocs = doc(db, `users/${currentUser!.uid}`);
        await setDoc(orderDocs, { orders: arrayUnion({ id: uuidv4(), ...state.formDatas }) }, { merge: true });
        document.querySelectorAll<HTMLInputElement>("form input,select,textarea").forEach(v => (v.value = ""));
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <form
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        dispatch({ type: "SET_VISIBILITY", payload: true });
                    }}
                    className={"fixed flex justify-center items-center w-full h-dvh z-20 bg-transparent top-0 bottom-0"}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="fixed h-dvh z-30 top-0 left-0 bottom-0 w-full bg-black backdrop-blur-sm bg-opacity-30"
                    />
                    <ConfirmModal title="Hold on!" message="The data cannot be changed, do you want to confirm?" visible={{ isVisible: state.isVisible, dispatch }} callback={onOrder} />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.1 }}
                        className="absolute flex flex-col w-[60%] min-h-64 z-40 gap-10 bg-white rounded-xl p-10 pl-24 pb-5 max-lg:pl-20 max-sm:pl-10 max-sm:w-[90%]"
                    >
                        <IoIosCloseCircleOutline className="absolute top-2 right-5 w-10 h-10 z-50" onClick={() => setIsModalOpen(false)} />
                        <LocationInput dispatch={dispatch} />
                        <WeightInput state={state} dispatch={dispatch} />
                        <DateInput name="date" type="date" onChange={e => dispatch({ type: "SET_FORM_DATAS", payload: { date: e.target.value } })} required={true} />
                        <NotesInput
                            label="Notes (optional)"
                            name="notes"
                            isTextArea={true}
                            placeholder="Note(s) to rubbish collectors"
                            onChange={e => dispatch({ type: "SET_FORM_DATAS", payload: { notes: e.target.value } })}
                        />
                        <button type="submit" className="btn-geo">
                            Submit
                        </button>
                    </motion.div>
                </form>
            )}
        </AnimatePresence>
    );
});
export default OrderModal;
