import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import NumericInput from "robe-react-ui/lib/inputs/NumericInput";


export default class NumericInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            NumericInputNormal: "42",
            NumericInputValidations: ""
        };
    }

    render(): Object {
        return (
            <div>
                <NumericInput
                    label="NumericInput"
                    name="NumericInputNormal"
                    value={this.state.NumericInputNormal}
                    thousandSeparator=","
                    decimalSeparator="."
                    onChange={this.__handleChange}
                />
                <NumericInput
                    label="With Validations"
                    name="NumericInputValidations"
                    value={this.state.NumericInputValidations}
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
