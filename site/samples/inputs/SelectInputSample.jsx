import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SelectInput from "robe-react-ui/lib/inputs/SelectInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";

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

    constructor(props) {
        super(props);
        this.state = {
            MultiSelect: ["en", "tr"]
        };

        this.__handleChangeSelect = this.__handleChange.bind(this, "Select");
        this.__handleChangeMulti = this.__handleChange.bind(this, "MultiSelect");
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
                    onChange={this.___handleChangeSelect}
                />
                <SelectInput
                    label="Select Input Multi"
                    multi={true}
                    items={langs}
                    value={this.state.MultiSelect}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChangeMulti}
                    validations={{
                        required: true
                    }}
                />
            </div>
        );
    }

    __handleChange = (name: any, e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[name] = value;
        this.setState(state);
    };
}
