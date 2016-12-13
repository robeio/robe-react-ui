import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DecimalInput from "robe-react-ui/lib/inputs/DecimalInput";



export default class DecimalInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            DecimalInputNormal: 42.01
        };
    }

    render(): Object {
        return (
            <div>
                <DecimalInput
                    label="DecimalInput"
                    name="DecimalInputNormal"
                    value={this.state.DecimalInputNormal}
                    decimalSeparator="."
                    onChange={this.__handleChange}
                />
                <DecimalInput
                    label="With Validations"
                    name="DecimalInputValidations"
                    value={this.state.DecimalInputValidations}
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
