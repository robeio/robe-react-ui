import React from "react";
import { ShallowComponent } from "robe-react-commons";
import FaIcon from "faicon/FaIcon";
import Link from "react-router/lib/Link";

export default class SideMenuSubItem extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    render() {
        const menu = this.props.menu;
        const root = this.props.root;

        let size = root ? "fa-lg" : "fa-sm";
        let isActive = this.state.active ? "active" : "";

        if (!this.state.active && this.props.selectedPath === menu.path) {
            this.__onClick();
        }
        return (
            <li className={isActive} style={{ display: "inline-block" }}>
                <Link
                    to={window.applicationRootPath + menu.module}
                    style={{ display: "block" }}
                    onClick={this.__onClick}
                >
                    <FaIcon code={menu.icon} size={size} />
                    {menu.text}
                </Link>
            </li>
        );
    }
    __onClick = (e, initial) => {
        if (this.state.active) {
            return;
        }
        this.setState({
            active: true
        });
        this.props.onSelectionChange(this, initial);
    }

    componentDidMount() {
        if (!this.state.active && this.props.menu.path.endsWith(this.props.initialSelection)) {
            this.__onClick(null, true);
        }
    }
}

