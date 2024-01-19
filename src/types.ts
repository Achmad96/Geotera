export type APIResponse<T = object> = { success: true; data: T } | { success: false; error: string };
export interface OrderTypes {
    location: string;
    prices: number;
    date: string;
    weight: number;
    id: string;
    messages?: string;
}
