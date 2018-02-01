// Lib imports
import React, { Component } from "react";
import {
  AppState,
  DrawerLayoutAndroid,
  View,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { values } from "lodash";
// Project imports
import { NotificationLevel } from "./../redux/constants/";
import { Config } from "./../utils/index";
import { Footer, Loader, Notification, SideMenu } from "./common/index";

class PageComponent extends Component {
  constructor(props) {
    super(props);

    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.LayoutLinearAnimation = {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    };

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
      orientation: "PORTRAIT",
      notificationMessage: "",
      notificationLevel: null
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("Page, componentWillReceiveProps, nextProps :", nextProps);
    const { notificationMessage, notificationLevel } = nextProps;

    if (notificationMessage && notificationLevel) {
      this.showNotification(notificationMessage, notificationLevel);
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
    if (
      this.state &&
      this.state.appState &&
      this.state.appState === "active" &&
      (appState === "inactive" || appState === "background")
    ) {
      // Force PORTRAIT mode when inactive / background
      Orientation.lockToPortrait();
      this.setState({ orientation: "PORTRAIT" });
    }
 else if (
      this.state &&
      this.state.appState &&
      appState &&
      appState === "active" &&
      (this.state.appState === "inactive" ||
        this.state.appState === "background")
    ) {
      // Inactive / Background -> Active
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
    if (
      notificationMessage &&
      notificationMessage !== "" &&
      notificationLevel
    ) {
      if (this.refs.drawer) {
        this.refs.drawer.closeDrawer();
      }

      this.setState({ notificationMessage, notificationLevel }, () => {
        LayoutAnimation.configureNext(this.LayoutLinearAnimation);
      });
      setTimeout(() => {
        this.setState(
          { notificationMessage: "", notificationLevel: null },
          () => {
            LayoutAnimation.configureNext(this.LayoutLinearAnimation);
          }
        );
      }, Config.NotificationDuration);
    }
  }

  render() {
    if (
      this.state &&
      this.state.orientation &&
      this.state.orientation === "PORTRAIT"
    ) {
      return this.renderPortrait();
    }
 else if (
      this.state &&
      this.state.orientation &&
      this.state.orientation === "LANDSCAPE"
    ) {
      return this.renderLandscape();
    }

    return (
      <View>
        <Loader />
      </View>
    );
  }

  renderPortrait() {
    const { currentPage, renderContent, navigation } = this.props;
    const { orientation } = this.state;
    const drawer = { toggleDrawer: () => this.toggleDrawer() };

    return (
      <View style={{ flex: 1 }}>
        <DrawerLayoutAndroid
          ref="drawer"
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.renderNavigationView}
        >
          {renderContent != null ? renderContent() : null}
          <Footer
            orientation={orientation}
            navigation={navigation}
            currentPage={currentPage}
            drawer={drawer}
          />
          {this.props.notificationMessage !== "" &&
          this.props.notificationLevel !== null ? (
            <Notification
              text={this.props.notificationMessage}
              level={this.props.notificationLevel}
            />
          ) : null}
        </DrawerLayoutAndroid>
      </View>
    );
  }

  renderLandscape() {
    const { currentPage, renderContent, navigation } = this.props;
    const { orientation } = this.state;

    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ width: 200 }}>{this.renderNavigationView()}</View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          {renderContent != null ? renderContent() : null}
          <Footer
            orientation={orientation}
            navigation={navigation}
            currentPage={currentPage}
          />
          {this.props.notificationMessage !== "" &&
          this.props.notificationLevel !== null ? (
            <Notification
              text={this.props.notificationMessage}
              level={this.props.notificationLevel}
              style={{ bottom: "15%" }}
            />
          ) : null}
        </View>
      </View>
    );
  }

  renderNavigationView() {
    return (
      <SideMenu
        navigation={this.props.navigation}
        currentPageTitle={this.title}
      />
    );
  }
}

PageComponent.defaultProps = {
  notificationMessage: "",
  notificationLevel: null
};

PageComponent.propTypes = {
  currentPage: PropTypes.string,
  navigation: PropTypes.object,
  renderContent: PropTypes.func,
  notificationMessage: PropTypes.string,
  notificationLevel: PropTypes.oneOf(values(NotificationLevel))
};

const mapStateToProps = state => ({
  notificationMessage: state.NotificationReducer.message,
  notificationLevel: state.NotificationReducer.level
});
const mapDispatchToProps = dispatch => ({ dispatch });

export const Page = connect(mapStateToProps, mapDispatchToProps)(PageComponent);
export default Page;
