import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import StackLayout from "robe-react-ui/lib/layouts/StackLayout";


const items = [
    {
        key: "1",
        value: "Item 1"
    },
    {
        key: "2",
        value: "Item 2"
    },
    {
        key: "3",
        value: "Item 3"
    }
];

export default class StackLayoutSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            selected: ""
        };
    }

    render(): Object {
        return (
            <div>
                <StackLayout
                    items={items}
                    onItemClick={this.onClick}
                />
                <span>Selected Item: </span>
                <span>{this.state.selected}</span>
            </div>
        );
    }

    onClick(item: Object) {
        this.setState({
            selected: item.value
        });
    }

}
