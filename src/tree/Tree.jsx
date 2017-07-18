import React from "react";
import PropTypes from "prop-types";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TreeItem from "./TreeItem";
import "./Tree.css";

/**
 * Tree is a recursive component which generates a tree of Component's from the given item and template.
 *
 * @export
 * @class Tree
 * @extends {ShallowComponent}
 */
export default class Tree extends ShallowComponent {

    /**
     * PropTypes of the component.
     *
     * @static
     */
    static propTypes = {
        /**
         * Data for the tree to view
         */
        items: PropTypes.array.isRequired,
        /**
         * Text field of the data
         */
        textField: PropTypes.string,
        /**
         * Value field of the data.
         */
        valueField: PropTypes.string,
        /**
         * Children field of the data.
         */
        childrenField: PropTypes.string,
        /**
         * Checked items array.
         */
        value: PropTypes.array,
        /**
         * Parent component of the tree item
         */
        parent: PropTypes.object

    };

    static defaultProps = {
        parent: undefined,
        textField: "text",
        valueField: "code",
        childrenField: "children",
        value: [],
        root: true
    };

    render():string {
        if (this.props.items) {
            return (
                <ul className="tree"
                    style={{paddingLeft:this.props.root?0:35}}>
                    {this.__renderChildren(this.props.items)}
                </ul>
            );
        }
        return <span />;
    }


    __renderChildren(items:Array):Array {
        let children = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            children.push(<TreeItem
                key={item[this.props.valueField]}
                value={this.props.value}
                item={item}
                textField={this.props.textField}
                valueField={this.props.valueField}
                childrenField={this.props.childrenField}
                itemRenderer={this.props.itemRenderer}
                onChange={this.onChange}
            />);
        }
        return children;
    }

    onChange(e:Object):boolean {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        return true;
    }

    shouldComponentUpdate():boolean {
        return true;
    }
}
