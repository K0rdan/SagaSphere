import React, {Component} from "react";
import {Text} from "react-native";

import Header from "./header";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header />
        );
    }
}