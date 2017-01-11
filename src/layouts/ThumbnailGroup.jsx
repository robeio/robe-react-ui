import React from "react";
import {Clearfix} from "react-bootstrap";
import ThumbnailItem from "./ThumbnailItem";
import {ShallowComponent} from "robe-react-commons";
import "./ThumbnailGroup.css";

export default class ThumbnailGroup extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes:Map = {
        id: React.PropTypes.string,
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        placeholder: React.PropTypes.string
    };

    constructor(props:Object) {
        super(props);
    }

    render():Object {
        return (
            <div {...this.props} >
                <div placeholder={this.props.placeholder} id={this.props.id ? `${this.props.id}_box` : null}
                     className="rb-thumbnail-box" style={this.props.style}>
                    {this.renderItems()}
                </div>
                <Clearfix />
            </div>
        );
    }

    renderItems() {
        return React.Children.map(this.props.children, (child) => {
            if (child.type === ThumbnailItem) {
                return child;
            }
        });
    }
}
