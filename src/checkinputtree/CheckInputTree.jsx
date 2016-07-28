import React from "react";
import { ShallowComponent } from "robe-react-commons";
import CheckInput from "inputs/CheckInput";
import Arrays from "robe-react-commons/lib/utils/Arrays";

import "checkinputtree/CheckInputTree.css";

class CheckInputTree extends ShallowComponent {

    /**
     * PropTypes of the component.
     *
     * @static
     */
    static propTypes = {
        /**
         * Data for the tree to view
         */
        items: React.PropTypes.object.isRequired,
        /**
         * Text field of the data
         */
        textField: React.PropTypes.string.isRequired,
        /**
         * Value field of the data.
         */
        valueField: React.PropTypes.string.isRequired,
        /**
         * Children field of the data.
         */
        childrenField: React.PropTypes.string.isRequired,
        /**
         * Checked items array.
         */
        value: React.PropTypes.array,
        /**
         * Parent component of the tree item
         */
        parent: React.PropTypes.object

    };

    static defaultProps = {
        parent: undefined,
        textField: "text",
        valueField: "code",
        childrenField: "children"
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            value: this.props.value || [],
        };
    }

    render(): string {
        let itemData = this.props.items;
        let checked = undefined;
        let value = itemData[this.props.valueField];
        if (Arrays.indexOf(this.props.value, value) !== -1) {
            checked = [value];
        }

        let input =
            (<CheckInput
                items={[itemData]}
                value={checked}
                textField={this.props.textField}
                valueField={this.props.valueField}
                onChange={this._handleChange}
            />);
        let itemComp = (
            <li className="checkboxtree">
                {input}
                <ul>
                    {this.__renderChildren(itemData)}
                </ul>
            </li>
        );
        return itemComp;
    }
    _handleChange = (e: Object) => {
        if (this.props.parent) {
            if (this.props.parent._handleChange) {
                this.props.parent._handleChange(e);
            }
        } else {
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        }
        return true;
    }

    __renderChildren = (itemData: Map) => {
        let children = itemData[this.props.childrenField];
        if (children && children.length > 0) {
            let itemComps = [];
            for (let i = 0; i < children.length; i++) {
                itemComps.push(<CheckInputTree
                    value={this.props.value}
                    items={children[i]}
                    textField={this.props.textField}
                    valueField={this.props.valueField}
                    childrenField={this.props.childrenField}
                    parent={this}
                />);
            }
            return itemComps;
        }
        return undefined;
    }
    shouldComponentUpdate(): boolean {
        return true;
    }
}

module.exports = CheckInputTree;
