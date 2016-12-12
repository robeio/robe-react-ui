import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import CheckInput from "robe-react-ui/lib/inputs/CheckInput";


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
        key: "kr",
        value: "Kurdish"
    }
];

export default class CheckInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            CheckInputSingle: false,
            CheckInputGroup: ["en", "tr"]
        };
    }

    render(): Object {
        return (
            <div>
                <CheckInput
                    label="CheckInput Single"
                    name="CheckInputSingle"
                    item={langs[0]}
                    value={this.state.CheckInputSingle}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
                />
                <CheckInput
                    label="CheckInput Group"
                    name="CheckInputGroup"
                    items={langs}
                    value={this.state.CheckInputGroup}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
                    validations={{
                        required: true
                    }}
                />
            </div>
        );
    }
    __handleChange(e: Object): boolean {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
        return true;
    }
}
