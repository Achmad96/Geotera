import { OrderTypes } from "@/types";
import { UserRecord } from "firebase-admin/auth";
import OrderItem from "@/components/orders/OrderItem";

export default async function Orders({ orders, user, setOrders }: { orders: OrderTypes[]; user: UserRecord; setOrders: Function }) {
    return (
        <div className="flex flex-col gap-10 items-center py-10 min-h-[80dvh] h-auto w-full">
            <h1 className="text-4xl">Orders</h1>
            <div className="flex flex-col gap-5 items-center justify-center w-full">
                {orders && orders.map((order: OrderTypes) => <OrderItem key={order.id} order={order} user={user} setOrders={setOrders} />)}
            </div>
        </div>
    );
}
