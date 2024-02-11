"use client";

import React, {
  useContext,
  useReducer,
  useEffect,
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";

import {
  OrderModalContext,
  OrderModalContextType,
} from "@/providers/OrderModalProvider";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/firebase";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { OrderStatus, OrderTypes } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

import ConfirmModal from "@/components/modals/ConfirmModal";

import LocationInput from "@/components/inputs/LocationInput";
import WeightInput from "@/components/inputs/WeightInput";
import DateInput from "@/components/inputs/CustomInput";
import NotesInput from "@/components/inputs/CustomInput";
import { isDateValid } from "@/utils/DateUtils";
import { toast } from "react-toastify";
import { defaultToastConfig } from "@/utils/ToastConfig";

export type OrderModalStateType = {
  formDatas: OrderTypes;
  isVisible: boolean;
};

export type OrderModalActionType = {
  type: "SET_FORM_DATAS" | "SET_VISIBILITY";
  payload: any;
};

const initialState: OrderModalStateType = {
  formDatas: {
    weight: 100,
    prices: 90,
  } as OrderTypes,
  isVisible: false,
};

const formReducer = (
  state: OrderModalStateType,
  action: OrderModalActionType,
): OrderModalStateType => {
  switch (action.type) {
    case "SET_FORM_DATAS":
      return { ...state, formDatas: { ...state.formDatas, ...action.payload } };
    case "SET_VISIBILITY":
      return { ...state, isVisible: action.payload };
    default:
      return state;
  }
};

const OrderModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(
    OrderModalContext,
  ) as OrderModalContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const [state, dispatch] = useReducer(formReducer, initialState);
  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflowY = "hidden";
      const elements: HTMLInputElement[] = Array.from(
        document.querySelectorAll<HTMLInputElement>(
          "input[type=text],textarea",
        ),
      );
      elements && elements[0].focus();
    }
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isModalOpen]);

  const onOrder = async () => {
    try {
      dispatch({
        type: "SET_FORM_DATAS",
        payload: { id: uuidv4(), status: OrderStatus.Pending },
      });
      const orderDocs = doc(db, `users/${user!.uid}`);
      await setDoc(
        orderDocs,
        { orders: arrayUnion(state.formDatas) },
        { merge: true },
      );
      document
        .querySelectorAll<HTMLInputElement>("form input,select,textarea")
        .forEach((v: HTMLInputElement) => (v.value = ""));
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch({ type: "SET_VISIBILITY", payload: true });
          }}
          className={
            "fixed flex justify-center items-center w-full h-dvh z-20 bg-transparent top-0 bottom-0"
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed h-dvh z-30 top-0 left-0 bottom-0 w-full bg-black backdrop-blur-sm bg-opacity-30"
          />
          <ConfirmModal
            title="Hold on!"
            message="The data cannot be changed, do you want to confirm?"
            visible={{ isVisible: state.isVisible, dispatch }}
            callback={onOrder}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.1 }}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
              e.key === "Escape" && setIsModalOpen(false)
            }
            className="absolute flex flex-col w-[60%] min-h-64 z-40 gap-10 bg-white rounded-xl p-10 pl-24 pb-5 max-lg:pl-20 max-sm:pl-10 max-sm:w-[90%]"
          >
            <IoIosCloseCircleOutline
              className="absolute top-2 right-5 w-10 h-10 z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <LocationInput dispatch={dispatch} />
            <WeightInput state={state} dispatch={dispatch} />
            <DateInput
              name="date"
              type="datetime-local"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const date = new Date(e.target.value);
                if (isDateValid(date)) {
                  dispatch({
                    type: "SET_FORM_DATAS",
                    payload: {
                      date,
                    },
                  });
                } else {
                  toast.error(
                    "The date must be equal or greater than 1 hour from now!",
                    defaultToastConfig,
                  );
                }
              }}
              required={true}
            />
            <NotesInput
              label="Notes (optional)"
              name="notes"
              isTextArea={true}
              required={false}
              placeholder="Note(s) to rubbish collectors"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: "SET_FORM_DATAS",
                  payload: { notes: e.target.value },
                })
              }
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
