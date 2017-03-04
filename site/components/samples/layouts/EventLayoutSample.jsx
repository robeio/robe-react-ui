import React from "react";
import { Table } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import EventLayout from "robe-react-ui/lib/layouts/EventLayout";
import Toast from "robe-react-ui/lib/toast/Toast";
export default class EventLayoutSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
    }

    element;
    render(): Object {
        return (
                <EventLayout
                    onClick={this.onClick}
                    onDrop={this.onDrop}
                    onDragLeave={this.onDragLeave}
                    onDragOver={this.onDragOver}
                    onDragEnter={this.onDragEnter}
                    onDragStart={this.onDragStart}
                >

                    <h2>You can use this layout as event layout...</h2>
                    <Table responsive striped bordered condensed>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Component</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>onClick: </td><td>if layout container clicked then triggered.</td></tr>
                        <tr><td>onDrop:</td><td>when a draggable element is dropped in the layout container element.</td></tr>
                        <tr><td>onDragLeave</td><td>The onDragLeave event occurs when a draggable element or text selection leaves a valid drop target.</td></tr>
                        <tr><td>onDragOver</td><td>when an element is being dragged over the layout container element.</td></tr>
                        <tr><td>onDragEnter</td><td>when a draggable element enters the layout container element.</td></tr>
                        <tr><td>onDragStart</td><td>when the user starts to drag the layout container element.</td></tr>
                        </tbody>
                    </Table>
                    <div ref={(element) => {this.element = element }}>

                    </div>
                </EventLayout>
        );
    }


    onClick(e: Object) {
        Toast.info("element clicked.");
    }
    onDrop(e: Object) {
        Toast.info("element dropped.");
    }
    onDragLeave(item: Object) {
        Toast.info("element dragged leaved.");
    }
    onDragOver(item: Object) {
        // Toast.info("element dragged overed.");
    }
    onDragEnter(item: Object) {
       Toast.info("element dragged entered.");
    }
    onDragStart(item: Object) {
        Toast.info("element dragged to start to element.");
    }
}
