import React, {Component} from "react";
import {DrawerLayoutAndroid, Text, View} from "react-native";

import Header from "./header";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        );

        return (
            <View style={{flex: 1}}>
                <Header />
                <DrawerLayoutAndroid
                    drawerWidth={100}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
                    </View>
                </DrawerLayoutAndroid>
            </View>
        );
    }
}