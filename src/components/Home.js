import React, {Component} from "react";
import {Text, StyleSheet} from "react-native";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={styles.title}>Home</Text>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        color: "#000"
    }
});