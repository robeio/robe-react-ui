import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SelectInput from "inputs/SelectInput";
import InputValidations from "validation/InputValidations";

const data = [
    {
        key: "MALE",
        value: "Male"
    },
    {
        key: "FEMALE",
        value: "Female"
    }
];

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
        value: "Kurd"
    }
];
export default class SelectInputSample extends ShallowComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SelectInput
                    label="Select Input Single"
                    items={data}
                    textField="value"
                    valueField="key"
                />
                <SelectInput
                    label="Select Input Multi"
                    multi={true}
                    items={langs}
                    value="MALE"
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange.bind(undefined, "TextFieldValidations")}
                    validations={{
                        required: InputValidations.required
                    }}
                />
            </div>
        );
    }
    __handleChange = (code: any, e: Object) => {
        console.log(code);
        console.log(e);
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
    };
}
