export type APIResponse<T = object> = { success: true; data: T } | { success: false; error: string };
export interface OrderTypes {
    key: string;
    location: string;
    date: string;
    weight: number;
    prices: number;
    status: string;
    notes?: string;
}