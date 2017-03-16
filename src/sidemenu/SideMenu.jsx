import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Arrays from "robe-react-commons/lib/utils/Arrays";
import FaIcon from "../faicon/FaIcon";
import {Collapse, ListGroup, ListGroupItem} from "react-bootstrap";
import "./SideMenu.css";


export default class SideMenu extends ShallowComponent {


    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Path of the selected item
         */
        selectedItem: React.PropTypes.string,
        /**
         * Items of the menu. Must be a valid json map with a root element.
         */
        items: React.PropTypes.array.isRequired,
        /**
         * Change event of the sidemenu.
         * It is triggered if the selected sub-item changes, not collapsed menu.
         */
        onChange: React.PropTypes.func,
        /**
         * key of given map array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * presented text of give map array `items`
         */
        textField: React.PropTypes.string,
    };

    static defaultProps = {
        selectedItem: "",
        textField: "text",
        valueField: "path",
    };

    constructor(props) {
        super(props);
        this.componentWillReceiveProps(props)
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            selectedItem: nextProps.selectedItem
        }
    }

    __selectModule = [];

    render() {
        this.__selectModule = this.__findModule(this.props.items, this.state.selectedItem);
        return (
            <ListGroup className="side-menu">
                {this.renderItems(this.props.items, true)}
            </ListGroup>)
    }


    renderItems(menu, isRoot) {
        let itemArr = [];
        if (!menu || menu.length <= 0) {
            return itemArr;
        }
        let children = [];

        for (let i = 0; i < menu.length; i++) {
            let item = menu[i];
            if (item.items) {
                children = this.renderItems(item.items, false);
            }
            let isActive = this.__isActiveModule(item[this.props.valueField]);
            itemArr.push(
                <div style={{marginLeft: isRoot ? 0 : 20}} key={item[this.props.textField]}>
                    <ListGroupItem
                        active={isActive}
                        onClick={this.__onChange.bind(undefined, item)}>
                        <FaIcon code={item.icon} fixed={true}/>&nbsp;&nbsp;
                        {item[this.props.textField]}
                    </ListGroupItem>
                    <Collapse in={isActive}>
                        <div>
                            {children}
                        </div>
                    </Collapse>
                </div>);
        }
        return itemArr
    }

    __onChange(item) {
        if (this.props.onChange) {
            let result = this.props.onChange(item);
            if (result !== false) {
                this.setState({selectedItem: item[this.props.valueField]});
            }
        }
        else {
            this.setState({selectedItem: item[this.props.valueField]});
        }
    }

    __findModule(items, value) {
        let arr = [];
        if (!items || items.length <= 0) {
            return arr;
        }
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item[this.props.valueField] === value) {
                arr.push(value);
                return arr;
            }
            if (item.items) {
                arr = this.__findModule(item.items, value);
                if (arr.length > 0) {
                    arr.push(item[this.props.valueField]);
                    return arr;
                }
            }
        }
        return arr;
    }

    __isActiveModule(value) {
        let index = Arrays.indexOf(this.__selectModule, value);
        return index !== -1;
    }

}