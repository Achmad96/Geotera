export type APIResponse<T = object> = { success: true; data: T } | { success: false; error: string };
export interface OrderTypes {
    id: string;
    location: string;
    date: string;
    weight: number;
    prices: number;
    complete: boolean;
    messages?: string;
}
