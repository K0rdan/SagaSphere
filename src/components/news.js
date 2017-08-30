import React, { Component } from "react";
import { Text, View, ListView } from "react-native";
import PropTypes from "prop-types";
import { Loader, NotificationLevel } from "./common/";
import { API, Config } from "./../utils/";
import Page from "./page";

export default class News extends Component {
    constructor(props) {
      super(props);

      this.formatNews = this.formatNews.bind(this);

      this.state = {
        user: this.props.navigation.state.params.user || null,
        showNotification: null
      };
    }

    componentWillMount() {
      this.fetchNews();
    }

    fetchNews() {
      return API(Config.EndPoints.news)
        .then(this.formatNews)
        .catch((err) => {
          this.setState({
            showNotification: {
              message: err.message,
              level: NotificationLevel.err
            }
          });
        });
    }

    formatNews(newsJson) {
      const newsDataSource = new ListView.DataSource({
        rowHasChanged: (a, b) => a !== b
      });
      const newsMaped = [];

      newsJson.data.forEach((article) => {
        newsMaped.push(article);
      });

      this.setState({
        news: newsJson.data,
        dataSource: newsDataSource.cloneWithRows(newsMaped)
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

      if (this.state && this.state.dataSource) {
        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={renderSagasRow} />
          );
      }

      return <Loader />;
    }
}

News.PropTypes = {
  navigation: PropTypes.object
};
