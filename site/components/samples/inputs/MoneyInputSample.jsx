
import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import MoneyInput from "robe-react-ui/lib/inputs/MoneyInput";


export default class MoneyInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            MoneyInputNormal: "123,456,789.12",
            MoneyInputValidations: ""
        };
    }

    render(): Object {
        return (
            <div>
                <MoneyInput
                    label="MoneyInput"
                    name="MoneyInputNormal"
                    value={this.state.MoneyInputNormal}
                    thousandSeparator=","
                    decimalSeparator="."
                    onChange={this.__handleChange}
                />
                <MoneyInput
                    label="With Validations"
                    name="MoneyInputValidations"
                    value={this.state.MoneyInputValidations}
                    onChange={this.__handleChange}
                    unit="USD"
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
