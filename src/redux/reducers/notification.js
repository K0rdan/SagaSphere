// Project imports
import { NotificationActions } from "./../actions/";
import { initialNotificationState } from "./../constants/";

export const NotificationReducer = (
  state = initialNotificationState,
  action
) => {
  const { type, message, level, intervalID } = action;
  switch (type) {
    case NotificationActions.NOTIFICATION_SHOW:
    case NotificationActions.NOTIFICATION_HIDE:
      return { ...state, message, level, intervalID };
    default:
      return state;
  }
};

export default NotificationReducer;
