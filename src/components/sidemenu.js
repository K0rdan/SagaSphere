import React, {Component} from "react";
import {View, Text, ListView} from "react-native";
import routes from "./../routes";

import utils from "./../utils/";

import {SideMenuStyles} from "./../styles/"

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    const menuDataSource = new ListView.DataSource({ rowHasChanged: (a, b) => a != b });

    this.menus = [{
      title: "Mes sagas",
      routeName: "UserSagas"
    },{
      title: "test",
      routeName: null
    }];

    this.state = {
      dataSource: menuDataSource.cloneWithRows(this.menus)
    };
  }

  menuRowOnPress(data) {
    const {navigate} = this.props.navigation;
    if(navigate) {
      this.menus.forEach(function(menu) {
        if(menu.title === data.title) {
          navigate(menu.routeName);
        }
      });
    }
  }

  render() {
    return (
      <SideMenuStyles.container>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
          {this.renderMenu()}
      </SideMenuStyles.container>
    );
  }
  
  renderMenu() {
    return (
      <ListView 
        dataSource={this.state.dataSource} 
        renderRow={(rowData) => this.renderMenuRow(rowData)}
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
    return (<SideMenuStyles.menuRowSeparator key={rowId} />);
  }
}