import React from "react";
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
