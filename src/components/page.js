import React, {Component} from "react";
import {DrawerLayoutAndroid, Text, View} from "react-native";

import Header from "./common/header";
import SideMenu from "./common/sidemenu";

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.renderNavigationView = this.renderNavigationView.bind(this);
    }

    toggleDrawer() {
        this.refs.drawer.openDrawer();
    }

    render() {
        const drawer = { toggleDrawer: () => this.toggleDrawer() };        
        const renderContent = this.props.renderContent ? this.props.renderContent : null;

        return (
            <View style={{flex: 1}}>
                <DrawerLayoutAndroid
                    ref='drawer'
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={this.renderNavigationView}>
                    <Header drawer={drawer}/>
                    {renderContent != null ? renderContent() : this.renderDefaultContent()}
                </DrawerLayoutAndroid>
            </View>
        );
    }

    renderNavigationView() {
        return (<SideMenu navigation={this.props.navigation} drawer={this.refs.drawer} />);
    }

    renderDefaultContent() {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
        </View>
      );
    }
}