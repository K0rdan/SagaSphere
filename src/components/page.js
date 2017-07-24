import React, { Component } from "react";
import { AppState, DrawerLayoutAndroid, Text, View } from "react-native";
import Orientation from "react-native-orientation";

import Header from "./common/header";
import SideMenu from "./common/sidemenu";
import Loader from "./common/loader";

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.appStateDidChange = this.appStateDidChange.bind(this);
        this.orientationDidChange = this.orientationDidChange.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.renderPortrait = this.renderPortrait.bind(this);
        this.renderLandscape = this.renderLandscape.bind(this);
        this.renderNavigationView = this.renderNavigationView.bind(this);

        this.state = { appState: AppState.currentState };
    }

    componentWillMount() {
        Orientation.getOrientation((err, orientation) => {
            if (err) {
                // TODO : Create a generic error handler
                console.log("ERR", err);
            }
            this.setState({ orientation });
        });
    }

    componentDidMount() {
        AppState.addEventListener("change", this.appStateDidChange);
        Orientation.addOrientationListener(this.orientationDidChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.appStateDidChange);
        Orientation.removeOrientationListener(this.orientationDidChange);
    }

    appStateDidChange(appState) {
        // Active -> Inactive / Background
        if (this.state && this.state.appState && this.state.appState === "active" && (appState === "inactive" || appState === "background")) {
            // Force PORTRAIT mode when inactive / background
            Orientation.lockToPortrait();
            this.setState({ orientation: "PORTRAIT" });
        }
        // Inactive / Background -> Active
        else if (this.state && this.state.appState && appState && appState === "active" && (this.state.appState === "inactive" || this.state.appState === "background")) {
            Orientation.unlockAllOrientations();
        }

        this.setState({ appState });
    }

    orientationDidChange(orientation) {
        if (orientation === "PORTRAIT") {
            // Do something on rotation to PORTRAIT
            this.setState({ orientation });
        }
        else if (orientation === "LANDSCAPE") {
            // Do something on rotation to LANDSCAPE
            this.setState({ orientation });
        }
    }

    toggleDrawer() {
        this.refs.drawer.openDrawer();
    }

    render() {
        if (this.state && this.state.orientation && this.state.orientation === "PORTRAIT") {
            return this.renderPortrait();
        }
        else if (this.state && this.state.orientation && this.state.orientation === "LANDSCAPE") {
            return this.renderLandscape();
        }

        return (<Loader />);
    }

    renderPortrait() {
        const drawer = { toggleDrawer: () => this.toggleDrawer() };
        const renderContent = this.props.renderContent ? this.props.renderContent : null;

        const renderDefaultContent = () => (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "right" }}>Hello</Text>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "right" }}>World!</Text>
            </View>
        );

        return (
            <View style={{ flex: 1 }}>
                <DrawerLayoutAndroid
                    ref='drawer'
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={this.renderNavigationView}>
                    <Header drawer={drawer}/>
                    {renderContent != null ? renderContent() : renderDefaultContent()}
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
                    { renderContent != null ? renderContent() : this.renderDefaultContent() }
                </View>
            </View>
        );
    }

    renderNavigationView() {
        return (<SideMenu navigation={this.props.navigation} drawer={this.refs.drawer} />);
    }
}