import React, { Component } from "react";
import { Text, View } from "react-native";

export class Loader extends Component {
    render() {
        // TMP
        this.a = "";
        //
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
}

export default Loader;
