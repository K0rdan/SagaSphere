import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

export const NotificationLevel = {
    info: "green",
    warn: "orange",
    err: "red"
};

export class Notification extends Component {
    render() {
        const { text, level } = this.props;

        if (text && text !== "") {
            return (
                <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Text style={{ color: level }}>{text}</Text>
                </View>
            );
        }

        return null;
    }
}

Notification.PropTypes = {
    text: PropTypes.string
};

export default Notification;
