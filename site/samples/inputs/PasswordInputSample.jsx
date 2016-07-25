import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import PasswordInput from "inputs/PasswordInput";
import InputValidations from "validation/InputValidations";


export default class PasswordInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <PasswordInput
                    label="PasswordInput"
                    value={this.state.PasswordInputNormal}
                    handleChange={this.__handleChange.bind(undefined, "PasswordInputNormal")}
                />
                <PasswordInput
                    label="With Default Value"
                    value="Default Value"
                />
                <PasswordInput
                    label="With Validations"
                    value={this.state.PasswordInputValidations}
                    handleChange={this.__handleChange.bind(undefined, "PasswordInputValidations")}
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
