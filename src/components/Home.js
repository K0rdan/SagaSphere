import React, {Component} from "react";
import {Text, View} from "react-native";
import Page from "./page";

export default class Home extends Component {
    render() {
        return (<Page navigation={this.props.navigation} renderContent={this.renderContent} />);
    }

    renderContent() {
        return(<View><Text>Home</Text></View>);
    }
}