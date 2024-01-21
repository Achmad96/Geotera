export default function Alert({ title, message, visible, callback }: { title: string; message: string; visible: [boolean, Function]; callback: Function }) {
    const [isVisible, setVisible] = visible;
    const handleConfirm = () => {
        callback();
        setVisible(false);
    };
    const handleClose = () => setVisible(false);

    if (isVisible) {
        return (
            <div className="flex absolute left-0 right-0 top-0 bottom-0 w-full h-[90dvh] justify-center items-center">
                <div className="flex absolute flex-col p-10 gap-10 bg-white shadow-2xl w-[30%] max-lg:w-[75%] rounded-xl">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold" id="confirmation-dialog">
                            {title}
                        </h1>
                        <p id="confirmation-message">{message}</p>
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button className="bg-green-600 p-3 px-7 text-white shadow-2xl hover:bg-green-700 rounded-full" onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button className="bg-slate-50 p-3 px-7 shadow-2xl hover:bg-slate-100 rounded-full" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
