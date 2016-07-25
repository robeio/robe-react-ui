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
            CheckInputSingle: "en",
            CheckInputGroup: "en,tr"
        };
    }

    render() {
        return (
            <div>
                <CheckInput
                    label="CheckInput Single"
                    items={langs[0]}
                    value={this.state.CheckInputSingle}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "CheckInputSingle")}
                />
                <CheckInput
                    label="CheckInput Group"
                    items={langs}
                    value={this.state.CheckInputGroup}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "CheckInputGroup")}
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
