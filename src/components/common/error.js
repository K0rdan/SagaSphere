import React, { Component } from "react";
import { Text, View } from "react-native";

const styles = {
  container: {
    flex: 1
  }
};

export class Error extends Component {
  render() {
    // TMP : To delete
    this.a = 0;
    //
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    );
  }
}

export default Error;
