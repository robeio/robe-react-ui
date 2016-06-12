import React from "react";
import { ShallowComponent } from "robe-react-commons";
import SideMenuSubItem from "sidemenu/SideMenuSubItem";
import SideMenuRootItem from "sidemenu/SideMenuRootItem";

class SideMenuItem extends ShallowComponent {

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
            />)
        } else {
            return (<SideMenuSubItem
                root={true}
                menu={menu}
                router={this.props.router}
                onSelectionChange={this.props.onSelectionChange}
                initialSelection={this.props.initialSelection}/>)
        }

    }
}


module.exports = SideMenuItem;