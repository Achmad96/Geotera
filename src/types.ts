export type APIResponse<T = object> = { success: true; data: T } | { success: false; error: string };

export enum OrderStatus {
    Pending = "pending",
    Complete = "complete",
}

export type OrderTypes = {
    id: string;
    location: {
        name: string;
        long: number;
        lat: number;
    };
    time: number;
    weight: number;
    prices: number;
    status: OrderStatus | null;
    notes: string | null;
};

export type NotificationsType = {
    title: string;
    message: string;
    date: string;
};
