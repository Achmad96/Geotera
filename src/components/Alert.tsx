import { BiError } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
interface AlertInterface {
    title?: string;
    type?: "success" | "error" | "info" | "warning";
    message: string;
    visible: [boolean, Function?];
    callback?: Function;
}

export function ConfirmAlert({ title, message, visible, callback }: AlertInterface) {
    const [isVisible, setVisible] = visible;
    const handleConfirm = () => {
        if (callback) callback();
        if (setVisible) setVisible(false);
    };
    const handleClose = () => setVisible && setVisible(false);
    if (isVisible) {
        return (
            <div className="flex absolute left-0 right-0 top-0 bottom-0 w-full h-[90dvh] justify-center items-center">
                <div className="flex absolute flex-col p-10 gap-10 bg-white shadow-2xl w-[30%] max-sm:gap-7 max-lg:w-[80%] rounded-xl">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p id="confirmation-message">{message}</p>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button className="bg-green-600 p-3 px-7 max-sm:px-5 text-white shadow-2xl hover:bg-green-700 rounded-full" onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button className="bg-slate-50 p-3 px-7 max-sm:px-5 shadow-2xl hover:bg-slate-100 rounded-full" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export function Alert({ type, message, visible }: AlertInterface) {
    const [isVisible] = visible;
    if (isVisible) {
        return (
            <div className={`flex items-center gap-5 border  h-[3rem] w-80 rounded-xl ${type === "error" ? "border-red-600 text-red-500" : "border-lime-500 text-lime-500"}`}>
                {type === "error" ? <BiError className="size-7 ml-5" /> : <FaRegCheckCircle className="size-7 ml-5" />}
                <p className="text-large">{message}</p>
            </div>
        );
    }
}
