import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import CheckInput from "inputs/CheckInput";
import InputValidations from "validation/InputValidations";

const langs = [
    {
        key: "en",
        value: "English"
    },
    {
        key: "tr",
        value: "Turkish"
    },
    {
        key: "kurdish",
        value: "Kurdish"
    }
];

export default class CheckInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <CheckInput
                    label="CheckInput Multi"
                    items={langs}
                    value="en,tr"
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "CheckInput")}
                />
            </div>
        );
    }
    __handleChange = (code: any, e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
    };
}
