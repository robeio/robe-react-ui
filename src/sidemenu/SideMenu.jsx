import React from "react";
import { ShallowComponent } from "robe-react-commons";
import SideMenuItem from "sidemenu/SideMenuItem";
import Col from "react-bootstrap/lib/Col";

export default class SideMenu extends ShallowComponent {

    selectedItem:undefined;
    static propTypes = {
        initialSelection: React.PropTypes.string,
        menu: React.PropTypes.array,
        router: React.PropTypes.object
    };

    static defaultProps = {
        initialSelection: ""
    };
    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

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
    }

    __generateMenu = () => {
        let menusArr = [];
        let menus = this.props.menu[0].items;

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

    __onSelectionChange = (item) => {
        if (this.selectedItem && this.selectedItem !== item) {
            this.selectedItem.setState({
                active: false
            });
            if (this.selectedItem.__onSelectionChange) {
                this.selectedItem.__onSelectionChange(undefined);
            }
        }
        this.selectedItem = item;
    };

}
