import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, ListView } from "react-native";

import Page from "./../page";

export default class Sagas extends Component {
    constructor(props) {
      super(props);

      const sagasDataSource = new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      const sagas = [{
        title: "Donjon de Naheulbeuk",
        image: "http://static.sagasphere.com/sagas/images/ddn.png",
        author: "Pen Of Chaos",
        url: "http://penofchaos.com/donjon/",
        followers: 0,
        tracks: [
          {
            name: "Episode 1",
            playlistIDs: [1],
            trackID: 1
          }
        ]
      }];

      // Prepare data for the ListView
      const sagasMaped = [];
      sagas.forEach((saga) => {
        if (saga.title && saga.title.length > 1) {
          const firstChar = saga.title.substring(0, 1);
          if (!sagasMaped[firstChar]) {
            sagasMaped[firstChar] = [];
          }
          sagasMaped[firstChar].push(saga);
        }
      });

      this.state = {
        sagas,
        dataSource: sagasDataSource.cloneWithRowsAndSections(sagasMaped)
      };
    }

    render() {
      return (<Page navigation={this.props.navigation} renderContent={this.renderContent.bind(this)} />);
    }

    renderContent() {
      const renderSagasRow = rowData => (
        <View><Text>{rowData.title}</Text></View>
      );

      const renderSagasSectionHeader = (saga, category) => (
        <View><Text>{category}</Text></View>
      );

      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={renderSagasRow}
          renderSectionHeader={renderSagasSectionHeader} />
      );
    }
}

Sagas.PropTypes = {
  navigation: PropTypes.object
};
