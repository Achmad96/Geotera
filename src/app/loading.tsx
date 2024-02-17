export default function Loading() {
    return (
        <div className="absolute top-0 left-0 flex justify-center items-center h-dvh w-full bg-white z-40">
            <div className="flex flex-col items-center gap-5 h-20 w-20 z-50">
                <span className="daisy-loading daisy-loading-lg daisy-loading-spinner text-accent" />
                <p>Loading</p>
            </div>
        </div>
    );
}
