import React from "react";
import BinderShallowComponent from "robe-react-commons/lib/components/BinderShallowComponent";
import FaIcon from "../faicon/FaIcon";

/**
 * SideMenuSubItem is the 12nd level component for the sidemenu. It acts like a leaf menu item.
 * @export
 * @class SideMenuSubItem
 * @extends {ShallowComponent}
 */
export default class SideMenuSubItem extends BinderShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            active: false
        };
    }

    render(): Object {
        const item = this.props.item;

        let size = "fa-sm";
        let className = this.state.active ? "SideMenu-subitem-active" : "SideMenu-subitem";
        return (
            <li style={{ display: "block" }} className={className}>
                <div
                    to={item.path}
                    style={{ display: "block" }}
                    onClick={this.__onClick}
                >
                    <FaIcon code={item.icon} size={size} />
                    {item.text}
                </div>
            </li>
        );
    }
    __onClick(e: Object) {
        if (this.state.active) {
            return;
        }
        this.setState({
            active: true
        });
        this.props.onChange(e, this);
    }

    componentDidMount() {
        if (!this.state.active && this.props.item.path.endsWith(this.props.selectedItem)) {
            this.__onClick(null);
        }
    }
}

