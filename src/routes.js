import { Home } from "./components/home";
import { SagaList, SagaDetails } from "./components/sagas/";
import { Player } from "./components/player";
import News from "./components/news";
import { Feeds, Login } from "./components/user";

export default {
  Home: {
    route: Home,
    routeName: "Home"
  },
  Login: {
    route: Login,
    routeName: "Login"
  },
  News: {
    route: News,
    routeName: "News"
  },
  SagaList: {
    route: SagaList,
    routeName: "SagaList"
  },
  SagaDetails: {
    route: SagaDetails,
    routeName: "SagaDetails"
  },
  Player: {
    route: Player,
    routeName: "Player"
  },
  Feeds: {
    route: Feeds,
    routeName: "Feeds"
  }
};
