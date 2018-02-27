// Lib imports
import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment";

// Custom imports
import { PlayerActions } from "./../../redux/actions/index";
import { Config, Lang } from "./../../utils/index";

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
    this.onPressInPlayer = this.onPressInPlayer.bind(this);
    this.onPressOutPlayer = this.onPressOutPlayer.bind(this);
    this.onPressPlayer = this.onPressPlayer.bind(this);
    this.onLongPressPlayer = this.onLongPressPlayer.bind(this);
  }

  toggleMenu() {
    if (this.props.drawer) {
      this.props.drawer.toggleDrawer();
    }
  }

  onPressHome() {
    const { state, dispatch } = this.props.navigation;
    if (state.routeName !== "Home") {
      dispatch({ type: NavigationActions.NAVIGATE, routeName: "Home" });
    }
  }

  onPressInPlayer() {
    this.longPressHandled = false;
  }
  onPressOutPlayer() {
    if (!this.longPressHandled) {
      this.onPressPlayer();
    } else {
      this.longPressHandled = false;
    }
  }
  // Toogle player or pause on the player
  onPressPlayer() {
    const { navigation: { dispatch }, track, play, pause } = this.props;
    if (track.sound) {
      if (track.isPlaying) {
        dispatch(pause());
      } else {
        dispatch(play());
      }
    }
  }
  // Displayer the player component
  onLongPressPlayer() {
    this.longPressHandled = true;

    const { navigation: { dispatch }, playlist, track } = this.props;
    if (track.sound) {
      dispatch({
        type: NavigationActions.NAVIGATE,
        routeName: "Player",
        routeParams: {
          playlist
        }
      });
    }
  }

  onPressLibrary() {
    this.a = 0;
  }

  onPressSettings() {
    this.a = 0;
  }

  render() {
    const { drawer, orientation, track, currentPage } = this.props;
    const minHeight = orientation === "LANDSCAPE" ? 20 : 0;
    const timePercent =
      moment.duration(track.time, "seconds").asSeconds() *
        100 /
        moment.duration(track.duration, "seconds").asSeconds() || 0;

    return (
      <View style={[styles.container, { minHeight }]}>
        {drawer ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.toggleMenu()}
          >
            <Icon name="menu" color="white" size={40} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onPressHome()}
        >
          <Icon name="home" color="white" size={40} />
        </TouchableOpacity>
        {currentPage === Lang[Config.Lang].Menu.Player ? (
          <TouchableOpacity style={styles.button}>
            <Icon name="devices-other" color="white" size={40} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPressIn={this.onPressInPlayer}
            onPressOut={this.onPressOutPlayer}
            onLongPress={this.onLongPressPlayer}
          >
            <Icon
              name={`${track.isPlaying ? "pause" : "play"}-circle-outline`}
              color="white"
              size={40}
            />
            <AnimatedCircularProgress
              size={34}
              width={4}
              rotation={0}
              fill={timePercent}
              tintColor="green"
              backgroundColor="transparent"
              style={{ position: "absolute", left: 3 }}
            />
          </TouchableOpacity>
        )}
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
  playlist: PropTypes.array,
  track: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  }),
  isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  playlist: state.PlayerReducer.playlist,
  track: state.PlayerReducer.track,
  isLoading: state.PlayerReducer.isLoading
});
const mapDispatchToProps = () => ({
  play: PlayerActions.play,
  pause: PlayerActions.pause
});

export const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterComponent);
export default Footer;
