import React, { Component } from "react";
import { Image, Text, View, SectionList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { findIndex, map } from "lodash";
import { Loader, NotificationLevel } from "./../common/";
import { API, Config } from "./../../utils/";
import Page from "./../page";

const styles = {
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
    marginVertical: 5,
    marginLeft: 5,
    marginRight: 2.5,
    flex: 0.1
  },
  feedSectionItemIcon: {
    width: 40,
    height: 40,
    borderColor: "red",
    borderWidth: 2
  },
  feedSectionItemTitleContainer: {
    flex: 0.8,
    marginHorizontal: 2.5,
    marginVertical: 5,
    borderColor: "red",
    borderWidth: 2
  },
  feedSectionItemPlayButton: {
    marginHorizontal: 2.5,
    marginVertical: 5,
    flex: 0.1,
    borderColor: "red",
    borderWidth: 2
  }
};

export class Feeds extends Component {
    constructor(props) {
      super(props);

      this.formatFeeds = this.formatFeeds.bind(this);
      this.imageLoaders = [];
      this.state = {
        dataSource: null,
        sagas: null,
        showNotification: null,
        user: this.props.navigation.state.params.user || null
      };
    }

    componentWillMount() {
      this.fetchFeeds();
    }

    fetchFeeds() {
      return API(Config.EndPoints.user.feeds)
        .then(this.formatFeeds)
        .catch((err) => {
          this.setState({
            showNotification: {
              message: err.message,
              level: NotificationLevel.err
            }
          });
        });
    }

    formatFeeds(feedsJson) {
      const feedsMaped = [];

      feedsJson.data.forEach((feed, i) => {
        if (feed.title && feed.title.length > 1) {
          const firstChar = feed.title.substring(0, 1);
          const sectionIndex = findIndex(feedsMaped, section => section.sectionTitle === firstChar);

          // If the section is already pushed, we add the feed into its data field
          if (sectionIndex !== -1) {
            feedsMaped[sectionIndex].data.push(Object.assign(feed, { key: i }));
          }
          // The section doesn't exist, so we add it and the feed aswell
          else {
            feedsMaped.push({ sectionTitle: firstChar, data: [Object.assign(feed, { key: i })] });
          }
        }
      });

      this.setState({
        sagas: feedsJson.data,
        dataSource: feedsMaped
      });
    }

    render() {
      return (<Page
        navigation={this.props.navigation}
        renderContent={this.renderContent.bind(this)}
        showNotification={this.state.showNotification}
        user={this.state.user}
      />);
    }

    renderContent() {
      const renderFeedsSectionHeader = section => (
        <View style={styles.feedSectionHeaderContainer}>
          <Text style={styles.feedSectionHeaderText}>
            {section.section.sectionTitle}
          </Text>
        </View>
      );

      const renderFeedsSectionItem = rowData => (
        <View style={styles.feedSectionItemContainer}>
          <View style={styles.feedSectionItemIconContainer}>
            { this.renderFeedsSectionItemIcon(rowData) }
          </View>
          <View style={styles.feedSectionItemTitleContainer}>
            <Text style={{ height: "100%" }}>
              {rowData.item.title}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.feedSectionItemPlayButton}
            onPress={null}
          >
            <Icon
              name="play-arrow"
              size={40}
            />
          </TouchableOpacity>
        </View>
      );

      if (this.state && this.state.dataSource) {
        return (
          <SectionList
            renderItem={renderFeedsSectionItem}
            renderSectionHeader={renderFeedsSectionHeader}
            sections={this.state.dataSource}
            stickySectionHeadersEnabled={true}
          />
        );
      }

      return <Loader />;
    }

    renderFeedsSectionItemIcon(rowData) {
      return (
        <View style={{ position: "relative" }}>
          { rowData.item.imageLoadingState === "start" ?
              <Loader style={{ position: "absolute" }}/> :
              null
          }
          { rowData.item.imageLoadingState !== "timeout" ?
              <Image
                source={{ uri: rowData.item.image }}
                resizeMode="contain"
                style={styles.feedSectionItemIcon}
                onLoadStart={() => this.imageLoadingHandler(rowData.item, "start")}
                onLoadEnd={() => this.imageLoadingHandler(rowData.item, "end")}
              /> :
              <Icon name="queue-music" size={40} />
          }
        </View>
      );
    }

    imageLoadingHandler(rowDataItem, loadState) {
      this.updateDatasourceLoadingState(rowDataItem, loadState);
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
      }
      // Clear the timeout when we "end" loading
      else {
        clearTimeout(this.imageLoaders[rowDataItem.id].timeoutID);
      }
    }
}

Feeds.PropTypes = {
  navigation: PropTypes.object
};

export default Feeds;
