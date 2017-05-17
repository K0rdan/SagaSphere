import React, {Component} from "react";
import {DrawerLayoutAndroid, Text, View} from "react-native";

import SideMenu from "./sidemenu";
import Header from "./header";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.renderNavigationView = this.renderNavigationView.bind(this);
    }

    toggleDrawer() {
        this.refs.drawer.openDrawer();
    }

    renderNavigationView() {
        return (<SideMenu navigation={this.props.navigation} drawer={this.refs.drawer} />);
    }

    render() {
        const drawer = { toggleDrawer: () => this.toggleDrawer() };        

        return (
            <View style={{flex: 1}}>
                <DrawerLayoutAndroid
                    ref='drawer'
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={this.renderNavigationView}>
                    <Header drawer={drawer}/>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
                    </View>
                </DrawerLayoutAndroid>
            </View>
        );
    }
}