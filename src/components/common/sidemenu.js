import React, { Component } from "react";
import { Text, ListView } from "react-native";
import { Config, Lang } from "./../../utils/";

import { SideMenuStyles } from "./../../styles/";

export class SideMenu extends Component {
  constructor(props) {
    super(props);

    const menuDataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a !== b });

    this.menus = [{
      title: Lang[Config.Lang].Menu.User.Sagas,
      routeName: "UserSagas"
    }];

    this.state = {
      dataSource: menuDataSource.cloneWithRows(this.menus)
    };
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
    return (
      <SideMenuStyles.container>
          <Text>I'm in the Drawer!</Text>
          {this.renderMenu()}
      </SideMenuStyles.container>
    );
  }

  renderMenu() {
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
