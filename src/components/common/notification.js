// Lib imports
import React, { Component } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import { values } from "lodash";

const styles = {
  container: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 300,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 10,
    marginBottom: 5
  },
  icon: {
    flex: 0.15
  },
  text: {
    flex: 0.85
  }
};

export const NotificationLevel = {
  info: "green",
  warn: "orange",
  err: "red"
};

export class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerOnLayoutStyle: {
        marginLeft: "auto"
      }
    };
  }

  render() {
    const { text, level } = this.props;

    if (text && text !== "") {
      return (
        <View style={[styles.container, this.state.containerOnLayoutStyle]} onLayout={(e) => {
          this.setState({
            containerOnLayoutStyle: {
              marginLeft: -(e.nativeEvent.layout.width / 2)
            }
          });
        }}>
          <Icon name="error" style={styles.icon} color={level} size={30} />
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={[styles.text, { color: level }]}>{text}</Text>
          </View>
        </View>
      );
    }

    return null;
  }
}


Notification.defaultProps = {
  text: "",
  level: null
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.oneOf(values(NotificationLevel)).isRequired
};

export default Notification;
