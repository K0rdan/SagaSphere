import React, { Component } from "react";
import { Text, View } from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import { unzip } from "react-native-zip-archive";
import Sound from "react-native-sound";
import PropTypes from "prop-types";
import Page from "./page";
import { Error, NotificationLevel } from "./common";

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
      error: null,
      showNotification: null
    };
  }

  componentWillMount() {
    this.fetchTrack();
  }

  fetchTrack() {
    const { trackNumber, url } = this.playlist[this.state.currentTrack];

    RNFetchBlob.fetch("GET", url)
      .progress({ interval: 100 }, (received, total) => {
          console.log("progress ", Math.floor((received / total) * 100), "%");
      })
      .then(res => res.blob())
      .then(blob => unzip(blob.getRNFetchBlobRef(), `${RNFetchBlob.fs.dirs.MusicDir}/${this.saga.title}/${trackNumber}`))
      .then((path) => {
        console.log(`unzip completed at ${path}`);
        const track = new Sound(`${RNFetchBlob.fs.dirs.MusicDir}/${this.saga.title}/${trackNumber}/donjon-de-naheulbeuk01.mp3`, Sound.LIBRARY, (err) => {
          if (err) {
            throw err;
          }

          console.log("Track duration", track.getDuration());
          track.play();
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
    return (
      <View>
        <Text>Player</Text>
      </View>
    );
  }
}

export default Player;

Player.PropTypes = {
  navigation: PropTypes.object,
  playlist: PropTypes.array.isRequired
};
