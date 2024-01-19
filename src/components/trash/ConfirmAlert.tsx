export default function ConfirmAlert({ title, message, visible, callback }: { title: string; message: string; visible: [boolean, Function]; callback: Function }) {
    const [isVisible, setVisible] = visible;
    const handleConfirm = () => {
        if (callback) {
            callback();
        }
        setVisible(false);
    };
    const handleClose = () => setVisible(false);

    return (
        isVisible && (
            <div
                className="flex absolute flex-col m-auto left-0 right-0 p-10 gap-7 bg-white shadow-xl w-[30%] max-lg:w-[75%]"
                role="dialog"
                aria-labelledby="confirmation-dialog"
                aria-describedby="confirmation-message"
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold" id="confirmation-dialog">
                        {title}
                    </h1>
                    <p id="confirmation-message">{message}</p>
                </div>
                <div className="flex gap-10 justify-center">
                    <button className="bg-green-600 p-3 px-5 text-white hover:bg-opacity-80" onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className="bg-white p-3 px-5 shadow-2xl" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    );
}
