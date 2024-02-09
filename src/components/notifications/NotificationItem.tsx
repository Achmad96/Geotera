import { NotificationsType } from "@/types";

const NotificationItem = ({ title, message, date }: NotificationsType) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-md">{title}</p>
        <p className="text-sm">{message}</p>
      </div>
      <p className="text-end text-xs">{date}</p>
    </div>
  );
};
export default NotificationItem;
