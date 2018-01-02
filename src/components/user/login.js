import React, { Component } from "react";
import { AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Page from "./../page";
import { Loader, NotificationLevel } from "./../common/";
import { API, Config, Lang } from "./../../utils/";
import { AuthActions } from "../../redux/actions/index";

class LoginComponent extends Component {
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
            const { dispatch } = this.props.navigation;
            await AsyncStorage.setItem("user", JSON.stringify(jsonObj.data));
            this.setState({
              user: jsonObj,
              connecting: false
            });
            dispatch({ type: AuthActions.LOGGED_IN, user: jsonObj });
            dispatch({ type: "Navigation/NAVIGATE", routeName: "Home" });
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

LoginComponent.PropTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => ({
  isLoggedIn: state.AuthReducer.isLoggedIn,
  user: state.AuthReducer.user
});

const mapDispatchToProps = dispatch => ({ dispatch });

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;
