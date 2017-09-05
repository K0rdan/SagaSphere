import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, Text, View, AppState } from "react-native";
import Orientation from "react-native-orientation";
import Carousel from "react-native-snap-carousel";
import Page from "./page";
import { API, Config } from "./../utils/";
import { Loader, NotificationLevel, Error } from "./common/";

const styles = {
  listItem: {
    height: 200,
    backgroundColor: "rgba(0,0,0,0.25)"
  }
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.formatNews = this.formatNews.bind(this);
    this.appStateDidChange = this.appStateDidChange.bind(this);
    this.orientationDidChange = this.orientationDidChange.bind(this);

    this.state = {
      user: null,
      news: null,
      orientation: null,
      showNotification: null,
      error: null
    };
  }

  componentWillMount() {
    this.retrieveUser();
    this.fetchNews();

    Orientation.getOrientation((err, orientation) => {
      if (err) {
        this.setState({
          showNotification: {
            message: err,
            level: NotificationLevel.err
          }
        });
      }
      this.setState({ orientation });
    });
  }

  componentDidMount() {
    AppState.addEventListener("change", this.appStateDidChange);
    Orientation.addOrientationListener(this.orientationDidChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.appStateDidChange);
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  orientationDidChange(orientation) {
    if (orientation === "PORTRAIT") {
      // Do something on rotation to PORTRAIT
      this.setState({ orientation });
    }
    else if (orientation === "LANDSCAPE") {
      // Do something on rotation to LANDSCAPE
      this.setState({ orientation });
    }
  }

  appStateDidChange(appState) {
    // Active -> Inactive / Background
    if (this.state && this.state.appState && this.state.appState === "active" && (appState === "inactive" || appState === "background")) {
      // Force PORTRAIT mode when inactive / background
      Orientation.lockToPortrait();
      this.setState({ orientation: "PORTRAIT" });
    }
    // Inactive / Background -> Active
    else if (this.state && this.state.appState && appState && appState === "active" && (this.state.appState === "inactive" || this.state.appState === "background")) {
      Orientation.unlockAllOrientations();
    }

    this.setState({ appState });
  }

  async retrieveUser() {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        this.setState({ user: JSON.parse(user) });
      }
    }
    catch (error) {
      this.setState({
        showNotification: {
          message: error,
          level: NotificationLevel.err
        },
        error
      });
    }
  }

  fetchNews() {
    return API(Config.EndPoints.news)
      .then(this.formatNews)
      .catch((error) => {
        this.setState({
          showNotification: {
            message: error.message,
            level: NotificationLevel.err
          },
          error
        });
      });
  }
  formatNews(jsonRes) {
    const news = [];

    jsonRes.data.forEach((article, i) => {
      news.push(Object.assign(article, { key: i }));
    });

    this.setState({ news });
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.state.error === null ? this.renderContent.bind(this) : this.renderError.bind(this)}
        showNotification={this.state.showNotification}
        currentPage={"home"}
        user={this.state.user} />
    );
  }

  renderContent() {
    const sliderWidth = this.state.orientation === "PORTRAIT" ? 360 : 440;
    const itemWidth = this.state.orientation === "PORTRAIT" ? 300 : 360;

    const renderListItem = rowData => (
      <View style={Object.assign({ width: itemWidth }, styles.listItem)}>
        <Text>{rowData.item.content}</Text>
      </View>
    );

    return (
      <View>
        <Text>Actualités</Text>
        <View>
          <Text>TODO : Les dernières sagas</Text>
        </View>
        <View>
          <Text>TODO : Les derniers épisodes</Text>
        </View>
        <View>
          <Text>Messages des créateurs</Text>
          { this.state.news ?
            <Carousel
              data={this.state.news}
              renderItem={renderListItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            /> :
            <Loader />
          }
        </View>
      </View>
    );
  }

  renderError() {
    return (<Error details={this.state.error} />);
  }
}

Home.PropTypes = {
  navigation: PropTypes.object
};
