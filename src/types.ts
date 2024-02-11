import { Dispatch, SetStateAction } from "react";

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export type OrderTypes = {
  key: string;
  location: string;
  date: string;
  weight: number;
  prices: number;
  status: string;
  notes?: string;
};

export type NotificationsType = {
  title: string;
  message: string;
  date: string;
};
