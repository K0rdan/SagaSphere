// Lib imports
import React, { Component } from "react";
import { Image, Text, View, SectionList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { findIndex, map } from "lodash";
import moment from "moment";
// Project immports
import { NotificationActions, AuthActions } from "./../../redux/actions/";
import { NotificationLevel } from "./../../redux/constants/";
import { Loader } from "./../common/";
import { API, Config, Lang } from "./../../utils/";
import { Page } from "./../page";

const styles = {
  container: {
    flex: 1
  },
  feedSectionHeaderContainer: {
    height: 28,
    backgroundColor: "green"
  },
  feedSectionHeaderText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  feedSectionItemContainer: {
    height: 50,
    backgroundColor: "rgb(100,100,100)",
    alignItems: "center",
    flexDirection: "row"
  },
  feedSectionItemIconContainer: {
    flex: 0.15,
    marginVertical: 5,
    marginLeft: 5,
    marginRight: 2.5,
    alignItems: "center"
  },
  feedSectionItemIcon: {
    width: 40,
    height: 40
  },
  feedSectionItemTitleContainer: {
    flex: 0.7,
    height: "100%",
    padding: 5
  },
  feedSectionItemTitle: {
    fontFamily: "Roboto-Black",
    fontSize: 16
  },
  feedSectionItemTracks: {
    marginTop: 2,
    fontSize: 11,
    fontStyle: "italic"
  },
  feedSectionItemYear: {
    marginTop: 0,
    marginLeft: 2,
    fontFamily: "Roboto-Italic",
    fontSize: 12
  },
  feedSectionItemPlayButton: {
    flex: 0.15,
    marginVertical: 5,
    marginLeft: 2.5,
    marginRight: 5,
    alignItems: "center"
  }
};

class FeedsComponent extends Component {
  constructor(props) {
    super(props);

    this.formatFeeds = this.formatFeeds.bind(this);
    this.imageLoaders = [];
    this.state = {
      dataSource: null,
      sagas: null
    };
  }

  componentWillMount() {
    this.fetchFeeds();
  }

  fetchFeeds() {
    const { logout, showNotification } = this.props;
    return API(Config.EndPoints.user.feeds)
      .then(this.formatFeeds)
      .catch((err) => {
        if (err.status && err.status === 401) {
          logout();
        }
        showNotification(err.message, NotificationLevel.err);
      });
  }

  formatFeeds({ data }) {
    const feedsMaped = [];
    data.forEach((feed, i) => {
      if (feed.title && feed.title.length > 1) {
        const firstChar = feed.title.substring(0, 1);
        const sectionIndex = findIndex(
          feedsMaped,
          section => section.sectionTitle === firstChar
        );

        // If the section is already pushed, we add the feed into its data field
        if (sectionIndex !== -1) {
          feedsMaped[sectionIndex].data.push(Object.assign(feed, { key: i }));
        } else {
          // The section doesn't exist, so we add it and the feed aswell
          feedsMaped.push({
            sectionTitle: firstChar,
            data: [Object.assign(feed, { key: i })]
          });
        }
      }
    });

    this.setState({
      sagas: data,
      dataSource: feedsMaped
    });
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.renderContent.bind(this)}
        currentPage={Lang[Config.Lang].Menu.User.Feeds}
      />
    );
  }

  renderContent() {
    const { dispatch } = this.props.navigation;
    const { dataSource } = this.state;

    const renderFeedsSectionHeader = section => (
      <View style={styles.feedSectionHeaderContainer}>
        <Text style={styles.feedSectionHeaderText}>
          {section.section.sectionTitle}
        </Text>
      </View>
    );

    const renderFeedsSectionItem = (rowData) => {
      const duration = moment.duration(rowData.item.duration, "seconds");
      return (
        <View style={styles.feedSectionItemContainer}>
          <View style={styles.feedSectionItemIconContainer}>
            {this.renderFeedsSectionItemIcon(rowData)}
          </View>
          <TouchableOpacity
            style={styles.feedSectionItemTitleContainer}
            onPress={() => {
              dispatch({
                type: "Navigation/NAVIGATE",
                routeName: "SagaDetails",
                routeParams: {
                  saga: rowData.item,
                  showSummary: false,
                  showAuthor: false,
                  showEpisodes: true
                }
              });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.feedSectionItemTitle}>
                {rowData.item.title}
              </Text>
              <Text style={styles.feedSectionItemYear}>
                ({new Date(rowData.item.creation).getFullYear()})
              </Text>
            </View>
            {rowData.item.tracks !== null ? (
              <Text style={styles.feedSectionItemTracks}>
                {`${rowData.item.tracks} ${
                  Lang[Config.Lang].Miscellaneous.Tracks
                }, ${Lang[Config.Lang].Miscellaneous.Duration} : ${
                  duration.days() > 0
                    ? `${duration.days()}${Lang[Config.Lang].Units.DayShort} `
                    : ""
                }${
                  duration.hours() > 0
                    ? `${duration.hours()}${Lang[Config.Lang].Units.HourShort} `
                    : ""
                }${
                  duration.minutes() > 0
                    ? `${duration.minutes()}${
                        Lang[Config.Lang].Units.MinuteShort
                      } `
                    : ""
                }${
                  duration.seconds() > 0
                    ? `${duration.seconds()}${
                        Lang[Config.Lang].Units.SecondShort
                      }`
                    : ""
                }`}
              </Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.feedSectionItemPlayButton}
            onPress={null}
          >
            <Icon name="play-arrow" size={36} />
          </TouchableOpacity>
        </View>
      );
    };

    if (dataSource) {
      return (
        <View style={styles.container}>
          <SectionList
            renderItem={renderFeedsSectionItem}
            renderSectionHeader={renderFeedsSectionHeader}
            sections={dataSource}
            stickySectionHeadersEnabled={true}
          />
        </View>
      );
    }

    return <Loader style={{ backgroundColor: "transparent" }} />;
  }

  renderFeedsSectionItemIcon({ item }) {
    return (
      <View style={{ flex: 1 }}>
        {item.imageLoadingState === "start" ? (
          <Loader size={90} style={{ backgroundColor: "transparent" }} />
        ) : null}
        {item.imageLoadingState !== "timeout" ? (
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={styles.feedSectionItemIcon}
            onLoadStart={() => this.imageLoadingHandler(item, "start")}
            onLoadEnd={() => this.imageLoadingHandler(item, "end")}
          />
        ) : (
          <Icon
            name="queue-music"
            size={40}
            style={styles.feedSectionItemIcon}
          />
        )}
      </View>
    );
  }

  imageLoadingHandler(rowDataItem, loadState) {
    const { dataSource } = this.state;
    map(dataSource, (section, sectionIndex) => {
      const sagaIndex = findIndex(section.data, saga => rowDataItem === saga);
      if (sagaIndex !== -1) {
        dataSource[sectionIndex].data[sagaIndex].imageLoadingState = loadState;
        this.setState({ dataSource });
      }
    });

    // Init 'setTimeout' when we 'start' loading an image
    if (loadState === "start") {
      this.imageLoaders[rowDataItem.id] = {
        timeoutID: setTimeout(
          this.imageLoadingHandler.bind(this),
          Config.Network.timeout,
          rowDataItem,
          "timeout"
        )
      };
    } else {
      // Clear the timeout when we "end" loading
      clearTimeout(this.imageLoaders[rowDataItem.id].timeoutID);
    }
  }
}

FeedsComponent.defaultProps = {
  navigation: {},
  showNotification: () => {}
};

FeedsComponent.propTypes = {
  navigation: PropTypes.object,
  showNotification: PropTypes.func
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(AuthActions.logout()),
  showNotification: (message, level) =>
    dispatch(NotificationActions.showNotification(message, level))
});

export const Feeds = connect(mapStateToProps, mapDispatchToProps)(FeedsComponent);
export default Feeds;
