
import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import MoneyInput from "inputs/MoneyInput";
import InputValidations from "validation/InputValidations";


export default class MoneyInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <MoneyInput
                    label="MoneyInput"
                    value={this.state.MoneyInputNormal}
                    thousandsSeparator=","
                    decimalSeperator="."
                    onChange={this.__handleChange.bind(this, "MoneyInputNormal")}
                />
                <MoneyInput
                    label="With Default Value"
                    value="42.01"
                    unit="USD"
                />
                <MoneyInput
                    label="With Validations"
                    value={this.state.MoneyInputValidations}
                    onChange={this.__handleChange.bind(this, "MoneyInputValidations")}
                    validations={{
                        required: InputValidations.required,
                    }}
                />
            </div>
        );
    }
    __handleChange(code: any, e: Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        console.log(code);
        state[code] = value;
        this.setState(state);
    };
}
