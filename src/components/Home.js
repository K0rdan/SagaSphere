import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, Text, View, AppState, TouchableOpacity } from "react-native";
import Orientation from "react-native-orientation";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";
import Page from "./page";
import { API, Config, Lang } from "./../utils/";
import { Loader, NotificationLevel, Error } from "./common/";

const styles = {
  horizontalSeparator: {
    width: "90%",
    height: 0,
    marginTop: 5,
    marginLeft: "5%",
    marginBottom: 5,
    borderColor: "rgb(150, 150, 150)",
    borderStyle: "solid",
    borderWidth: 0.5
  },
  listItem: {
    height: 150
  },
  listItemContainer: {
    height: "90%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.25)"
  },
  listItemArrow: {
    position: "absolute",
    top: "50%",
    left: 5,
    marginTop: -20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderColor: "rgb(100, 100, 100)",
    borderWidth: 2,
    backgroundColor: "rgb(200, 200, 200)",
    elevation: 4,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowColor: "red",
    shadowOffset: { height: 10, width: 10 },
    zIndex: 100
  }
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.formatNews = this.formatNews.bind(this);
    this.appStateDidChange = this.appStateDidChange.bind(this);
    this.orientationDidChange = this.orientationDidChange.bind(this);

    this.carouselOptions = {
      activeSlideAlignment: "start",
      inactiveSlideOpacity: 0.25,
      inactiveSlideScale: 1,
      animationOptions: {
        duration: 300
      }
    };

    this.state = {
      user: null,
      news: null,
      newsArrows: {
        left: false,
        right: false
      },
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

    this.setState({
      news,
      newsArrows: {
        right: news.length > 1
      }
    });
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.state.error === null ? this.renderContent.bind(this) : this.renderError.bind(this)}
        showNotification={this.state.showNotification}
        currentPage={Lang[Config.Lang].Menu.News}
        user={this.state.user} />
    );
  }

  renderContent() {
    return (
      <View>
        <View>
          <Text>TODO : Les dernières sagas</Text>
        </View>
        <View style={styles.horizontalSeparator} />
        <View>
          <Text>TODO : Les derniers épisodes</Text>
        </View>
        <View style={styles.horizontalSeparator} />
        <View>
          <Text>Messages des créateurs</Text>
          { this.state.news ? this.renderCarousel(this.state.news) : <Loader /> }
        </View>
      </View>
    );
  }

  renderError() {
    return (<Error details={this.state.error} />);
  }

  renderCarousel(data) {
    const sliderWidth = this.state.orientation === "PORTRAIT" ? 360 : 440;
    const itemWidth = this.state.orientation === "PORTRAIT" ? 300 : 360;
    const itemHeight = styles.listItem.height;

    const renderListItem = rowData => (
      <View style={Object.assign({ width: itemWidth }, styles.listItem)}>
        <View style={styles.listItemContainer}>
          <Text>{rowData.item.content}</Text>
        </View>
      </View>
    );

    const renderListItemArrow = (direction) => {
      const containerStyle = Object.assign({}, styles.listItemArrow);
      if (direction === "right") {
        containerStyle.right = 5;
        delete containerStyle.left;
      }

      return (
        <TouchableOpacity style={containerStyle} onPress={this.onNewsArrowPush.bind(this, direction)}>
          <Icon
            name={`chevron-${direction}`}
            size={24}
          />
        </TouchableOpacity>
      );
    };
    console.log(this.state.newsArrows);
    return (
      <View>
        { this.state.newsArrows.left ? renderListItemArrow("left") : null }
        <Carousel
          ref={(c) => {
            this.carousel = c;
          }}
          data={data}
          renderItem={renderListItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          // All common carousel options
          {...this.carouselOptions}
          // TMP : Need a setTimeout around 'onSnapToItem' ?
          onSnapToItem={this.onSnapToItem.bind(this)}
        />
        { this.state.newsArrows.right ? renderListItemArrow("right") : null }
      </View>
    );
  }

  onSnapToItem() {
    if (this.state.news.length > 1) {
      const { currentIndex } = this.carousel;
      console.log(currentIndex);
      if (currentIndex === 0) {
        // First item case -> Show right arrow
        this.setState({
          newsArrows: {
            left: false,
            right: true
          }
        });
      }
      else if (currentIndex >= 0 && currentIndex < (this.state.news.length - 1)) {
        // Middle item case -> Show left and right arrow
        this.setState({
          newsArrows: {
            left: true,
            right: true
          }
        });
      }
      else {
        // Last item case -> Show left arrow
        this.setState({
          newsArrows: {
            left: true,
            right: false
          }
        });
      }
    }
  }

  onNewsArrowPush(direction) {
    if (direction === "right") {
      this.carousel.snapToNext();
    }
    else if (direction === "left") {
      this.carousel.snapToPrev();
    }
  }
}

Home.PropTypes = {
  navigation: PropTypes.object
};
