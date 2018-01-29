import { Config } from "./../../utils/";

export const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
export const notificationShow = (message, level) => ({
  type: NOTIFICATION_SHOW,
  message,
  level
});

export const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";
export const notificationhide = () => ({
  type: NOTIFICATION_HIDE,
  message: "",
  level: null
});

export const showNotification = (message, level) => (dispatch) => {
  dispatch(notificationShow(message, level));
  setTimeout(() => dispatch(notificationhide()), Config.NotificationDuration);
};

export const NotificationActions = {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  showNotification
};

export default NotificationActions;
