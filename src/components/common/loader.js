import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";
import { Assets } from "./../../utils/";

const styles = {
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  animatedContent: {
    position: "absolute",
    top: "50%"
  },
  content: {
  },
  text: {
    fontFamily: "Roboto-Black"
  }
};

export class Loader extends Component {
  render() {
    const {
      style,
      children,
      size
    } = this.props;

    // Calculated styles
    const defaultStyle = Object.assign(
      {},
      styles.defaultStyle,
      {
        width: size ? size - 50 : "100%",
        height: size ? size - 50 : "100%",
        flex: size ? 0 : 1
      },
      style
    );
    const animatedContentStyle = Object.assign(
      {},
      styles.animatedContent,
      { marginTop: -((size || 200) / 2) }
    );
    const imageStyle = {
      width: size || 200,
      height: size || 200
    };
    //

    return (
      <View style={defaultStyle}>
        <Animatable.View
          animation="rotate"
          duration={2500}
          iterationCount="infinite"
          easing="linear"
          useNativeDriver={true}
          style={animatedContentStyle}
        >
          <Image
            style={imageStyle}
            source={Assets.loader}
          />
        </Animatable.View>
        <View style={styles.content}>
          { children || <Text style={[styles.text, { fontSize: size ? size / 10 : 14 }]}>Loading</Text> }
        </View>
      </View>
    );
  }
}

export default Loader;

Loader.propTypes = {
  style: PropTypes.object,
  children: PropTypes.object,
  size: PropTypes.number
};

Loader.defaultProps = {
  style: null,
  children: null,
  size: null
};
