import React, { Component } from "react";
import { Text, Slider, View, TouchableOpacity } from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import { unzip } from "react-native-zip-archive";
import Sound from "react-native-sound";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import moment from "moment";
import Page from "./page";
import { Error, NotificationLevel, Loader } from "./common";
import { Date } from "./../utils";

const styles = {
  other: {
    flex: 1
  },
  button: {
    marginLeft: 10,
    marginRight: 10
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

export class Player extends Component {
  constructor(props) {
    super(props);

    this.fetchTrack = this.fetchTrack.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
    this.playlistChange = this.playlistChange.bind(this);

    const {
      user,
      saga,
      playlist
    } = this.props.navigation.state.params;
    this.saga = saga || null;
    this.playlist = playlist || null;

    this.state = {
      user: user || null,
      currentTrack: {
        number: 0,
        time: "00:00:00",
        duration: "00:00:00",
        isPlaying: false,
        details: null
      },
      loading: false,
      loadingState: null,
      loadingPercent: 0,
      error: null,
      showNotification: null
    };
  }

  componentWillMount() {
    this.fetchTrack();
  }

  componentWillUnmount() {
    if (this.state.loading && this.state.fetchingTask) {
      this.state.fetchingTask.cancel();
    }
  }

  fetchTrack() {
    const { trackNumber, url } = this.playlist[this.state.currentTrack.number];
    const sagaPath = `${RNFetchBlob.fs.dirs.MusicDir}/${this.saga.title}/${trackNumber}`;

    if (!RNFetchBlob.fs.exists(`${sagaPath}/donjon-de-naheulbeuk01.mp3`)) {
      const fetchingTask = RNFetchBlob.fetch("GET", url)
        .progress({ interval: 100 }, (received, total) => {
          this.setState({
            loading: true,
            loadingState: "Downloading",
            loadingPercent: Math.floor((received / total) * 100)
          });
        })
        .then((res) => {
          this.setState({
            loadingState: "Blobing",
            loadingPercent: 100
          });
          return res.blob();
        })
        .then((blob) => {
          this.setState({
            loadingState: "Unzipping"
          });
          return unzip(blob.getRNFetchBlobRef(), sagaPath);
        })
        .then(() => this.loadSound(`${sagaPath}/donjon-de-naheulbeuk01.mp3`))
        .catch((err) => {
          this.setState({
            showNotification: {
              message: err.message,
              level: NotificationLevel.err
            }
          });
        });

      this.setState({
        fetchingTask
      });
    }
    else {
      this.loadSound(`${sagaPath}/donjon-de-naheulbeuk01.mp3`);
    }
  }

  loadSound(path) {
    const track = new Sound(path, Sound.LIBRARY, (err) => {
      if (err) {
        throw err;
      }

      const intervalID = setInterval(this.getCurrentTime.bind(this), 100);

      track.play(() => {
        // onEnd
        clearInterval(intervalID);
        this.playlistChange(this.state.currentTrack.number++);
      });

      this.setState({
        loading: false,
        loadingState: "completed",
        loadingPercent: 0,
        currentTrack: Object.assign(this.state.currentTrack, {
          duration: moment.duration(track.getDuration(), "seconds"),
          details: track
        })
      });
    });
  }

  isPlaying() {
    const { currentTrack } = this.state;
    if (currentTrack.details) {
      return new Promise((resolve) => {
        currentTrack.details.getCurrentTime((seconds, isPlaying) => {
          resolve(isPlaying);
        });
      });
    }

    return null;
  }

  getCurrentTime() {
    const { currentTrack } = this.state;
    if (currentTrack && currentTrack.details) {
      currentTrack.details.getCurrentTime((seconds) => {
        const duration = moment.duration(seconds, "seconds");

        this.setState({
          currentTrack: Object.assign(currentTrack, {
            time: Date.timeAsHourMinSec(duration)
          })
        });
      });
    }
  }

  setCurrentTime(newTime) {
    const { currentTrack } = this.state;
    if (currentTrack.details) {
      this.togglePlay();
      if (newTime < 0) {
        // TODO : playlist previous
        console.log("Playlist previous ?");
        currentTrack.details.setCurrentTime(0);
      }
      else if (newTime >= moment.duration(currentTrack.duration).asSeconds()) {
        // TODO : playlist next
        console.log("Playlist next ?");
        currentTrack.details.setCurrentTime(0);
      }
      else {
        currentTrack.details.setCurrentTime(newTime);
      }

      this.togglePlay();
    }
  }

  playlistChange(trackNumber) {
    if (trackNumber > 0 && (this.playlist.length - 1) >= trackNumber) {
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
    }
  }

  async togglePlay() {
    const { currentTrack } = this.state;
    const isPlaying = await this.isPlaying();

    if (isPlaying === true) {
      currentTrack.details.pause();
    }
    else if (isPlaying === false) {
      currentTrack.details.play();
    }

    if (isPlaying !== null) {
      this.setState({
        currentTrack: Object.assign(currentTrack, {
          isPlaying
        })
      });
    }
  }

  render() {
    return (<Page
      navigation={this.props.navigation}
      renderContent={this.state.error === null ? this.renderContent.bind(this) : this.renderError.bind(this)}
      showNotification={this.state.showNotification}
      user={this.state.user}
    />);
  }

  renderError() {
    return (<Error details={this.state.error} />);
  }

  renderContent() {
    const {
      loading,
      loadingState,
      loadingPercent,
      currentTrack
    } = this.state;
    const currentTime = moment.duration(currentTrack.time).asSeconds();
    const timePercent = (currentTime * 100) / moment.duration(currentTrack.duration).asSeconds();
    const loader = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Roboto-Black", fontSize: 12 }}>{loadingState}</Text>
        <Text style={{ fontFamily: "Roboto-Black", fontSize: 16 }}>{loadingPercent}</Text>
      </View>
    );
    const renderButton = (size, icon, onPress) => (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon size={size} name={icon} />
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1 }}>
        {
          loading && loadingState && loadingPercent ?
            <Loader
              percent={loadingPercent}
              children={loader}
            /> :
            <View style={{ flex: 1 }}>
              <View style={styles.other}></View>
              <View style={styles.actionBar}>
                {renderButton(35, "skip-previous", () => this.playlistChange(currentTrack.number - 1))}
                {renderButton(40, "replay-30", () => this.setCurrentTime(currentTime - 30))}
                {renderButton(55, `${currentTrack.isPlaying ?
                    "play" :
                    "pause"
                  }-circle-outline`, this.togglePlay.bind(this))}
                {renderButton(40, "forward-30", () => this.setCurrentTime(currentTime + 30))}
                {renderButton(35, "skip-next", () => this.playlistChange(currentTrack.number + 1))}
              </View>
              <View style={styles.playbackBar}>
                <Text style={{ fontFamily: "Roboto-Black", margin: 10 }}>{currentTrack.time}</Text>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Slider
                    value={timePercent}
                    maximumValue={100}
                    onValueChange={(value) => {
                      const convertedValue = (value * moment.duration(currentTrack.duration).asSeconds()) / 100;
                      this.setCurrentTime(convertedValue);
                    }}
                  />
                </View>
                <Text style={{ fontFamily: "Roboto-Black", margin: 10 }}>{Date.timeAsHourMinSec(currentTrack.duration)}</Text>
              </View>
            </View>
        }
      </View>
    );
  }
}

export default Player;

Player.PropTypes = {
  navigation: PropTypes.object,
  playlist: PropTypes.array.isRequired
};
