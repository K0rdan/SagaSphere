import React, {Component} from "react";
import {Text} from "react-native";

import {StyledHeader} from "./../styles/";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledHeader>Hello World!</StyledHeader>
        );
    }
}