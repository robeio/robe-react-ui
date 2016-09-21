
import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import MoneyInput from "robe-react-ui/lib/inputs/MoneyInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";


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
                    onChange={this.__handleChange.bind(this, "MoneyInputNormal") }
                />
                <MoneyInput
                    label="With Validations"
                    value={this.state.MoneyInputValidations}
                    onChange={this.__handleChange.bind(this, "MoneyInputValidations") }
                    unit="USD"
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
        state[code] = value;
        this.setState(state);
    }
}
