"use client";
import React, { useContext, useReducer, FormEvent, ChangeEvent } from "react";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { format_date, validate_date } from "@/utils/DateUtils";
import { toast, ToastContainer } from "react-toastify";
import { toastConfiguration } from "@/utils/ToastConfig";
import { OrderTypes } from "@/TypesNInterfaces";
import { UserRecord } from "firebase-admin/auth";
import { ConfirmAlert } from "@/components/Alert";

import SearchInput from "@/components/trash/SearchInput";

interface StateInterface {
    formDatas: OrderTypes;
    isVisible: boolean;
}

const initialState: StateInterface = {
    formDatas: {} as OrderTypes,
    isVisible: false,
};

export interface ActionType {
    type: "SET_FORM_DATAS" | "SET_VISIBILITY";
    payload?: any;
}

const formReducer = (state: StateInterface, action: ActionType) => {
    switch (action.type) {
        case "SET_FORM_DATAS":
            return { ...state, formDatas: { ...state.formDatas, ...action.payload } };
        case "SET_VISIBILITY":
            return { ...state, isVisible: action.payload };
        default:
            return state;
    }
};

export default function Trash() {
    const { currentUser }: { currentUser: UserRecord } = useContext(AuthContext);
    const [state, dispatch] = useReducer(formReducer, initialState);
    const add_order = async () => {
        try {
            validate_date(state.formDatas.date);
            const orderDocs = doc(db, `users/${currentUser?.uid}/orders/${state.formDatas.key}`);
            await setDoc(orderDocs, state.formDatas, { merge: true });
            document.querySelectorAll<HTMLInputElement>("form input,select,textarea").forEach(v => (v.value = ""));
            toast.success("Order success!", toastConfiguration);
        } catch (error: any) {
            toast.error(error.message, toastConfiguration);
        }
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const weight = parseInt(e.currentTarget.value);
        dispatch({
            type: "SET_FORM_DATAS",
            payload: {
                weight: weight,
                prices: weight ? weight * 0.7 : 0,
            },
        });
    };

    return (
        <form
            onSubmit={(e: FormEvent) => {
                e.preventDefault();
                dispatch({ type: "SET_VISIBILITY", payload: true });
            }}
            className="flex w-full flex-col pl-32 max-sm:pl-10 py-10 gap-10 min-h-64 h-auto"
        >
            <div className="">
                <ConfirmAlert
                    title={"Confirmation"}
                    message={"The data cannot be edited later, will you confirm it?"}
                    visible={[state.isVisible, (isVisible: boolean) => dispatch({ type: "SET_VISIBILITY", payload: isVisible })]}
                    callback={add_order}
                />
                <ToastContainer {...toastConfiguration} />
            </div>
            <div className="flex flex-col justify-start gap-5">
                <p>Location</p>
                <SearchInput dispatch={dispatch} />
            </div>
            <div className="flex justify-start items-end gap-5">
                <div className="flex flex-col w-[63%]">
                    <p>Weight (g)</p>
                    <input name="weight" type="number" placeholder="Garbage weight" onChange={handleWeightChange} className="w-full h-10 outline-none border-b pl-2" min={0} required />
                </div>
                <div className="flex gap-3 items-center w-full">
                    <p>Rp</p>
                    <input name="prices" type="number" className="w-[63%] h-10 outline-none border-b pl-2" placeholder="prices" value={state.formDatas?.prices ? state.formDatas.prices : 0} disabled />
                </div>
            </div>
            <div className="flex flex-col justify-start gap-5">
                <p>Pick-up date</p>
                <input
                    name="date"
                    type="date"
                    onChange={e => dispatch({ type: "SET_FORM_DATAS", payload: { date: format_date(e.target.value) } })}
                    className="w-[80%] h-10 outline-none border-b pl-2"
                    required
                />
            </div>
            <div className="flex flex-col justify-start gap-5">
                <p>Notes (Optional)</p>
                <textarea
                    name="notes"
                    placeholder="Notes to rubbish collectors"
                    onChange={e => dispatch({ type: "SET_FORM_DATAS", payload: { notes: e.target.value } })}
                    className="w-[80%] min-h-20 outline-none border-b pl-2"
                />
            </div>
            <button
                type="submit"
                onClick={() => dispatch({ type: "SET_FORM_DATAS", payload: { key: uuidv4(), status: "pending" } })}
                className="border-collapse bg-green-600 text-slate-100 w-[7rem] p-3 rounded-full hover:border-green-500 hover:border hover:bg-transparent hover:text-gray-800"
            >
                Submit
            </button>
        </form>
    );
}
