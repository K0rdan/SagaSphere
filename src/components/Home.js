import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Page from "./page";

export default class Home extends Component {
    render() {
        const renderContent = () => (
            <View><Text>Home</Text></View>
        );

        return (
            <Page navigation={this.props.navigation} renderContent={renderContent} />
        );
    }
}

Home.PropTypes = {
    navigation: PropTypes.object
};
