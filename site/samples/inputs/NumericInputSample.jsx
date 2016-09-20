import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import NumericInput from "inputs/NumericInput";
import InputValidations from "validation/InputValidations";


export default class NumericInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            NumericInputNormal: "42",
            NumericInputValidations: ""
        };
    }

    render() {
        return (
            <div>
                <NumericInput
                    label="NumericInput"
                    value={this.state.NumericInputNormal}
                    thousandsSeparator=","
                    decimalSeperator="."
                    onChange={this.__handleChange.bind(undefined, "NumericInputNormal") }
                />
                <NumericInput
                    label="With Validations"
                    value={this.state.NumericInputValidations}
                    onChange={this.__handleChange.bind(undefined, "NumericInputValidations") }
                    validations={{
                        required: InputValidations.required
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
