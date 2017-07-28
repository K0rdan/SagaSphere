import React, { Component } from "react";
import { NavBar } from "./../../styles/";

export class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        if (this.props.drawer) {
            this.props.drawer.toggleDrawer();
        }
    }

    render() {
        return (
            <NavBar.container>
                { this.props.drawer ?
                    <NavBar.burgerButton color="transparent" onPress={this.toggleMenu}>
                        <NavBar.burgerImage source={NavBar.burgerImageSrc} style={{ width: 30 }}/>
                    </NavBar.burgerButton> : null }
                <NavBar.title>Hello World!</NavBar.title>
            </NavBar.container>
        );
    }
}

export default Header;
