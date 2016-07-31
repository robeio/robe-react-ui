import React from "react";
import { ShallowComponent } from "robe-react-commons";
import SideMenuSubItem from "./SideMenuSubItem";
import FaIcon from "../faicon/FaIcon";
/**
 * SideMenuItem is the 1st level component for the sidemenu. It acts like a collapsable panel
 * and holds a list of the chilren.
 * @export
 * @class SideMenuItem
 * @extends {ShallowComponent}
 */
export default class SideMenuItem extends ShallowComponent {

    /**
     * Holds the selected child of the menu
     *
     * @type {Object}
     */
    __selectedItem: undefined;

    constructor(props: Object) {
        super(props);
        this.state = {
            active: false
        };
    }

    render(): Object {
        const item = this.props.item;
        const children = item.items;
        let subMenuItems = [];

        for (let j = 0; j < children.length; j++) {
            let child = children[j];
            subMenuItems.push(
                <SideMenuSubItem
                    key={j}
                    item={child}
                    onChange={this.__onChange}
                    selectedItem={this.props.selectedItem}
                />
            );
        }

        let isActive = this.state.active ? "SideMenu-item SideMenu-item-active" : "SideMenu-item";
        let isExpanded = this.state.active ? "collapse in" : "collapse out";

        return (
            <div >
                <li className={isActive} onClick={this.__onClick}>
                    <FaIcon code={item.icon} size="fa-lg" />
                    {item.text}
                </li>
                <ul className={isExpanded}>{subMenuItems}</ul>
            </div>);
    }


    __onClick = (e: Object) => {
        if (!this.state.active) {
            this.setState({
                active: true
            });
        }

        this.props.onChange(e, this);
    };

    __onChange = (e: Object, subMenuItem: Object) => {
        this.clearSelection();
        this.__selectedItem = subMenuItem;
        if (!this.state.active) {
            this.setState({
                active: true
            });
        }
        this.props.onChange(e, this, subMenuItem);
    };

    /**
     * Clears the selection of the sublist.
     * Deactivites the selected SideMenuSubItem
     */
    clearSelection = () => {
        if (this.__selectedItem) {
            this.__selectedItem.setState({
                active: false
            });
        }
        this.__selectedItem = undefined;
    };

    componentDidMount() {
        if (!this.state.active && this.props.selectedItem === this.props.item.path) {
            this.__onClick();
        }
    }
}
