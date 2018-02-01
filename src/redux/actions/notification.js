import { Config } from "./../../utils/";

export const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
export const notificationShow = (message, level, intervalID = 0) => ({
  type: NOTIFICATION_SHOW,
  message,
  level,
  intervalID
});

export const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";
export const notificationhide = () => ({
  type: NOTIFICATION_HIDE,
  message: "",
  level: null,
  intervalID: 0
});

export const showNotification = (message, level) => (dispatch, getState) => {
  const { intervalID } = getState();

  if (intervalID !== 0) {
    clearInterval(intervalID);
    dispatch(notificationhide());
  }

  const newIntervalID = setTimeout(
    () => dispatch(notificationhide()),
    Config.NotificationDuration
  );
  dispatch(notificationShow(message, level, newIntervalID));
};

export const NotificationActions = {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  showNotification
};

export default NotificationActions;
