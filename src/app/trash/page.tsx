"use client";
import React, { useContext, useState, FormEvent, ReactHTMLElement, ChangeEvent, ReactElement, ReactNode } from "react";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContextProvider";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { validate_date } from "@/utils/DateUtils";
import { toast, ToastContainer } from "react-toastify";
import { toastConfiguration } from "@/utils/ToastConfig";
import ConfirmAlert from "@/components/trash/ConfirmAlert";
import SearchInput from "@/components/trash/SearchInput";
import { OrderTypes } from "@/types";
import { UserRecord } from "firebase-admin/auth";

export default function Trash() {
    const { currentUser }: { currentUser: UserRecord } = useContext(AuthContext);
    const [formDatas, setFormDatas] = useState({} as OrderTypes);
    const [isVisible, setVisible] = useState(false);

    const validate = (e: FormEvent) => {
        e.preventDefault();
        setVisible(true);
    };

    const add_order = async () => {
        try {
            validate_date(formDatas?.date);
            const orderDocs = doc(db, `${currentUser?.uid}/${formDatas?.id}`);
            await setDoc(orderDocs, formDatas, { merge: true });
            document.querySelectorAll<HTMLInputElement>("form input,select,textarea").forEach(v => (v.value = ""));
            toast.success("Order success!", toastConfiguration);
        } catch (error: any) {
            toast.error(error.message, toastConfiguration);
        }
    };

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const weight = parseInt(e.currentTarget.value);
        setFormDatas((prevFormData: OrderTypes) => ({
            ...prevFormData,
            weight: weight,
            prices: weight ? weight * 0.7 : 0,
        }));
    };

    return (
        <form onSubmit={validate} className="flex w-full flex-col pl-32 max-sm:pl-10 py-10 gap-10 min-h-64 h-auto">
            <ConfirmAlert title={"Confirmation"} message={"Do you want to confirm?"} visible={[isVisible, setVisible]} callback={add_order} />
            <ToastContainer {...toastConfiguration} />

            <div className="flex flex-col justify-start gap-5">
                <p>Location</p>
                <SearchInput setDatas={setFormDatas} />
            </div>
            <div className="flex justify-start items-end gap-5">
                <div className="flex flex-col w-[63%]">
                    <p>Weight (g)</p>
                    <input type="number" placeholder="how much does the trash weigh?" onChange={handleWeightChange} className="w-full h-10 outline-none border-b" min={0} required />
                </div>
                <div className="flex gap-3 items-center w-full">
                    <p>Rp</p>
                    <input type="number" className="w-[63%] h-10 outline-none border-b" placeholder="Prices" value={formDatas?.prices ? formDatas.prices : 0} disabled />
                </div>
            </div>
            <div className="flex flex-col justify-start gap-5">
                <p>Pick-up date</p>
                <input type="date" onChange={e => setFormDatas({ ...formDatas, date: e.target.value })} className="w-[80%] h-10 outline-none border-b" required />
            </div>
            <div className="flex flex-col justify-start gap-5">
                <p>Notes (Optional)</p>
                <textarea placeholder="messages" onChange={e => setFormDatas({ ...formDatas, messages: e.target.value })} className="w-[80%] min-h-20 outline-none border-b" />
            </div>
            <button
                type="submit"
                onClick={() => setFormDatas((prev: OrderTypes) => ({ ...prev, id: uuidv4() }))}
                className="border-collapse bg-green-600 text-slate-100 w-[7rem] p-3 rounded-full hover:border-green-500 hover:border hover:bg-transparent hover:text-gray-800"
            >
                Submit
            </button>
        </form>
    );
}
