// Lib imports
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
// Custom imports
import { NavBar } from "./../../styles/";
import { PlayerActions } from "./../../redux/actions/index";

const styles = {
  button: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start"
  }
};

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.onPressHome = this.onPressHome.bind(this);
  }

  toggleMenu() {
    if (this.props.drawer) {
      this.props.drawer.toggleDrawer();
    }
  }

  onPressHome() {
    const { state, dispatch } = this.props.navigation;
    if (state.routeName !== "Home") {
      dispatch({ type: "Navigation/NAVIGATE", routeName: "Home" });
    }
  }

  render() {
    return (
      <NavBar.container>
        { this.props.drawer ?
          <NavBar.burgerButton color="transparent" onPress={this.toggleMenu}>
            <NavBar.burgerImage source={NavBar.burgerImageSrc} style={{ width: 30 }}/>
          </NavBar.burgerButton> : null }
        <TouchableOpacity style={styles.button} onPress={this.onPressHome}>
          <Icon name="home" color="white" size={40} />
        </TouchableOpacity>
        <NavBar.title>{this.props.currentPage}</NavBar.title>
      </NavBar.container>
    );
  }
}

HeaderComponent.proptypes = {
  navigation: PropTypes.object.isRequired,
  drawer: PropTypes.object.isRequired,
  currentPage: PropTypes.string,
  track: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  }),
  isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  track: state.PlayerReducer.track,
  isLoading: state.PlayerReducer.isLoading
});
const mapDispatchToPRops = () => ({
  play: PlayerActions.play,
  pause: PlayerActions.pause
});

export const Header = connect(mapStateToProps, mapDispatchToPRops)(HeaderComponent);
export default Header;
