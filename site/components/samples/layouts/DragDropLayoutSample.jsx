import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DragDropLayout from "robe-react-ui/lib/layouts/DragDropLayout";

export default class DragDropLayoutSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
    }

    render(): Object {
        return (
            <DragDropLayout
                style = {{
                        backgroundColor: "#f2f2f2"
                    }}
                onClick={this.onClick}
                onDrop={this.onDrop}
                draggedStyle={{
                        backgroundColor: "#aaa"
                    }}
            >
                Here is dropped content
            </DragDropLayout>
        );
    }

    onClick(e) {
        alert("clicked");
    }

    onDrop(e) {
        alert("dropped");
    }
}
