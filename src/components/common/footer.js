// Lib imports
import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
// Custom imports
import { PlayerActions } from "./../../redux/actions/index";

const styles = {
  container: {
    flex: 0.1,
    backgroundColor: "red",
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "space-between"
  },
  button: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start"
  }
};

class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.onPressHome = this.onPressHome.bind(this);
  }

  toggleMenu() {
    if (this.props.drawer) {
      this.props.drawer.toggleDrawer();
    }
  }

  onPressHome() {
    const { state, dispatch } = this.props.navigation;
    if (state.routeName !== "Home") {
      dispatch({ type: "Navigation/NAVIGATE", routeName: "Home" });
    }
  }

  onPressLibrary() {

  }

  onPressSettings() {

  }

  render() {
    const { orientation } = this.props;
    const minHeight = orientation === "LANDSCAPE" ? 20 : 0;

    return (
      <View style={[styles.container, { minHeight }]}>
        { this.props.drawer ?
          <TouchableOpacity style={styles.button} onPress={() => this.toggleMenu()}>
            <Icon name="menu" color="white" size={40} />
          </TouchableOpacity> : null }
        <TouchableOpacity style={styles.button} onPress={() => this.onPressHome()}>
          <Icon name="home" color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPressLibrary}>
          <Icon name="play-circle-outline" color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPressLibrary}>
          <Icon name="library-music" color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.onPressSettings}>
          <Icon name="settings" color="white" size={40} />
        </TouchableOpacity>
      </View>
    );
  }
}

FooterComponent.proptypes = {
  navigation: PropTypes.object.isRequired,
  drawer: PropTypes.object.isRequired,
  currentPage: PropTypes.string,
  track: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  }),
  isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  track: state.PlayerReducer.track,
  isLoading: state.PlayerReducer.isLoading
});
const mapDispatchToPRops = () => ({
  play: PlayerActions.play,
  pause: PlayerActions.pause
});

export const Footer = connect(mapStateToProps, mapDispatchToPRops)(FooterComponent);
export default Footer;
