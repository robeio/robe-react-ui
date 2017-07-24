import React from "react";
import PropTypes from "prop-types";
import { ShallowComponent } from "robe-react-commons";
import "./RadiusPanelGroup.css";

export default class RadiusPanelGroup extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        label: PropTypes.string,
        style: PropTypes.object,
        itemStyle: PropTypes.object,
        items: PropTypes.array,
        renderItem: PropTypes.func,
        onClose: PropTypes.func
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {

    };

    constructor(props: Object) {
        super(props);
    }

    render(): Object {
        return (
            <div className="rb-list-radius-group">
                {this.renderItems(this.props.children)}
            </div>
        );
    }

    renderItems(items) {
        if (!items) {
            return null;
        }
        let elements = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            elements[i] = (
                <div className="rb-list-radius-group-item">
                    {item}
                </div>
            );
        }
        return elements;
    }
}
