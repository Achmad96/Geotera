import { motion } from "framer-motion";
import { Dispatch } from "react";
import { OrderModalActionType } from "./OrderModal";

type ConfirmModalPropsType = {
  title: string;
  message: string;
  visibility: { isVisible: boolean; dispatch: Dispatch<OrderModalActionType> };
  callback: Function;
};

const ConfirmModal = ({
  title,
  message,
  visibility,
  callback,
}: ConfirmModalPropsType) => {
  const { isVisible, dispatch } = visibility;
  const handleConfirm = () => {
    callback();
    dispatch({ type: "orderModalVisibility", payload: false });
  };

  if (isVisible) {
    return (
      <div className="absolute left-0 top-0 z-50 flex h-dvh w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute z-50 flex w-[40%] flex-col gap-7 rounded-xl bg-white p-10 shadow-2xl max-lg:w-[60%] max-sm:w-[80%]"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p>{message}</p>
          </div>
          <div className="flex justify-center gap-10">
            <button
              className="rounded-full bg-green-600 p-3 px-10 text-white shadow-2xl hover:bg-green-700  max-sm:px-5"
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button
              className="rounded-full bg-slate-50 p-3 px-7 shadow-2xl hover:bg-slate-100 max-sm:px-2"
              onClick={() =>
                dispatch({ type: "orderModalVisibility", payload: false })
              }
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default ConfirmModal;
