import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DateInput from "inputs/DateInput";
import InputValidations from "validation/InputValidations";
import moment from "moment";


export default class DateInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <DateInput
                    label="DateInput"
                    value={this.state.DateInputNormal}
                    onChange={this.__handleChange.bind(undefined, "DateInputNormal") }
                    />
                <DateInput
                    label="With Default Value"
                    value= {new Date().getTime()}
                    />
                <DateInput
                    label="With Validations"
                    value={this.state.DateInputValidations}
                    onChange={this.__handleChange.bind(undefined, "DateInputValidations") }
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
