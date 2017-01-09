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
         * Reference Id is used to call onDrag and onDrop on reference element when dragging or dropping.
         * It is important when DragDropLayout include another layer to restrict drag drop events.
         */
        referenceId: React.PropTypes.string,
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
    isEntered = 0;
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
        if(e.target.id === this.__componentId || (this.props.referenceId && e.target.id === this.props.referenceId)) {
            this.isEntered += 1;
        }
        ClassName.add(this.layoutDomRef, "rb-dragged");
        Style.add(this.layoutDomRef, this.props.draggedStyle);
    }

    onDragLeave(e) {
        if(e.target.id === this.__componentId || (this.props.referenceId && e.target.id === this.props.referenceId)) {
            this.isEntered -= 1;
            if(this.isEntered <= 0) {
                ClassName.remove(this.layoutDomRef, "rb-dragged");
                Style.remove(this.layoutDomRef, this.props.draggedStyle);
                Style.add(this.layoutDomRef, this.props.style);
            }
        }
    }

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

    componentDidMount(){
        if(this.props.referenceId) {
            let domNode = document.getElementById(this.props.referenceId);
            domNode.onDrop = this.onDrop;
            domNode.onDragEnter = this.onDragEnter;
            domNode.onDragLeave = this.onDragLeave;
        }
    }
}