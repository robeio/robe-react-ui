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
        key: "kr",
        value: "Kurdish"
    }
];

export default class RadioInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            RadioInputSingle: "en",
            RadioInputGroup: "tr"
        };
    }

    render() {
        return (
            <div>
                <RadioInput
                    label="RadioInput Single"
                    items={langs[0]}
                    value={this.state.RadioInputSingle}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "RadioInputSingle")}
                />
                <RadioInput
                    label="RadioInput Group"
                    items={langs}
                    value={this.state.RadioInputGroup}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "RadioInputGroup")}
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
