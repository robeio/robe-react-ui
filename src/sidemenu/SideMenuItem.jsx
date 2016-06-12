import React from "react";
import { ShallowComponent } from "robe-react-commons";
import SideMenuSubItem from "sidemenu/SideMenuSubItem";
import SideMenuRootItem from "sidemenu/SideMenuRootItem";

export default class SideMenuItem extends ShallowComponent {

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }
    render() {
        const menu = this.props.menu;
        if (menu.items && menu.items.length > 0) {
            return (<SideMenuRootItem
                menu={menu}
                router={this.props.router}
                onSelectionChange={this.props.onSelectionChange}
                initialSelection={this.props.initialSelection}
            />
            );
        }

        return (
            <SideMenuSubItem
                root={true}
                menu={menu}
                router={this.props.router}
                onSelectionChange={this.props.onSelectionChange}
                initialSelection={this.props.initialSelection}
            />
        );
    }
}
