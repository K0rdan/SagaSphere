// Lib imports
import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Project imports
import { NotificationActions } from "./../redux/actions/";
import { NotificationLevel } from "./../redux/constants/";
import { Loader } from "./common/";
import { API, Config } from "./../utils/";
import { Page } from "./page";

class NewsComponent extends Component {
  constructor(props) {
    super(props);

    this.formatNews = this.formatNews.bind(this);

    this.state = {
      user: this.props.navigation.state.params.user || null
    };
  }

  componentWillMount() {
    this.fetchNews();
  }

  fetchNews() {
    const { showNotification } = this.props;
    return API(Config.EndPoints.news)
      .then(this.formatNews)
      .catch(err => showNotification(err.message, NotificationLevel.err));
  }

  formatNews(newsJson) {
    const newsMaped = [];

    newsJson.data.forEach((article, i) => {
      newsMaped.push(Object.assign(article, { key: i }));
    });

    this.setState({
      news: newsJson.data,
      dataSource: newsMaped
    });
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.renderContent.bind(this)}
        user={this.state.user}
      />
    );
  }

  renderContent() {
    const renderSagasRow = rowData => (
      <View>
        <Text>{rowData.item.title}</Text>
      </View>
    );

    if (this.state && this.state.dataSource) {
      return (
        <FlatList data={this.state.dataSource} renderItem={renderSagasRow} />
      );
    }

    return <Loader />;
  }
}

NewsComponent.defaultProps = {
  navigation: {}
};

NewsComponent.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  showNotification: (message, level) =>
    dispatch(NotificationActions.showNotification(message, level))
});

export const News = connect(mapStateToProps, mapDispatchToProps)(NewsComponent);
export default News;
