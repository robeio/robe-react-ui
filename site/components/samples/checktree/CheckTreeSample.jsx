import React from "react";
import { ShallowComponent, Arrays } from "robe-react-commons";
import CheckTree from "robe-react-ui/lib/checktree/CheckTree";
import CheckInput from "robe-react-ui/lib/inputs/CheckInput";
export default class CheckTreeSample extends ShallowComponent {

    static data = [
        {
            text: "Item 1",
            code: 1,
            children: [
                {
                    text: "Item 1.1",
                    code: 11
                },
                {
                    text: "Item 1.2",
                    code: 12
                }
            ]
        },
        {
            text: "Item 2",
            code: 2,
            children: [
                {
                    text: "Item 2.1",
                    code: 21,
                    children: [
                        {
                            text: "Item 2.1.1",
                            code: 211
                        },
                        {
                            text: "Item 2.1.2",
                            code: 212
                        }
                    ]
                }
            ]
        }
    ];


    constructor(props: Object) {
        super(props);
        this.state = {
            value: []
        };
    }

    render(): Object {
        return (
            <div>
                <CheckTree
                    items={CheckTreeSample.data}
                    value={this.state.value}
                    onChange={this.handleChange}
                    ref="checkTree"
                />
            </div>
        );
    }

    handleChange = (e: Object) => {
        console.log("unselected", this.refs.checkTree.getUnselectedItems());
        console.log("selected", this.refs.checkTree.getSelectedItems());
    };

    shouldComponentUpdate(): boolean {
        return true;
    }
}
