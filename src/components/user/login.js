import React, { Component } from "react";
import { AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Page from "./../page";
import { Loader, NotificationLevel } from "./../common/";
import { API, Config, Lang } from "./../../utils/";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.title = Lang[Config.Lang].Menu.User.Login;

    this.state = {
      user: null,
      connecting: false,
      showNotification: null
    };
  }

  connect() {
    if (this.state.connecting !== true) {
      const loginHeaders = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          login: "test",
          pass: "pass"
        })
      };

      API(Config.EndPoints.login, loginHeaders)
        .then(async (jsonObj) => {
          try {
            const { navigation } = this.props;
            await AsyncStorage.setItem("user", JSON.stringify(jsonObj.data));
            this.setState({
              user: jsonObj,
              connecting: false
            });
            navigation.navigate("Home");
          }
          catch (err) {
            throw err;
          }
        })
        .catch((err) => {
          this.setState({
            connecting: false,
            showNotification: {
              message: err.message,
              level: NotificationLevel.err
            }
          });
        });

      this.setState({ connecting: true });
    }
  }

  render() {
    return (<Page
      navigation={this.props.navigation}
      renderContent={this.renderContent.bind(this)}
      showNotification={this.state.showNotification}
      currentPage={this.title}
      user={this.state.user}
    />);
  }

  renderContent() {
    if (this.state.connecting === true) {
      return <Loader />;
    }

    return (
      <View>
        <Text>{this.title}</Text>
        <TouchableOpacity onPress={this.connect.bind(this)}>
          <Text>Connexion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.PropTypes = {
  navigation: PropTypes.object
};
