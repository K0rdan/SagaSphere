import React, { Component } from "react";
import { View, Text, Image, Animated } from "react-native";
import PropTypes from "prop-types";

const styles = {
    container: {
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.10)"
    },
    imageContainer: {
        flex: 1,
        width: 50,
        height: 50,
        padding: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    detailsContainer: {
        flex: 5,
        height: 40
    },
    title: {
        flex: 1,
        fontWeight: "bold"
    },
    date: {
        fontWeight: "normal"
    },
    author: {
        flex: 1
    }
};

export class SagaListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            translate: new Animated.Value(0),
            width: 0
        };
    }

    render() {
        const { details: { title, image, creation, author } } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} resizeMode="contain" style={styles.image} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title} <Text style={styles.date}>({new Date(creation).getFullYear()})</Text></Text>
                    <Text style={styles.author}>{author}</Text>
                </View>
            </View>
        );
    }
}

export default SagaListItem;

SagaListItem.propTypes = {
    navigation: PropTypes.object,
    details: PropTypes.object
};
