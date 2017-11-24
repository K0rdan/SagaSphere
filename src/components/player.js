import React, { Component } from "react";
import { Text, View } from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import { unzip } from "react-native-zip-archive";
import Sound from "react-native-sound";
import PropTypes from "prop-types";
import Page from "./page";
import { Error, NotificationLevel, Loader } from "./common";

export class Player extends Component {
  constructor(props) {
    super(props);

    const {
      user,
      saga,
      playlist
    } = this.props.navigation.state.params;
    this.saga = saga || null;
    this.playlist = playlist || null;

    this.state = {
      user: user || null,
      currentTrack: 0,
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
    const { trackNumber, url } = this.playlist[this.state.currentTrack];
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
        return unzip(blob.getRNFetchBlobRef(), `${RNFetchBlob.fs.dirs.MusicDir}/${this.saga.title}/${trackNumber}`)
      })
      .then(() => {
        const track = new Sound(`${RNFetchBlob.fs.dirs.MusicDir}/${this.saga.title}/${trackNumber}/donjon-de-naheulbeuk01.mp3`, Sound.LIBRARY, (err) => {
          if (err) {
            throw err;
          }

          this.setState({
            loading: false,
            loadingState: "completed",
            loadingPercent: 0
          });

          console.log("Track duration", track.getDuration());
          // track.play();
        });
      })
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
    const loader = (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "Roboto-Black", fontSize: 12 }}>{this.state.loadingState}</Text>
        <Text style={{ fontFamily: "Roboto-Black", fontSize: 16 }}>{this.state.loadingPercent}</Text>
      </View>
    );
    return (
      <View style={{ flex: 1 }}>
        <Text>Player</Text>
        {
          this.state.loading && this.state.loadingState && this.state.loadingPercent ?
            <Loader
              style={{
                backgroundColor: "rgba(0,0,0,0.75)",
                position: "absolute",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
              percent={this.state.loadingPercent}
              children={loader}
            /> :
            null
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
