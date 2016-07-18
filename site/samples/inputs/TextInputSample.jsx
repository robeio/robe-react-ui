import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextInput from "inputs/TextInput";
import InputValidations from "validation/InputValidations";


export default class TextInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log("render");
        return (
            <div>
                <TextInput
                    label="TextInput"
                    value={this.state.TextInputNormal}
                    onChange={this.__handleChange.bind(undefined, "TextInputNormal") }
                    />
                <TextInput
                    label="With Default Value"
                    value="Default Value"
                    />
                <TextInput
                    label="With Validations"
                    value={this.state.TextFieldValidations}
                    onChange={this.__handleChange.bind(undefined, "TextFieldValidations") }
                    validations={{
                        required: InputValidations.required,
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
