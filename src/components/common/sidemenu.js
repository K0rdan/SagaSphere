import React, { Component } from "react";
import { AsyncStorage, ListView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Loader, NotificationLevel } from "./index";
import { API, Config, Lang } from "./../../utils/";
import { AuthActions } from "./../../redux/actions/index";

import { SideMenuStyles } from "./../../styles/";

class SideMenuComponent extends Component {
  constructor(props) {
    super(props);

    this.menus = [{
      title: Lang[Config.Lang].Menu.SagaList,
      routeName: "SagaList"
    }, {
      title: Lang[Config.Lang].Menu.News,
      routeName: "News"
    }, {
      title: Lang[Config.Lang].Menu.User.Feeds,
      routeName: "Feeds"
    }];

    this.state = {
      connecting: false,
      disconnecting: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (a, b) => a !== b }).cloneWithRows(this.menus)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (user && user !== null) {
      this.setState({ user });
    }
  }

  menuLoginOnPress() {
    const { navigation, currentPageTitle } = this.props;
    const { dispatch } = navigation;

    if (currentPageTitle !== Lang[Config.Lang].Menu.User.Login) {
      dispatch({ type: "Navigation/NAVIGATE", routeName: "Login" });
    }
  }

  async menuLogoutOnPress() {
    try {
      const { navigation } = this.props;
      this.setState({
        user: null,
        disconnecting: true
      });

      API(Config.EndPoints.logout)
        .then(async () => {
          await AsyncStorage.removeItem("user", (asyncStorageErr) => {
            if (asyncStorageErr) {
              throw asyncStorageErr;
            }
            const { dispatch } = navigation;
            this.setState({ disconnecting: false });
            dispatch({ type: AuthActions.LOGGING_OUT });
            dispatch({ type: "Navigation/NAVIGATE", routeName: "Login" });
          });
        })
        .catch(async (err) => {
          if (err && err.message === "You were not connected.") {
            await AsyncStorage.removeItem("user", (asyncStorageErr) => {
              if (asyncStorageErr) {
                throw asyncStorageErr;
              }
              this.setState({ disconnecting: false });
              navigation.navigate("Login");
            });
          }
          this.props.showNotification(err.message || err || Lang[Config.Lang].Errors.Network.Default, NotificationLevel.err);
        });
    }
    catch (err) {
      this.props.showNotification(err.message || err || Lang[Config.Lang].Errors.Network.Default, NotificationLevel.err);
    }
  }

  menuRowOnPress(data) {
    const { dispatch, state } = this.props.navigation;

    if (dispatch != null) {
      this.menus.forEach((menu) => {
        // If we found the menu in our list and we're not actually on the page.
        // Then we can navigate to it.
        if (menu.title === data.title && menu.routeName !== state.routeName) {
          dispatch({ type: "Navigation/NAVIGATE", routeName: menu.routeName });
        }
      });
    }
  }

  render() {
    if (this.state.connecting === true || this.state.disconnecting === true) {
      return <Loader />;
    }

    return (
      <SideMenuStyles.container>
          {this.renderMenuHeader()}
          {this.renderMenu()}
      </SideMenuStyles.container>
    );
  }

  renderMenuHeader() {
    const { navigate, state } = this.props.navigation;

    const onPressHome = () => {
      if (state.routeName !== "Home") {
        navigate("Home");
      }
    };

    return (
      <View>
        <TouchableOpacity style={{}} onPress={onPressHome}>
            <Icon
              name="home"
              size={40}
            />
        </TouchableOpacity>
      </View>
    );
  }

  renderMenu() {
    const { user } = this.props;
    if (user === null) {
      return (
        <SideMenuStyles.menuLogin onPress={this.menuLoginOnPress.bind(this)}>
          <Text>Sign in to access to all fonctionalities</Text>
        </SideMenuStyles.menuLogin>
      );
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => this.renderMenuRow(rowData)}
          renderSeparator={(sectionId, rowId) => this.renderMenuSeparator(sectionId, rowId)} />
        <SideMenuStyles.menuLogout onPress={this.menuLogoutOnPress.bind(this)}>
          <Text>Sign out</Text>
        </SideMenuStyles.menuLogout>
      </View>
    );
  }

  renderMenuRow(data) {
    return (
      <SideMenuStyles.menuRowContainer>
        <SideMenuStyles.menuRowButton onPress={this.menuRowOnPress.bind(this, data)}>
          <Text>{data.title}</Text>
        </SideMenuStyles.menuRowButton>
      </SideMenuStyles.menuRowContainer>
    );
  }

  renderMenuSeparator(sectionId, rowId) {
    // TMP
    this.a = 0;
    //
    return (<SideMenuStyles.menuRowSeparator key={rowId} />);
  }
}

SideMenuComponent.PropTypes = {
  currentPageTitle: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.AuthReducer.isLoggedIn,
  user: state.AuthReducer.user
});

export const SideMenu = connect(mapStateToProps)(SideMenuComponent);
export default SideMenu;
