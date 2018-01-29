import { NotificationActions } from "./notification";
import { AuthActions } from "./auth";
import { PlayerActions } from "./player";

export * from "./notification";
export * from "./auth";
export * from "./player";

export const Actions = {
  NotificationActions,
  AuthActions,
  PlayerActions
};

export default Actions;
