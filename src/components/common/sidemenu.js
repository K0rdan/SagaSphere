// Lib imports
import React, { Component } from "react";
import { AsyncStorage, ListView, Text, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Project imports
import { Loader } from "./index";
import { API, Config, Lang } from "./../../utils/";
import { AuthActions, NotificationActions } from "./../../redux/actions/";
import { NotificationLevel } from "./../../redux/constants/";
// Styles imports
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
    const { navigation, showNotification } = this.props;
    try {
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
          showNotification(err.message || err || Lang[Config.Lang].Errors.Network.Default, NotificationLevel.err);
        });
    }
    catch (err) {
      showNotification(err.message || err || Lang[Config.Lang].Errors.Network.Default, NotificationLevel.err);
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
        {this.renderMenu()}
        {this.renderMenuFooter()}
      </SideMenuStyles.container>
    );
  }

  renderMenuFooter() {
    return (
      <View></View>
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

SideMenuComponent.defaultProps = {
  user: {}
};

SideMenuComponent.propTypes = {
  currentPageTitle: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isLoggedIn: state.AuthReducer.isLoggedIn,
  user: state.AuthReducer.user
});

const mapDispatchToProps = () => ({
  showNotification: NotificationActions.showNotification
});

export const SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenuComponent);
export default SideMenu;
