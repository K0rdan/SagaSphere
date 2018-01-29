// Lib imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, AppState, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { map } from "lodash";
import Orientation from "react-native-orientation";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";
// Custom imports
import { Page } from "./page";
import { API, Config, Lang } from "./../utils/";
import { Loader, Error } from "./common/";
import { NotificationActions, AuthActions } from "./../redux/actions/";
import { NotificationLevel } from "./../redux/constants/";

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

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.formatData = this.formatData.bind(this);
    this.appStateDidChange = this.appStateDidChange.bind(this);
    this.orientationDidChange = this.orientationDidChange.bind(this);

    this.carousels = [];
    this.carouselOptions = {
      activeSlideAlignment: "start",
      apparitionDelay: 0,
      inactiveSlideOpacity: 0.25,
      inactiveSlideScale: 1,
      animationOptions: {
        duration: 300
      }
    };

    this.state = {
      latestSagas: null,
      latestSagasArrows: {
        left: false,
        right: false
      },
      latestEpisodes: null,
      latestEpisodesArrows: {
        left: false,
        right: false
      },
      news: null,
      newsArrows: {
        left: false,
        right: false
      },
      orientation: null
    };
  }

  componentWillMount() {
    const { retrieveUser, showNotification } = this.props;

    retrieveUser();
    this.fetchData();

    Orientation.getOrientation((err, orientation) => {
      if (err) {
        showNotification(err, NotificationLevel.err);
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

    this.updateCarouselArrows("latestSagas");
    this.updateCarouselArrows("latestEpisodes");
    this.updateCarouselArrows("news");
  }

  appStateDidChange(appState) {
    // Active -> Inactive / Background
    if (
      this.state &&
      this.state.appState &&
      this.state.appState === "active" &&
      (appState === "inactive" || appState === "background")
    ) {
      // Force PORTRAIT mode when inactive / background
      Orientation.lockToPortrait();
      this.setState({ orientation: "PORTRAIT" });
    }
 else if (
      this.state &&
      this.state.appState &&
      appState &&
      appState === "active" &&
      (this.state.appState === "inactive" ||
        this.state.appState === "background")
    ) {
      // Inactive / Background -> Active
      Orientation.unlockAllOrientations();
    }

    this.setState({ appState });
  }

  fetchData() {
    const { showNotification } = this.props;
    return Promise.all([
      API(Config.EndPoints.saga.latest).then(jsonRes => ({
        dataType: "latestSagas",
        data: jsonRes.data
      })),
      API(Config.EndPoints.episodes.latest).then(jsonRes => ({
        dataType: "latestEpisodes",
        data: jsonRes.data
      })),
      API(Config.EndPoints.news).then(jsonRes => ({
        dataType: "news",
        data: jsonRes.data
      }))
    ])
      .then(this.formatData)
      .catch(error =>
        showNotification(
          `One of the end point did not respond properly : '${error.message}'.`,
          NotificationLevel.err
        ));
  }

  formatData(fetchesRes) {
    const state = {
      latestSagas: [],
      latestEpisodes: [],
      news: []
    };

    map(fetchesRes, (fetchRes) => {
      const { dataType } = fetchRes;
      fetchRes.data.forEach((news, i) => {
        state[dataType].push(Object.assign(news, { key: i }));
      });
    });

    this.setState(Object.assign({}, state, {
        latestSagasArrows: {
          right: state.latestSagas.length > 1
        },
        latestEpisodesArrows: {
          right: state.latestEpisodes.length > 1
        },
        newsArrows: {
          right: state.news.length > 1
        }
      }));
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={
          this.state.error === null
            ? this.renderContent.bind(this)
            : this.renderError.bind(this)
        }
        currentPage={Lang[Config.Lang].Menu.News}
      />
    );
  }

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Text>TODO : Les dernières sagas</Text>
          {this.state.latestSagas ? (
            this.renderCarousel("latestSagas", this.state.latestSagas)
          ) : (
            <Loader />
          )}
        </View>
        <View style={styles.horizontalSeparator} />
        <View>
          <Text>TODO : Les derniers épisodes</Text>
          {this.state.latestEpisodes ? (
            this.renderCarousel("latestEpisodes", this.state.latestEpisodes)
          ) : (
            <Loader />
          )}
        </View>
        <View style={styles.horizontalSeparator} />
        <View>
          <Text>Messages des créateurs</Text>
          {this.state.news ? (
            this.renderCarousel("news", this.state.news)
          ) : (
            <Loader />
          )}
        </View>
      </View>
    );
  }

  renderError() {
    return <Error details={this.state.error} />;
  }

  renderCarousel(type, data) {
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

      if (this.state[`${type}Arrows`][direction]) {
        return (
          <TouchableOpacity
            style={containerStyle}
            onPress={this.onArrowPush.bind(this, type, direction)}
          >
            <Icon name={`chevron-${direction}`} size={24} />
          </TouchableOpacity>
        );
      }

      return null;
    };

    return (
      <View>
        {renderListItemArrow("left")}
        <Carousel
          ref={(c) => {
            this.carousels[type] = c;
          }}
          data={data}
          renderItem={renderListItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          // All common carousel options
          {...this.carouselOptions}
          // Event handlers
          onSnapToItem={this.updateCarouselArrows.bind(this, type)}
        />
        {renderListItemArrow("right")}
      </View>
    );
  }

  updateCarouselArrows(carousel) {
    if (this.state[carousel] !== null && this.state[carousel].length > 1) {
      const { currentIndex } = this.carousels[carousel];

      if (currentIndex === 0) {
        // First item case -> Show right arrow
        this.setState({
          [`${carousel}Arrows`]: {
            left: false,
            right: true
          }
        });
      }
 else if (
        currentIndex >= 0 &&
        currentIndex < this.state[carousel].length - 1
      ) {
        // Middle item case -> Show left and right arrow
        this.setState({
          [`${carousel}Arrows`]: {
            left: true,
            right: true
          }
        });
      }
 else {
        // Last item case -> Show left arrow
        this.setState({
          [`${carousel}Arrows`]: {
            left: true,
            right: false
          }
        });
      }
    }
  }

  onArrowPush(carousel, direction) {
    if (direction === "right") {
      this.carousels[carousel].snapToNext();
    }
 else if (direction === "left") {
      this.carousels[carousel].snapToPrev();
    }
  }
}

HomeComponent.defaultProps = {
  isLoggedIn: false,
  user: {},
  showNotification: () => {},
  retrieveUser: () => {}
};

HomeComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  showNotification: PropTypes.func,
  retrieveUser: PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: state.AuthReducer.isLoggedIn,
  user: state.AuthReducer.user
});

const mapDispatchToProps = dispatch => ({
  showNotification: (message, level) =>
    dispatch(NotificationActions.showNotification(message, level)),
  retrieveUser: () => dispatch(AuthActions.retrieveUser())
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default Home;
