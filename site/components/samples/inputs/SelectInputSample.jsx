import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SelectInput from "robe-react-ui/lib/inputs/SelectInput";

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
export default class SelectInputSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            MultiSelect: ["en", "tr"]
        };
    }

    render(): Object {
        return (
            <div>
                <SelectInput
                    label="Select Input Single"
                    name="Select"
                    items={langs}
                    textField="value"
                    valueField="key"
                    value={this.state.Select}
                    onChange={this.__handleChange}
                />
                <SelectInput
                    label="Select Input Multi"
                    name="MultiSelect"
                    multi={true}
                    items={langs}
                    value={this.state.MultiSelect}
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

    __handleChange(e: Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    }
}
