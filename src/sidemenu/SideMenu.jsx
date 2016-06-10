import React from "react";
import BaseComponent from "libs/core/components/BaseComponent";
import SideMenuItem from "libs/view/sidemenu/SideMenuItem";
import Col from "react-bootstrap/lib/Col";

class SideMenu extends BaseComponent {

    selectedItem:undefined;
    static propTypes = {
        initialSelection: React.PropTypes.string,
        menu: React.PropTypes.array,
        router: React.PropTypes.object
    };

    static defaultProps = {
        initialSelection: ""
    };

    constructor(props) {
        super(props);

    };

    render() {
        return (
            <Col className="nav-side-menu">
                <Col className="menu-list">
                    <Col componentClass="ul" className="menu-content collapse out">
                        {this.__generateMenu()}
                    </Col>
                </Col>
            </Col>
        );
    };

    __generateMenu = () => {

        var menusArr = [];
        var menus = this.props.menu[0].items;

        for (let i = 0; i < menus.length; i++) {
            let menu = menus[i];
            menusArr.push(
                <SideMenuItem
                    key={menu.path}
                    menu={menu}
                    router={this.props.router}
                    onSelectionChange={this.__onSelectionChange}
                    initialSelection={this.props.initialSelection}
                />);
        }
        return menusArr;
    };

    __onSelectionChange = (item)=> {

        if (this.selectedItem && this.selectedItem != item) {
            this.selectedItem.setState({
                active: false
            });
            if (this.selectedItem.__onSelectionChange)
                this.selectedItem.__onSelectionChange(undefined);
        }
        this.selectedItem = item;
    };

}


module.exports = SideMenu;