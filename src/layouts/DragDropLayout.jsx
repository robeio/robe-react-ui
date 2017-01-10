import React from "react";
import { ShallowComponent } from "robe-react-commons";
import {findDOMNode} from "react-dom";
import { Generator } from "robe-react-commons";
import { ClassName, Style } from "../util/css";
import EventLayout from "./EventLayout";
import "./DragDropLayout.css";

/**
 * <DragDropLayout> is a layout component which provides drag and drop files on events on layer.
 * Also provide when clicked layer.
 */
export default class DragDropLayout extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Used to change current styles of DragDropLayout.
         */
        style: React.PropTypes.object,
        /**
         * if layout container clicked then triggered.
         */
        onClick: React.PropTypes.func,
        /**
         * when a draggable element is dropped in the layout container element.
         */
        onDrop: React.PropTypes.func,
        /**
         * Used to change the styles of the DragDropLayout  when anything dragged  on.
         */
        draggedStyle: React.PropTypes.object,
    };

    __componentId;
    layoutDomRef;
    constructor(props) {
        super(props);
        this.__componentId = Generator.guid();
    }

    render() {
        this.isEntered = 0;
        return (
            <EventLayout
                ref={(el) => { this.layoutDomRef = findDOMNode(el)}}
                className="rb-drag-drop-box vertical-center"
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
    /**
     * triggered when a draggable element drag inside of the Layout.
     */
    onDragEnter(e) {
        this.isEntered += 1;
        ClassName.add(this.layoutDomRef, "rb-dragged");
        Style.add(this.layoutDomRef, this.props.draggedStyle);
    }
    /**
     * triggered when a draggable element drag out of the Layout.
     */
    onDragLeave(e) {
        this.isEntered -= 1;
        if(this.isEntered <= 0) {
            ClassName.remove(this.layoutDomRef, "rb-dragged");
            Style.remove(this.layoutDomRef, this.props.draggedStyle);
            Style.add(this.layoutDomRef, this.props.style);
        }
    }
    /**
     * triggered when a draggable element is dropped in the layout.
     */
    onDrop(e) {
        this.isEntered = 0;
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