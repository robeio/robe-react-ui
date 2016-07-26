import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SelectInput from "inputs/SelectInput";
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
export default class SelectInputSample extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {
            MultiSelect: ["en","tr"]
        };
    }

    render() {
        return (
            <div>
                <SelectInput
                    label="Select Input Single"
                    items={langs}
                    textField="value"
                    valueField="key"
                    value={this.state.Select}
                    onChange={this.__handleChange.bind(undefined, "Select")}
                />
                <SelectInput
                    label="Select Input Multi"
                    multi={true}
                    items={langs}
                    value={this.state.MultiSelect}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "MultiSelect")}
                    validations={{
                        required: InputValidations.required
                    }}
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
