// Lib imports
import { StackNavigator } from "react-navigation";
// Custom imports
import {Config, Lang} from "./utils";
import routes from "./routes";

export default SagaSphere = StackNavigator({
  Home: { screen: routes.Home, navigationOptions: { title: Lang[Config.Lang].Menu.Home } },
  UserSagas: { screen: routes.UserSagas, navigationOptions: { title: Lang[Config.Lang].Menu.User.Sagas } }
}, {
  headerMode: "none",
  initialRouteName: "UserSagas"
});