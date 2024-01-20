export type APIResponse<T = object> = { success: true; data: T } | { success: false; error: string };
export interface OrderTypes {
    id: string;
    location: string;
    prices: number;
    date: string;
    weight: number;
    complete: boolean;
    messages?: string;
}
