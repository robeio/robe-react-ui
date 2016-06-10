import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import SideMenuSubItem from "libs/view/sidemenu/SideMenuSubItem";
import SideMenuRootItem from "libs/view/sidemenu/SideMenuRootItem";

class SideMenuItem extends BaseComponent {

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