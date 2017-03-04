import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import RadioInput from "robe-react-ui/lib/inputs/RadioInput";

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
    constructor(props: Object) {
        super(props);
        this.state = {
            RadioInputSingle: "en",
            RadioInputGroup: "tr",
            RadioInputGroupInline: "tr"
        };
    }

    render(): Object {
        return (
            <div>
                <RadioInput
                    label="RadioInput Single"
                    name="RadioInputSingle"
                    items={langs[0]}
                    value={this.state.RadioInputSingle}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
                />
                <RadioInput
                    label="RadioInput Group"
                    name="RadioInputGroup"
                    items={langs}
                    value={this.state.RadioInputGroup}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
                />
                <RadioInput
                    label="RadioInput Group Inline"
                    name="RadioInputGroupInline"
                    items={langs}
                    inline
                    value={this.state.RadioInputGroupInline}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
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
