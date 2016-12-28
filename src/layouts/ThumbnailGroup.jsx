import React from "react";
import { Clearfix } from "react-bootstrap";
import Icon from "../faicon/index";
import ThumbnailItem from "./ThumbnailItem";
import { ShallowComponent } from "robe-react-commons";
import "./ThumbnailGroup.css";

export default class ThumbnailLayout extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        style: React.PropTypes.object
    };

    constructor(props: Object) {
        super(props);
    }

    render(): Object {
        return (
            <div>
                <div className="rb-thumbnail-box" style={this.props.style} >
                    {this.renderItems()}
                </div>
                <Clearfix />
            </div>
        );
    }

    renderItems(){
        return React.Children.map(this.props.children, (child) => {
            if(child.type === ThumbnailItem) {
                return child;
            }
        });
    }
}
