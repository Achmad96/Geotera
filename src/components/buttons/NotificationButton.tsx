import { IoNotifications } from "react-icons/io5";

export default function NotificationButton() {
  return (
    <>
      <div className="daisy-indicator">
        <span className="daisy-indicator-item daisy-badge daisy-badge-error mr-1 mt-1 daisy-badge-xs"></span>
        <IoNotifications className="w-6 h-6" />
      </div>
    </>
  );
}
