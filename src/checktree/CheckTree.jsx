import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Arrays from "robe-react-commons/lib/utils/Arrays";
import Tree from "../tree/Tree";
import CheckInput from "../inputs/CheckInput";
import "./CheckTree.css";

/**
 * CheckTree is a recursive component which generates a tree of CheckInput's from the given item.
 *
 * @export
 * @class CheckTree
 * @extends {ShallowComponent}
 */
export default class CheckTree extends ShallowComponent {

    /**
     * PropTypes of the component.
     *
     * @static
     */
    static propTypes = {
        /**
         * Data for the tree to view
         */
        items: React.PropTypes.array.isRequired,
        /**
         * Text field of the data
         */
        textField: React.PropTypes.string,
        /**
         * Value field of the data.
         */
        valueField: React.PropTypes.string,
        /**
         * Children field of the data.
         */
        childrenField: React.PropTypes.string,
        /**
         * Checked items array.
         */
        value: React.PropTypes.array,
    };

    static defaultProps = {
        textField: "text",
        valueField: "code",
        childrenField: "children",
        value: []
    };

    __value = [];

    constructor(props: Object) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }


    render(): Object {
        return (
            <div>
                <Tree
                    items={this.props.items}
                    value={this.state.value}
                    onChange={this.__onChange}
                    itemRenderer={CheckTree.itemRenderer}
                />
            </div>
        );
    }

    /**
    * A default CheckInput renderer implementation for the Tree component.
    * @static
    * @param {Object} props properties to use at render
    * @returns {Object} a CheckInput
    * @memberOf CheckTree
    */
    static itemRenderer(props: Object): Object {
        let checked;
        let value = props.item[props.valueField];
        if (Arrays.indexOf(props.value, value) !== -1) {
            checked = [value];
        }
        return (
            <CheckInput
                items={[props.item]}
                value={checked}
                textField={props.textField}
                valueField={props.valueField}
                name={`${props.item[props.valueField]}`}
                formControl={false}
                onChange={props.onChange}
            />);
    }

    __onChange = (e: Object) => {
        let values = this.state.value;
        let value = e.target.parsedValue[0];

        if (value) {
            values.push(value);
            let selected = this.__getChildrenValues(value);
            values = values.concat(selected);
        } else {
            value = e.target.oldValue[0];
            Arrays.remove(values, value);
            let unselected = this.__getChildrenValues(value);
            for (let i = 0; i < unselected.length; i++) {
                Arrays.remove(values, unselected[i]);
            }
        }
        this.setState({
            value: values
        });
        this.__value = values;
        if (this.props.onChange) {
            this.props.onChange(values);
        }
    };

    __getChildrenValues(selectedValue: any): Array {
        let selectedChildren = [];
        this.__traverseItems(this.props.items, (item: any) => {
            let value = item[this.props.valueField];
            if (value === selectedValue) {
                this.__traverseItems(item[this.props.childrenField], (item2: any) => {
                    let value2 = item2[this.props.valueField];
                    selectedChildren.push(value2);
                });
            }
        });
        return selectedChildren;
    }

    /**
     * Returns an array of the unselected values from the given items tree.
     * @returns {Array}
     * @memberOf CheckTree
     */
    getUnselectedItems(): Array {
        let unselected = [];
        let items = this.props.items;
        let values = this.__value;
        this.__traverseItems(items, (item: any) => {
            let value = item[this.props.valueField];
            if (Arrays.indexOf(values, value) === -1) {
                unselected.push(value);
            }
        });
        return unselected;
    }
    /**
     * Returns an array of the selected values from the given items tree.
     * @returns {Array}
     * @memberOf CheckTree
     */
    getSelectedItems(): Array {
        return this.__value;
    }
    __traverseItems(items: Array, callback: Function) {
        if (items === undefined) {
            return;
        }
        for (let i = 0; i < items.length; i++) {
            callback(items[i]);
            let children = items[i][this.props.childrenField];
            if (children) {
                this.__traverseItems(children, callback);
            }
        }
    }


    shouldComponentUpdate(): boolean {
        return true;
    }
}
