import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, Text, View, FlatList, Animated } from "react-native";
import Page from "./page";
import { API, Config } from "./../utils/";
import { Loader, NotificationLevel, Error } from "./common/";

const styles = {
  listItem: {
    width: 350,
    height: 200,
    backgroundColor: "rgba(0,0,0,0.25)"
  }
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.formatNews = this.formatNews.bind(this);

    this.state = {
      user: null,
      news: null,
      showNotification: null,
      error: null
    };
  }

  componentWillMount() {
    this.retrieveUser();
    this.fetchNews();
  }

  async retrieveUser() {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        this.setState({ user: JSON.parse(user) });
      }
    }
    catch (error) {
      this.setState({
        showNotification: {
          message: error,
          level: NotificationLevel.err
        },
        error
      });
    }
  }

  fetchNews() {
    return API(Config.EndPoints.news)
      .then(this.formatNews)
      .catch((error) => {
        this.setState({
          showNotification: {
            message: error.message,
            level: NotificationLevel.err
          },
          error
        });
      });
  }
  formatNews(jsonRes) {
    const news = [];

    jsonRes.data.forEach((article, i) => {
      news.push(Object.assign(article, { key: i }));
    });

    this.setState({ news });
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.state.error === null ? this.renderContent.bind(this) : this.renderError.bind(this)}
        showNotification={this.state.showNotification}
        currentPage={"home"}
        user={this.state.user} />
    );
  }

  renderContent() {
    const renderListItem = rowData => (
      <View style={styles.listItem}>
        <Text>{rowData.item.content}</Text>
      </View>
    );

    return (
      <View>
        <Text>Actualités</Text>
        <View>
          <Text>TODO : Les dernières sagas</Text>
        </View>
        <View>
          <Text>TODO : Les derniers épisodes</Text>
        </View>
        <View>
          <Text>Messages des créateurs</Text>
          { this.state.news ?
            <FlatList
              horizontal={true}
              data={this.state.news}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: new Animated.Value(0) } } }],
                { useNativeDriver: true }
              )}
              renderItem={renderListItem} /> :
            <Loader />
          }
        </View>
      </View>
    );
  }

  renderError() {
    return (<Error details={this.state.error} />);
  }
}

Home.PropTypes = {
  navigation: PropTypes.object
};
