import { motion } from "framer-motion";
import { memo } from "react";

interface ConfirmAlertInterface {
    title: string;
    message: string;
    visible: { isVisible: boolean; dispatch: Function };
    callback: Function;
}

const ConfirmAlert = memo(({ title, message, visible, callback }: ConfirmAlertInterface) => {
    const { isVisible, dispatch } = visible;
    const handleConfirm = () => {
        if (callback) callback();
        dispatch({ type: "SET_VISIBILITY", payload: false });
    };

    if (isVisible) {
        return (
            <div className="absolute flex w-full h-[80dvh] justify-center items-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute left-0 right-0 top-0 bottom-0 blur-xl h-[91dvh] transition-all" />
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex relative flex-col p-10 gap-7 bg-white shadow-2xl w-[40%] max-lg:w-[60%] max-sm:w-[80%] rounded-xl z-50"
                >
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p>{message}</p>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button className="bg-green-600 p-3 px-10 max-sm:px-5 text-white shadow-2xl hover:bg-green-700 rounded-full" onClick={handleConfirm}>
                            Yes
                        </button>
                        <button
                            className="bg-slate-50 p-3 px-7 max-sm:px-2 shadow-2xl hover:bg-slate-100 rounded-full"
                            onClick={() => {
                                dispatch({ type: "SET_VISIBILITY", payload: false });
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }
});

export { ConfirmAlert };
