import React, {Component} from "react";
import {DrawerLayoutAndroid, Text, View} from "react-native";
import Orientation from 'react-native-orientation';

import Header from "./common/header";
import SideMenu from "./common/sidemenu";

export default class Page extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            orientation: Orientation.getInitialOrientation()
        };

        this.orientationDidChange = this.orientationDidChange.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.renderPortrait = this.renderPortrait.bind(this);
        this.renderLandscape = this.renderLandscape.bind(this);
        this.renderNavigationView = this.renderNavigationView.bind(this);
    }

    componentDidMount() {
        Orientation.addOrientationListener(this.orientationDidChange);
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this.orientationDidChange);
    }

    orientationDidChange = (orientation) => {
        console.log("Orientation changed :", orientation);
        if (orientation === "PORTRAIT") {
            // Do something on rotation to PORTRAIT
            this.setState({ orientation });
        }
        else if (orientation === "LANDSCAPE") {
            // Do something on rotation to LANDSCAPE
            this.setState({ orientation });
        }
    }

    toggleDrawer = () => {
        this.refs.drawer.openDrawer();
    }

    render() {
        if (this.state.orientation === "PORTRAIT") {
            return this.renderPortrait();
        }
        else if (this.state.orientation === "LANDSCAPE") {
            return this.renderLandscape();
        }
    }

    renderPortrait() {
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

    renderLandscape() {
        const renderContent = this.props.renderContent ? this.props.renderContent : null;
        
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: 200 }}>
                    { this.renderNavigationView() }
                </View>
                <View style={{ flex: 1 }}>
                    <Header />
                    {renderContent != null ? renderContent() : this.renderDefaultContent()}
                </View>
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