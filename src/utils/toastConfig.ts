import { ToastOptions, Slide } from "react-toastify";

export const defaultToastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
  toastId: "defaultToast",
};
