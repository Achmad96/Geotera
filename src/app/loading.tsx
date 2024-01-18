import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
    return (
        <div className="h-[100dvh]">
            <div className="absolute h-20 w-20 right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner color="success" label="Loading" size="lg" />
            </div>
        </div>
    );
}
