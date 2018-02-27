import React, { Component } from "react";
import { Text, Slider, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import moment from "moment";
import { Page } from "./page";
import { Error, Loader } from "./common";
import { Date, Config, Lang } from "./../utils";
import { PlayerActions } from "./../redux/actions/player";

const styles = {
  other: {
    flex: 1
  },
  button: {
    marginLeft: 10,
    marginRight: 10
  },
  buttonEnabled: {},
  buttonDisabled: {
    color: "rgb(200, 200, 200)"
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  playbackBar: {
    flexDirection: "row"
  }
};

class PlayerComponent extends Component {
  constructor(props) {
    super(props);

    this.playlistChange = this.playlistChange.bind(this);

    const { saga, playlist } = this.props.navigation.state.params;
    this.saga = saga || null;
    this.playlist = playlist || null;

    this.state = {
      loading: false,
      loadingState: null,
      loadingPercent: 0,
      error: null,
      showNotification: null
    };
  }

  // To review
  componentDidMount() {
    const { init, fetchTrack, navigation: { state, dispatch } } = this.props;
    const { playlist } = state.params;

    dispatch(init(playlist));
    dispatch(fetchTrack(playlist[0]));
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading, loading: { state, percent } } = nextProps;

    this.setState({
      loading: isLoading,
      loadingState: state,
      loadingPercent: percent
    });
  }

  setCurrentTime(newTime) {
    const { track: { duration, sound } } = this.props;
    if (sound) {
      if (newTime < 0) {
        // TODO : playlist previous
        console.log("Playlist previous ?");
        sound.setCurrentTime(0);
      } else if (newTime >= moment.duration(duration, "seconds").asSeconds()) {
        // TODO : playlist next
        console.log("Playlist next ?");
        sound.setCurrentTime(0);
      } else {
        sound.setCurrentTime(newTime);
      }
    }
  }

  // To change
  playlistChange(trackNumber) {
    if (trackNumber > 0 && this.playlist.length - 1 >= trackNumber) {
      this.setState({
        currentTrack: {
          isPlaying: false,
          number: trackNumber,
          time: "00:00:00",
          duration: "00:00:00",
          details: null
        }
      });
      this.fetchTrack();
    } else {
      // Reset playlist the last track played
      this.setState({
        currentTrack: {
          isPlaying: false,
          number: trackNumber,
          time: "00:00:00",
          duration: "00:00:00"
        }
      });
    }
  }

  togglePlay() {
    const {
      navigation: { dispatch },
      track: { isPlaying },
      play,
      pause
    } = this.props;

    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  }

  render() {
    return (
      <Page
        navigation={this.props.navigation}
        currentPage={Lang[Config.Lang].Menu.Player}
        renderContent={
          this.state.error === null
            ? this.renderContent.bind(this)
            : this.renderError.bind(this)
        }
      />
    );
  }

  renderError() {
    return <Error details={this.state.error} />;
  }

  renderContent() {
    const { isLoading, loading, track, playlist } = this.props;
    const currentTime = moment.duration(track.time, "seconds").asSeconds();
    const enablePrevButton = track.number > 0;
    const enableNextButton = playlist.length - 1 > track.number;
    const loader = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Roboto-Black", fontSize: 12 }}>
          {loading.state}
        </Text>
        <Text style={{ fontFamily: "Roboto-Black", fontSize: 16 }}>
          {loading.percent}
        </Text>
      </View>
    );
    const renderButton = (size, icon, onPress, enable = true) => {
      const iconStyle = enable ? styles.buttonEnabled : styles.buttonDisabled;
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          disabled={!enable}
        >
          <Icon size={size} name={icon} style={iconStyle} />
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        {isLoading && loading.state && loading.percent ? (
          <Loader percent={loading.percent} children={loader} />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.other} />
            <View style={styles.actionBar}>
              {renderButton(
                35,
                "skip-previous",
                () => this.playlistChange(track.number - 1),
                enablePrevButton
              )}
              {renderButton(40, "replay-30", () =>
                this.setCurrentTime(currentTime - 30))}
              {renderButton(
                55,
                `${track.isPlaying ? "pause" : "play"}-circle-outline`,
                this.togglePlay.bind(this)
              )}
              {renderButton(40, "forward-30", () =>
                this.setCurrentTime(currentTime + 30))}
              {renderButton(
                35,
                "skip-next",
                () => this.playlistChange(track.number + 1),
                enableNextButton
              )}
            </View>
            {this.renderPlaybackBar()}
          </View>
        )}
      </View>
    );
  }

  renderPlaybackBar() {
    const { track } = this.props;
    return (
      <View style={styles.playbackBar}>
        <Text style={{ fontFamily: "Roboto-Black", margin: 10 }}>
          {track.time || "00:00:00"}
        </Text>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {this.renderSlider()}
        </View>
        <Text style={{ fontFamily: "Roboto-Black", margin: 10 }}>
          {Date.timeAsHourMinSec(track.duration) || "00:00:00"}
        </Text>
      </View>
    );
  }

  renderSlider() {
    const { track } = this.props;
    const currentTime = moment.duration(track.time, "seconds").asSeconds();
    const timePercent =
      currentTime *
      100 /
      moment.duration(track.duration, "seconds").asSeconds();

    const onSlideStart = () => {
      if (track.isPlaying === true) {
        this.togglePlay();
      }
    };
    const onSlideEnd = (value) => {
      const convertedValue =
        value * moment.duration(track.duration, "seconds").asSeconds() / 100;
      this.setCurrentTime(convertedValue);
      if (track.isPlaying === false) {
        this.togglePlay();
      }
    };

    return (
      <Slider
        value={timePercent}
        maximumValue={100}
        onTouchStart={onSlideStart}
        onSlidingComplete={onSlideEnd}
      />
    );
  }
}

PlayerComponent.defaultProps = {
  track: {
    number: 0,
    isPlaying: false,
    time: "00:00:00",
    duration: "00:00:00"
  }
};

PlayerComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  playlist: PropTypes.array.isRequired,
  track: PropTypes.shape({
    number: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
  }),
  isLoading: PropTypes.bool.isRequired,
  loading: PropTypes.shape({
    state: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired
  })
};

const mapStateToProps = state => ({
  playlist: state.PlayerReducer.playlist,
  track: state.PlayerReducer.track,
  isLoading: state.PlayerReducer.isLoading,
  loading: state.PlayerReducer.loading
});
const mapDispatchToProps = () => ({
  init: PlayerActions.init,
  fetchTrack: PlayerActions.fetchTrack,
  play: PlayerActions.play,
  pause: PlayerActions.pause
});

export const Player = connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);
export default Player;
