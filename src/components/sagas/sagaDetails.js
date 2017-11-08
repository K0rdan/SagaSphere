import React, { Component } from "react";
import { Text, View, TouchableOpacity, UIManager, Platform, LayoutAnimation } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { map } from "lodash";
import Page from "./../page";
import { Error } from "./../common";
import { Config, Lang } from "./../../utils/";

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
  containerSummary: {

  },
  containerAuthor: {

  },
  containerEpisodes: {

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
      error: null,
      showNotification: null
    };
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
          this.renderSections(sectionName, this[`render${sectionName}`]))}
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
    return (
      <View>
        <Text>Episodes content !</Text>
      </View>
    );
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
