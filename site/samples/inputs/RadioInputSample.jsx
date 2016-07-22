import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import RadioInput from "inputs/RadioInput";
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

export default class RadioInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <RadioInput
                    label="CheckInput Multi"
                    items={langs}
                    value="en"
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "RadioInput")}
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
