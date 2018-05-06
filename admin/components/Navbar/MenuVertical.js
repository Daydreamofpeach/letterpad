import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { MenuTree } from "./MenuTree";

let menuData = [];

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.setData = this.setData.bind(this);
        this.navbarToggle = this.navbarToggle.bind(this);
        if (menuData.length == 0) {
            menuData = this.props.menu;
        }
        this.state = {
            navbarOpen: false,
            data: menuData
        };

        this.permissions = [];
    }

    componentWillMount() {
        if (typeof localStorage !== "undefined") {
            this.permissions = jwtDecode(localStorage.token).permissions;
        }
    }

    setData(newData) {
        menuData = newData;
        this.setState({ data: newData });
    }
    toggleItem(item, e) {
        e.preventDefault();
        this.state[item] = !this.state[item];
        this.setState(this.state);
    }
    navbarToggle() {
        this.setState({ navbarOpen: !this.state.navbarOpen });
    }
    render() {
        const navbarStatus = this.state.navbarOpen ? "in" : "";

        const selected = this.props.router.location.pathname.replace(
            "/admin/",
            ""
        );
        return (
            <MenuTree
                data={this.state.data}
                permissions={this.permissions}
                route={selected}
                setData={this.setData}
            />
        );
    }
}
