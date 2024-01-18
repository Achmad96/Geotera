import { collection, deleteDoc, getDocs, query, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/index";
import OrderItem from "@/components/orders/OrderItem";

export default async function Orders() {
    // const ordersCollection = collection(db, `${user?.uid}` as any);
    // const que = query(ordersCollection);
    // const datas = await getDocs(que);
    return (
        <div className="flex flex-col gap-10 items-center py-10 min-h-[80dvh] h-auto w-full">
            <h1 className="text-4xl">Orders</h1>
            <div className="flex flex-col gap-5 items-center justify-center w-full">
                {/* {datas.docs.length > 0 ? (
                    datas.docs.map((order, index) => <OrderItem key={index} order={order} onDelete={async () => await deleteOrder(order.id)} />)
                ) : (
                    <p>There are no orders at this time</p>
                )} */}
            </div>
        </div>
    );

    // async function deleteOrder(orderId: string) {
    //     try {
    //         await deleteDoc(doc(db, `${user.uid}`, `${orderId}`));
    //         setDatas(prevDatas => prevDatas.filter(order => order.id !== orderId));
    //     } catch (error) {
    //         // Handle the error, e.g., display an error message
    //         console.error("Error deleting order:", error);
    //     }
    // }
}
