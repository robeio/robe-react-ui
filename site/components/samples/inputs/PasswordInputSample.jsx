import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";


export default class PasswordInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            PasswordInputNormal: "",
            PasswordInputValidations: ""
        };
    }

    render(): Object {
        return (
            <div>
                <PasswordInput
                    label="PasswordInput"
                    name="PasswordInputNormal"
                    value={this.state.PasswordInputNormal}
                    onChange={this.__handleChange}
                />
                <PasswordInput
                    label="With Validations"
                    name="PasswordInputValidations"
                    value={this.state.PasswordInputValidations}
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
