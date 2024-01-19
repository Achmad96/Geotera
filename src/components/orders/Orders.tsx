import { ReactElement } from "react";

export default async function Orders({ children }: { children: ReactElement }) {
    return (
        <div className="flex flex-col gap-10 items-center py-10 min-h-[80dvh] h-auto w-full">
            <h1 className="text-4xl">Orders</h1>
            <div className="flex flex-col gap-5 items-center justify-center w-full">{children}</div>
        </div>
    );
}
