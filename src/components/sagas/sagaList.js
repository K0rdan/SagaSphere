import React, { Component } from "react";
import { Text, View, SectionList } from "react-native";
import PropTypes from "prop-types";
import { findIndex } from "lodash";
import { Loader, NotificationLevel } from "./../common/";
import { SagaListItem } from "./sagaListItem";
import { API, Config } from "./../../utils/";
import Page from "./../page";

export class SagaList extends Component {
    constructor(props) {
      super(props);

      this.formatSagas = this.formatSagas.bind(this);

      this.state = {
        showNotification: null
      };
    }

    componentWillMount() {
      this.fetchSagas();
    }

    fetchSagas() {
      return API(Config.EndPoints.saga.list)
        .then(this.formatSagas)
        .catch((err) => {
          this.setState({
            showNotification: {
              message: err.message,
              level: NotificationLevel.err
            }
          });
        });
    }

    formatSagas(sagasJson) {
      const sagasMaped = [];

      sagasJson.data.forEach((feed, i) => {
        if (feed.title && feed.title.length > 1) {
          const firstChar = feed.title.substring(0, 1);
          const sectionIndex = findIndex(sagasMaped, section => section.sectionTitle === firstChar);

          // If the section is already pushed, we add the feed into its data field
          if (sectionIndex !== -1) {
            sagasMaped[sectionIndex].data.push(Object.assign(feed, { key: i }));
          }
          // The section doesn't exist, so we add it and the feed aswell
          else {
            sagasMaped.push({ sectionTitle: firstChar, data: [Object.assign(feed, { key: i })] });
          }
        }
      });

      this.setState({
        sagas: sagasJson.data,
        dataSource: sagasMaped
      });
    }

    render() {
      return (<Page
        navigation={this.props.navigation}
        renderContent={this.renderContent.bind(this)}
        showNotification={this.state.showNotification}
      />);
    }

    renderContent() {
      const renderSagasRow = rowData => (
        <SagaListItem details={rowData.item} />
      );

      const renderSagasSectionHeader = section => (
        <View><Text>{section.section.sectionTitle}</Text></View>
      );

      if (this.state && this.state.dataSource) {
        return (
          <SectionList
            renderItem={renderSagasRow}
            renderSectionHeader={renderSagasSectionHeader}
            sections={this.state.dataSource}
            stickySectionHeadersEnabled={true}
          />
        );
      }

      return <Loader />;
    }
}

SagaList.PropTypes = {
  navigation: PropTypes.object
};

export default SagaList;
