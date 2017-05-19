import React, {Component} from "react";
import {Text, View, ListView} from "react-native";

import Page from "./../page";

export default class Sagas extends Component {
    constructor(props) {
      super(props);

      const sagasDataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a != b });
      this.sagas = [{
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
      this.state = {
        dataSource: sagasDataSource.cloneWithRows(this.sagas)
      };
    }

    render() {
      return (<Page navigation={this.props.navigation} renderContent={this.renderContent.bind(this)} />);
    }

    renderContent() {
      return (
        <ListView 
          dataSource={this.state.dataSource} 
          renderRow={(rowData) => this.renderSagasRow(rowData)}
          renderSectionHeader={(props) => this.renderSagasSectionHeader(props)} />
      );
    }

    renderSagasRow(rowData) {
        return (
          <View><Text>{rowData.title}</Text></View>
        );
    }

    renderSagasSectionHeader(props) {
        return (
          <View><Text>{props.character}</Text></View>
        );
    }
}