import { UserRecord } from "firebase-admin/auth";
import { Dispatch, SetStateAction } from "react";

export type APIResponse<T = object> =
  | { success: true; data?: T; messages: string }
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

export type OrderModalContextType = {
  isModalOpen?: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type AuthContextType = {
  user: UserRecord;
  isAuth: boolean;
};
export type NotificationsType = {
  title: string;
  message: string;
  date: string;
};
