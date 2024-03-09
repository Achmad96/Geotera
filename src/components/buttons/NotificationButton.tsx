import { IoNotifications } from "react-icons/io5";

export default function NotificationButton() {
  return (
    <>
      <div className="daisy-indicator max-sm:collapse">
        <span className="daisy-badge daisy-indicator-item daisy-badge-error daisy-badge-xs mr-1 mt-1"></span>
        <IoNotifications className="h-6 w-6" />
      </div>
    </>
  );
}
