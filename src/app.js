// Lib imports
import { StackNavigator } from "react-navigation";
// Custom imports
import { Config, Lang } from "./utils";
import routes from "./routes";

const SagaSphere = StackNavigator({
  Home: { screen: routes.Home, navigationOptions: { title: Lang[Config.Lang].Menu.Home } },
  Login: { screen: routes.Login, navigationOptions: { title: Lang[Config.Lang].Menu.User.Login } },
  SagaList: { screen: routes.SagaList, navigationOptions: { title: Lang[Config.Lang].Menu.SagaList } },
  News: { screen: routes.News, navigationOptions: { title: Lang[Config.Lang].Menu.News } },
  Feeds: { screen: routes.Feeds, navigationOptions: { title: Lang[Config.Lang].Menu.User.Feeds } }
}, {
  headerMode: "none",
  initialRouteName: "Home"
});

export default SagaSphere;
