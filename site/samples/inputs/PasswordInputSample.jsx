import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";


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
                    onChange={this.__handleChange.bind(undefined, "PasswordInputNormal")}
                />
                <PasswordInput
                    label="With Validations"
                    value={this.state.PasswordInputValidations}
                    onChange={this.__handleChange.bind(undefined, "PasswordInputValidations")}
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
