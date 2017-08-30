import React, { Component } from "react";
import { Text, View, ListView } from "react-native";
import PropTypes from "prop-types";
import { Loader, NotificationLevel } from "./common/";
import { API, Config } from "./../utils/";
import Page from "./page";

export default class Sagas extends Component {
    constructor(props) {
      super(props);

      this.formatSagas = this.formatSagas.bind(this);

      this.state = {
        user: this.props.navigation.state.params.user || null,
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
      const sagasDataSource = new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
      const sagasMaped = [];

      sagasJson.data.forEach((saga) => {
        if (saga.title && saga.title.length > 1) {
          const firstChar = saga.title.substring(0, 1);
          if (!sagasMaped[firstChar]) {
            sagasMaped[firstChar] = [];
          }
          sagasMaped[firstChar].push(saga);
        }
      });

      this.setState({
        sagas: sagasJson.data,
        dataSource: sagasDataSource.cloneWithRowsAndSections(sagasMaped)
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
      const renderSagasRow = rowData => (
        <View><Text>{rowData.title}</Text></View>
      );

      const renderSagasSectionHeader = (saga, category) => (
        <View><Text>{category}</Text></View>
      );

      if (this.state && this.state.dataSource) {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={renderSagasRow}
            renderSectionHeader={renderSagasSectionHeader} />
          );
      }

      return <Loader />;
    }
}

Sagas.PropTypes = {
  navigation: PropTypes.object
};
