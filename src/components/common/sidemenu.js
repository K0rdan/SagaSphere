import React, { Component } from "react";
import { AsyncStorage, ListView, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Loader, NotificationLevel } from "./index";
import { API, Config, Lang } from "./../../utils/";

import { SideMenuStyles } from "./../../styles/";

export class SideMenu extends Component {
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
      user: this.props.user || null,
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
    const { navigate } = navigation;

    if (currentPageTitle !== Lang[Config.Lang].Menu.User.Login) {
      navigate("Login");
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
            this.setState({ disconnecting: false });
            navigation.navigate("Login");
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
    const { navigate, state } = this.props.navigation;

    if (navigate != null) {
      this.menus.forEach((menu) => {
        // If we found the menu in our list and we're not actually on the page.
        // Then we can navigate to it.
        if (menu.title === data.title && menu.routeName !== state.routeName) {
          navigate(menu.routeName, { user: this.state.user });
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
      if
      (state.routeName !== "Home") {
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
    if (this.state.user === null) {
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

SideMenu.PropTypes = {
  currentPageTitle: PropTypes.string,
  drawer: PropTypes.element,
  navigation: PropTypes.object,
  showNotification: PropTypes.func,
  user: PropTypes.object
};

export default SideMenu;
