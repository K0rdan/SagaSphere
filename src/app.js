// Lib imports
import { StackNavigator } from "react-navigation";
// Custom imports
import { Config, Lang } from "./utils";
import routes from "./routes";

const SagaSphere = StackNavigator({
  Home: { screen: routes.Home, navigationOptions: { title: Lang[Config.Lang].Menu.Home } },
  Login: { screen: routes.Login, navigationOptions: { title: Lang[Config.Lang].Menu.User.Login } },
  UserSagas: { screen: routes.UserSagas, navigationOptions: { title: Lang[Config.Lang].Menu.User.Sagas } }
}, {
  headerMode: "none",
  initialRouteName: "Home"
});

export default SagaSphere;
