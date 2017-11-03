import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Page from "./../page";

export class SagaDetails extends Component {
  constructor(props) {
    super(props);

    const { user, saga } = this.props.navigation.state.params;

    this.state = {
      user: user || null,
      saga: saga || null,
      showNotification: null
    };
  }

  render() {
    return (<Page
      navigation={this.props.navigation}
      renderContent={this.renderContent.bind(this)}
      showNotification={this.state.showNotification}
      currentPage={this.state.saga.title}
      user={this.state.user}
    />);
  }

  renderContent() {
    return (
      <View>
        <Text>{this.state.title}</Text>
      </View>
    );
  }
}

export default SagaDetails;

SagaDetails.PropTypes = {
  navigation: PropTypes.object,
  saga: PropTypes.object
};
