// Lib imports
import React, { Component } from "react";
import { AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Project imports
import { AuthActions, NotificationActions } from "./../../redux/actions/";
import { NotificationLevel } from "./../../redux/constants/";
import { Page } from "./../page";
import { Loader } from "./../common/";
import { API, Config, Lang } from "./../../utils/";

const styles = {
  container: {
    flex: 1
  }
};

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.title = Lang[Config.Lang].Menu.User.Login;

    this.state = {
      user: null,
      connecting: false
    };
  }

  connect() {
    if (this.state.connecting !== true) {
      const { showNotification, navigation: { dispatch } } = this.props;
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
            connecting: false
          });
          showNotification(err.message, NotificationLevel.err);
        });

      this.setState({ connecting: true });
    }
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        renderContent={this.renderContent.bind(this)}
        currentPage={this.title}
      />
    );
  }

  renderContent() {
    if (this.state.connecting === true) {
      return <Loader />;
    }

    return (
      <View style={styles.container}>
        <Text>{this.title}</Text>
        <TouchableOpacity onPress={this.connect.bind(this)}>
          <Text>Connexion</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginComponent.defaultProps = {
  navigation: {},
  isLoggedIn: false,
  user: null,
  showNotification: () => {}
};

LoginComponent.propTypes = {
  navigation: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  showNotification: PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: state.AuthReducer.isLoggedIn,
  user: state.AuthReducer.user
});

const mapDispatchToProps = dispatch => ({
  showNotification: (message, level) =>
    dispatch(NotificationActions.showNotification(message, level))
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;
