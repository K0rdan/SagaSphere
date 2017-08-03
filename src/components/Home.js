import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, Text, View } from "react-native";
import Page from "./page";
import { NotificationLevel } from "./common/";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentWillMount() {
    this.retrieveUser();
  }

  async retrieveUser() {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        this.setState({ user: JSON.parse(user) });
      }
    }
    catch (err) {
      if (this.props.showNotification) {
        this.props.showNotification(err, NotificationLevel.err);
      }
    }
  }

  render() {
    const renderContent = () => (
      <View><Text>Home</Text></View>
    );

    return (
      <Page navigation={this.props.navigation} renderContent={renderContent} currentPage={"home"} user={this.state.user} />
    );
  }
}

Home.PropTypes = {
  navigation: PropTypes.object
};
