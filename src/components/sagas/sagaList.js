// Lib imports
import React, { Component } from "react";
import { Text, View, SectionList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { findIndex } from "lodash";
// Project imports
import { NotificationActions } from "./../../redux/actions/";
import { NotificationLevel } from "./../../redux/constants/";
import { Loader } from "./../common/";
import { SagaListItem } from "./sagaListItem";
import { API, Config } from "./../../utils/";
import { Page } from "./../page";

class SagaListComponent extends Component {
  constructor(props) {
    super(props);

    this.formatSagas = this.formatSagas.bind(this);
  }

  componentWillMount() {
    this.fetchSagas();
  }

  fetchSagas() {
    const { showNotification } = this.props;
    return API(Config.EndPoints.saga.list)
      .then(this.formatSagas)
      .catch(err => showNotification(err.message, NotificationLevel.err));
  }

  formatSagas(sagasJson) {
    const sagasMaped = [];

    sagasJson.data.forEach((feed, i) => {
      if (feed.title && feed.title.length > 1) {
        const firstChar = feed.title.substring(0, 1);
        const sectionIndex = findIndex(
          sagasMaped,
          section => section.sectionTitle === firstChar
        );

        // If the section is already pushed, we add the feed into its data field
        if (sectionIndex !== -1) {
          sagasMaped[sectionIndex].data.push(Object.assign(feed, { key: i }));
        }
 else {
          // The section doesn't exist, so we add it and the feed aswell
          sagasMaped.push({
            sectionTitle: firstChar,
            data: [Object.assign(feed, { key: i })]
          });
        }
      }
    });

    this.setState({
      sagas: sagasJson.data,
      dataSource: sagasMaped
    });
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.renderContent.bind(this)}
      />
    );
  }

  renderContent() {
    const { dataSource } = this.state;
    const renderSagasRow = rowData => <SagaListItem details={rowData.item} />;

    const renderSagasSectionHeader = section => (
      <View>
        <Text>{section.section.sectionTitle}</Text>
      </View>
    );

    if (dataSource) {
      return (
        <SectionList
          renderItem={renderSagasRow}
          renderSectionHeader={renderSagasSectionHeader}
          sections={dataSource}
          stickySectionHeadersEnabled={true}
        />
      );
    }

    return <Loader />;
  }
}

SagaListComponent.defaultProps = {
  navigation: {},
  showNotification: () => {}
};

SagaListComponent.propTypes = {
  navigation: PropTypes.object,
  showNotification: PropTypes.func
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  showNotification: (message, level) =>
    dispatch(NotificationActions.showNotification(message, level))
});

export const SagaList = connect(mapStateToProps, mapDispatchToProps)(SagaListComponent);
export default SagaList;
