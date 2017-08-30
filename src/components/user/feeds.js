import React, { Component } from "react";
import { Text, View, SectionList } from "react-native";
import PropTypes from "prop-types";
import { findIndex } from "lodash";
import { Loader, NotificationLevel } from "./../common/";
import { API, Config } from "./../../utils/";
import Page from "./../page";

export class Feeds extends Component {
    constructor(props) {
      super(props);

      this.formatFeeds = this.formatFeeds.bind(this);

      this.state = {
        user: this.props.navigation.state.params.user || null,
        showNotification: null
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
      const renderFeedsRow = rowData => (
        <View><Text>{rowData.item.title}</Text></View>
      );

      const renderFeedsSectionHeader = section => (
        <View><Text>{section.section.sectionTitle}</Text></View>
      );

      if (this.state && this.state.dataSource) {
        return (
          <SectionList
            renderItem={renderFeedsRow}
            renderSectionHeader={renderFeedsSectionHeader}
            sections={this.state.dataSource}
            stickySectionHeadersEnabled={true}
          />
        );
      }

      return <Loader />;
    }
}

Feeds.PropTypes = {
  navigation: PropTypes.object
};

export default Feeds;
