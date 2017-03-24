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
        value: "Turkish",
        disabled: true
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
            MultiSelect: ["en", "tr"],
            SingleSelect: "tr"
        };
    }

    render(): Object {
        return (
            <div>
                <SelectInput
                    label="Select Input Single"
                    name="SingleSelect"
                    items={langs}
                    textField="value"
                    valueField="key"
                    readOnly={true}
                    value={this.state.SingleSelect}
                    onChange={this.__handleChange}
                />
                <SelectInput
                    label="Select Input Multi"
                    name="MultiSelect"
                    multi={true}
                    items={langs}
                    disabledValues={["kr"]}
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
