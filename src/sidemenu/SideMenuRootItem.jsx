import React from "react";
import { ShallowComponent } from "robe-react-commons";
import SideMenuSubItem from "sidemenu/SideMenuSubItem";
import Col from "react-bootstrap/lib/Col";
import FaIcon from "faicon/FaIcon";

class SideMenuRootItem extends ShallowComponent {
    selectedItem:undefined;

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    render() {
        const menu = this.props.menu;
        const subItems = menu.items;

        let subMenus = [];

        for (let j = 0; j < subItems.length; j++) {
            let sub = subItems[j];
            subMenus.push(<SideMenuSubItem
                key={j}
                menu={sub}
                router={this.props.router}
                onSelectionChange={this.__onSelectionChange}
                initialSelection = {this.props.initialSelection}
            />);
        }

        var isActive = this.state.active ? "collapsed active" : "collapsed";

        var className = this.state.active ? "sub-menu collapse in" : "sub-menu collapse out";

        return (
            <Col componentClass="span">
                <Col componentClass="li" className={isActive} onClick={this.__onClick}>
                    <Col componentClass="a" href="#">
                        <FaIcon code={menu.icon} size="fa-lg"/> {menu.text}
                        <Col componentClass="span" className="arrow"/>
                    </Col>
                </Col>
                <Col componentClass="ul" className={className}>{subMenus}</Col>
            </Col>);
    }


    __onClick = ()=> {
        if (!this.state.active) {
            this.setState({
                active: true
            });
        }
        //Open this to child if you want to use menu as accordion ( one open at a time)

        this.props.onSelectionChange(this);
    };

    //Give this to child if you want to use menu as accordion ( one open at a time)
    __onSelectionChange = (item,initial)=> {

        if (this.selectedItem) {
            this.selectedItem.setState({
                active: false
            });
        }
        this.selectedItem = item;

        if(initial)
            this.__onClick();

    };

    componentDidMount() {
        if (!this.state.active && this.props.initialSelection == this.props.menu.path) {
            this.__onClick();
        }
    };
}


module.exports = SideMenuRootItem;