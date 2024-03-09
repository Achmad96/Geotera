import { NotificationsType } from "@/types";
import NotificationItem from "@/components/notifications/NotificationItem";

const NotificationList = ({ notifs }: { notifs: NotificationsType[] }) => {
  return (
    <ul className="daisy-menu absolute right-0 top-7 w-56 rounded-box bg-[#000] text-[#2FBC9B]">
      {notifs && notifs.length > 0 ? (
        notifs.map((notif: NotificationsType) => (
          <NotificationItem
            title={notif.title}
            message={notif.message}
            date={notif.date}
          />
        ))
      ) : (
        <p className="text-center">No notifications</p>
      )}
    </ul>
  );
};
export default NotificationList;
