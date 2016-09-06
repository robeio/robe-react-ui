import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Arrays from "robe-react-commons/lib/utils/Arrays";
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
        items: React.PropTypes.object.isRequired,
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
        /**
         * Parent component of the tree item
         */
        parent: React.PropTypes.object

    };

    static defaultProps = {
        parent: undefined,
        textField: "text",
        valueField: "code",
        childrenField: "children",
        value: []
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            value: this.props.value || []
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
                onChange={this.__onChange}
                ref="innerInput"
            />);
        let itemComp = (
            <li className="checkboxtree">
                {input}
                <ul>
                    {this.__renderChildren(itemData) }
                </ul>
            </li>
        );
        return itemComp;
    }
    __onChange = (e: Object): boolean => {
        if (this.props.parent) {
            this.props.parent.__onChange(e);
        } else {
            this.props.onChange(e);
        }
        return true;
    }

    __renderChildren = (itemData: Map) => {
        let children = itemData[this.props.childrenField];
        if (children && children.length > 0) {
            let itemComps = [];
            for (let i = 0; i < children.length; i++) {
                itemComps.push(<CheckTree
                    key={children[i][this.props.valueField]}
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
