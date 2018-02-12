export const initialNotificationState = {
  message: "",
  level: null,
  intervalID: 0
};

export const NotificationLevel = Object.freeze({
  info: "green",
  warn: "orange",
  err: "red"
});

export const NotificationConsts = {
  initialNotificationState,
  NotificationLevel
};

export default NotificationConsts;
