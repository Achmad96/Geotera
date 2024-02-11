export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export enum OrderStatus {
  Pending = "pending",
  Complete = "complete",
}

export type OrderTypes = {
  key: string;
  location: string;
  date: string;
  weight: number;
  prices: number;
  status: OrderStatus;
  notes?: string;
};

export type NotificationsType = {
  title: string;
  message: string;
  date: string;
};
