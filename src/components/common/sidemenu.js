import React, { Component } from "react";
import { ListView, Text } from "react-native";
import PropTypes from "prop-types";
import { Loader } from "./index";
import { Config, Lang } from "./../../utils/";

import { SideMenuStyles } from "./../../styles/";

export class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.menus = [{
      title: Lang[Config.Lang].Menu.User.Sagas,
      routeName: "UserSagas"
    }];

    this.state = {
      user: this.props.user || null,
      connecting: false,
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

  menuRowOnPress(data) {
    const { navigate, state } = this.props.navigation;

    if (navigate != null) {
      this.menus.forEach((menu) => {
        // If we found the menu in our list and we're not actually on the page.
        // Then we can navigate to it.
        if (menu.title === data.title && menu.routeName !== state.routeName) {
          navigate(menu.routeName);
        }
      });
    }
  }

  render() {
    if (this.state.connecting === true) {
      return <Loader />;
    }

    return (
      <SideMenuStyles.container>
          <Text>I'm in the Drawer!</Text>
          {this.renderMenu()}
      </SideMenuStyles.container>
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => this.renderMenuRow(rowData)}
        renderSeparator={(sectionId, rowId) => this.renderMenuSeparator(sectionId, rowId)} />
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

export default SideMenu;

SideMenu.PropTypes = {
  currentPageTitle: PropTypes.string,
  drawer: PropTypes.element,
  navigation: PropTypes.object,
  showNotification: PropTypes.func,
  user: PropTypes.object
};
