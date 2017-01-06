import React from "react";
import { ShallowComponent } from "robe-react-commons";
import {findDOMNode} from "react-dom";
import { Generator } from "robe-react-commons";
import { ClassName, Style } from "../util/css";
import EventLayout from "./EventLayout";
import "./DragDropLayout.css";

export default class DragDropLayout extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        style: React.PropTypes.object,
        /**
         * if layout container clicked then triggered.
         */
        onClick: React.PropTypes.func,
        /**
         * when a draggable element is dropped in the layout container element.
         */
        onDrop: React.PropTypes.func,
        draggedStyle: React.PropTypes.object,
    };

    static defaultProps = {

    };
    __componentId;
    layoutDomRef;
    constructor(props) {
        super(props);
        this.__componentId = Generator.guid();
    }

    render() {
        return (
            <EventLayout
                ref={(el) => { this.layoutDomRef = findDOMNode(el)}}
                className="rb-drag-drop-box"
                id={this.__componentId}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.props.onClick}
                style={this.props.style}
            >
                {this.props.children}
            </EventLayout>
        );
    }
    onDragEnter(e) {
        ClassName.add(this.layoutDomRef, "rb-dragged");
        Style.add(this.layoutDomRef, this.props.draggedStyle);
    }

    onDragLeave(e) {
        if(e.target.id === this.__componentId) {
            ClassName.remove(this.layoutDomRef, "rb-dragged");
            Style.remove(this.layoutDomRef, this.props.draggedStyle);
            Style.add(this.layoutDomRef, this.props.style);
        }
    }

    onDrop(e) {
        ClassName.remove(this.layoutDomRef, "rb-dragged");
        Style.remove(this.layoutDomRef, this.props.draggedStyle);
        Style.add(this.layoutDomRef, this.props.style);
        if(e.dataTransfer) {
            this.props.onDrop({
                target: e.dataTransfer
            });
        }
    }
}