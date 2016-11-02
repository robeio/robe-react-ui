import React from "react";
import {
    Well
} from "react-bootstrap";
import {
    ShallowComponent
} from "robe-react-commons";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";

export default class ValidationSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            example1: ""
        };
        this.__handleChangeEx1 = this.__handleChange.bind(undefined, "example1");
    }

    render(): Object {
        return (
            <div>
                <span>
                    You can use <code>validation</code> property to give your validation functions.
                    All components which extends <code>ValidationComponent</code> will automatically take and execute on each run.
                    Either our pre-defined validations at <code>InputValidations</code> or your brand new validation functions can be used.

                </span>
                <TextInput
                    label="Example 1"
                    value={this.state.example1}
                    onChange={this.__handleChangeEx1}
                    validations={{
                        required: InputValidations.required,
                        minLength: InputValidations.minLength,
                        minLength_args: [3]
                    }}
                />
                <Well>
                    As you can see from the source code validation property takes a map of validations.
                    It also supports parametric validation functions with custom message templates.
                    For ex.<code>minLength</code> is a pre-defined function.
                    We used <code>minLength_args</code> to passing desired parameters which is the minimum length at this case.
                    Also you can define custom message templates with <code>minLength_message</code>
                </Well>
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

