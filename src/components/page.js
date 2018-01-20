import React, { Component } from "react";
import { AppState, DrawerLayoutAndroid, Text, View } from "react-native";
import Orientation from "react-native-orientation";
import PropTypes from "prop-types";
import { Config } from "./../utils/index";
import { Header, Loader, Notification, NotificationLevel, SideMenu } from "./common/index";

class Page extends Component {
    constructor(props) {
        super(props);

        const { currentPage } = this.props;

        this.title = currentPage || null;

        this.appStateDidChange = this.appStateDidChange.bind(this);
        this.orientationDidChange = this.orientationDidChange.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.renderPortrait = this.renderPortrait.bind(this);
        this.renderLandscape = this.renderLandscape.bind(this);
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.showNotification = this.showNotification.bind(this);

        this.state = {
            appState: AppState.currentState,
            notificationMessage: "",
            notificationLevel: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const { showNotification } = nextProps;

        if (showNotification && showNotification.message && showNotification.level) {
            this.showNotification(showNotification.message, showNotification.level);
        }
    }

    componentWillMount() {
        Orientation.getOrientation((err, orientation) => {
            if (err) {
                this.showNotification(err, NotificationLevel.err);
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

    showNotification(notificationMessage, notificationLevel) {
        if (notificationMessage && notificationMessage !== "" && notificationLevel) {
            if (this.refs.drawer) {
                this.refs.drawer.closeDrawer();
            }
            this.setState({ notificationMessage, notificationLevel });
            setTimeout(() => {
                this.setState({ notificationMessage: "", notificationLevel: null });
            }, Config.NotificationDuration);
        }
    }

    render() {
        if (this.state && this.state.orientation && this.state.orientation === "PORTRAIT") {
            return this.renderPortrait();
        }
        else if (this.state && this.state.orientation && this.state.orientation === "LANDSCAPE") {
            return this.renderLandscape();
        }

        return (<View><Loader /></View>);
    }

    renderPortrait() {
        const { currentPage, renderContent, navigation } = this.props;
        const drawer = { toggleDrawer: () => this.toggleDrawer() };
        const renderDefaultContent = () => (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "right" }}>Hello</Text>
                <Text style={{ margin: 10, fontSize: 15, textAlign: "right" }}>World!</Text>
            </View>
        );
        const content = renderContent ? renderContent() : renderDefaultContent();

        return (
            <View style={{ flex: 1 }}>
                <DrawerLayoutAndroid
                    ref="drawer"
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={this.renderNavigationView}>
                    {content}
                    <Header
                        navigation={navigation}
                        currentPage={currentPage}
                        drawer={drawer}
                    />
                    {this.state.notificationMessage !== "" && this.state.notificationLevel !== null ? <Notification text={this.state.notificationMessage} level={this.state.notificationLevel}/> : null}
                </DrawerLayoutAndroid>
            </View>
        );
    }

    renderLandscape() {
        const renderContent = this.props.renderContent ? this.props.renderContent : null;

        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ width: 200 }}>
                    {this.renderNavigationView()}
                </View>
                <View style={{ flex: 1 }}>
                    {renderContent != null ? renderContent() : this.renderDefaultContent()}
                    <Header />
                    {this.state.notificationLevel !== null ? <Notification text={this.state.notificationMessage} level={this.state.notificationLevel}/> : null}
                </View>
            </View>
        );
    }

    renderNavigationView() {
        return (<SideMenu
            navigation={this.props.navigation}
            currentPageTitle={this.title}
            showNotification={this.showNotification}
        />);
    }
}

Page.PropTypes = {
    currentPage: PropTypes.string,
    navigation: PropTypes.object,
    renderContent: PropTypes.func
};

export default Page;
