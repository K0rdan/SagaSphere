import React, { Component } from "react";
import { Text, View, TouchableOpacity, UIManager, Platform, LayoutAnimation, FlatList } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { map } from "lodash";
import moment from "moment";
import Page from "./../page";
import { Error, NotificationLevel, Loader } from "./../common";
import { API, Config, Lang } from "./../../utils/";

const styles = {
  sectionHeader: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    backgroundColor: "rgb(100, 100, 100)"
  },
  sectionHeaderTitle: {
    fontFamily: "Roboto-Black",
    color: "white"
  },
  sectionHeaderArrow: {
    position: "absolute",
    right: 0,
    color: "white"
  },
  episodesTrackContainer: {
    flexDirection: "row"
  },
  episodesTrackNum: {
    flex: 0.05,
    textAlign: "center",
    textAlignVertical: "center"
  },
  episodesTrackTitle: {
    flex: 0.65,
    textAlign: "center",
    textAlignVertical: "center"
  },
  episodesTrackDuration: {
    flex: 0.20,
    textAlign: "center",
    textAlignVertical: "center"
  },
  episodesTrackPlayButton: {
    flex: 0.10,
    textAlign: "center",
    textAlignVertical: "center"
  }
};

export class SagaDetails extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.LayoutLinearAnimation = {
      duration: 150,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    };

    const {
      user,
      saga,
      showSummary,
      showAuthor,
      showEpisodes
    } = this.props.navigation.state.params;

    this.state = {
      user: user || null,
      saga: saga || null,
      showSummary: showSummary === true,
      showAuthor: showAuthor === true,
      showEpisodes: showEpisodes === true,
      episodes: null,
      episodesDataSource: null,
      error: null,
      showNotification: null
    };
  }

  componentWillMount() {
    this.fetchEpisodes();
  }

  fetchEpisodes() {
    return API(Config.EndPoints.saga.episodes(this.state.saga.id))
      .then(this.formatEpisodes.bind(this))
      .catch((err) => {
        this.setState({
          showNotification: {
            message: err.message,
            level: NotificationLevel.err
          }
        });
      });
  }

  formatEpisodes(tracksJson) {
    // Did we get tracks ?
    if (tracksJson.data) {
      const tracksMaped = [];

      tracksJson.data.forEach((article, i) => {
        tracksMaped.push(Object.assign(article, { key: i }));
      });

      this.setState({
        episodes: tracksJson.data,
        episodesDataSource: tracksMaped
      });
    }
  }

  render() {
    return (<Page
      navigation={this.props.navigation}
      renderContent={this.state.error === null ? this.renderContent.bind(this) : this.renderError.bind(this)}
      showNotification={this.state.showNotification}
      currentPage={this.state.saga.title}
      user={this.state.user}
    />);
  }

  renderError() {
    return (<Error details={this.state.error} />);
  }

  renderContent() {
    return (
      <View>
        <Text>{this.state.saga.title}</Text>
        {map(["Summary", "Author", "Episodes"], sectionName =>
          this.renderSections(sectionName, this[`render${sectionName}`].bind(this)))}
      </View>
    );
  }

  renderSections(sectionName, renderContent) {
    return (
      <View key={sectionName} style={styles[`container${sectionName}`]}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => this.toggleSection(sectionName)}
        >
          <Text style={styles.sectionHeaderTitle}>{Lang[Config.Lang].Miscellaneous[sectionName]}</Text>
          <Icon
            name={this.state[`show${sectionName}`] ? "arrow-drop-down" : "arrow-drop-up"}
            size={36}
            style={styles.sectionHeaderArrow}
          />
        </TouchableOpacity>
        { this.state[`show${sectionName}`] ? renderContent() : null }
      </View>
    );
  }

  renderSummary() {
    return (
      <View>
        <Text>Summary content !</Text>
      </View>
    );
  }

  renderAuthor() {
    return (
      <View>
        <Text>Author content !</Text>
      </View>
    );
  }

  renderEpisodes() {
    const renderRow = (rowData) => {
      const duration = moment.duration(rowData.item.duration, "seconds");
      return (
        <TouchableOpacity
          style={styles.episodesTrackContainer}
          onPress={null}
        >
          <Text style={styles.episodesTrackNum}>{rowData.item.trackNumber}</Text>
          <Text style={styles.episodesTrackTitle}>{rowData.item.name}</Text>
          <Text style={styles.episodesTrackDuration}>{`${duration.hours() > 0 ? `${duration.hours()}${Lang[Config.Lang].Units.HourShort} ` : ""}${duration.minutes() > 0 ? `${duration.minutes()}${Lang[Config.Lang].Units.MinuteShort} ` : ""}${duration.seconds() > 0 ? `${duration.seconds()}${Lang[Config.Lang].Units.SecondShort}` : ""}`}</Text>
          <Icon
            name={"play-arrow"}
            size={36}
            style={styles.episodesTrackPlayButton}
          />
        </TouchableOpacity>
      );
    };

    if (this.state && this.state.episodesDataSource) {
      return (
        <View>
          <View style={styles.episodesTrackContainer}>
            <Text style={styles.episodesTrackNum}>N°</Text>
            <Text style={styles.episodesTrackTitle}>Titre</Text>
            <Text style={styles.episodesTrackDuration}>Durée</Text>
            <Text style={styles.episodesTrackPlayButton}>&nbsp;</Text>
          </View>
          <FlatList
            data={this.state.episodesDataSource}
            renderItem={renderRow} />
        </View>
        );
    }

    return <Loader />;
  }

  toggleSection(sectionName) {
    LayoutAnimation.configureNext(this.LayoutLinearAnimation);
    this.setState({
      [`show${sectionName}`]: !this.state[`show${sectionName}`]
    });
  }
}

export default SagaDetails;

SagaDetails.PropTypes = {
  navigation: PropTypes.object,
  saga: PropTypes.object
};
