import React, { Component } from "react";
import { Text, View } from "react-native";

export class Loader extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

export default Loader;
