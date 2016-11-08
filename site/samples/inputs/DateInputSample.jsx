import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DateInput from "robe-react-ui/lib/inputs/DateInput";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";
import moment from "moment";


export default class DateInputSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            DateInputNormal: new Date().getTime()
        };
    }

    render() {
        return (
            <div>
                <DateInput
                    label="DateInput"
                    value={this.state.DateInputNormal}
                    onChange={this.__handleChange.bind(undefined, "DateInputNormal")}
                />
                <DateInput
                    label="With Validations"
                    value={this.state.DateInputValidations}
                    onChange={this.__handleChange.bind(undefined, "DateInputValidations")}
                    validations={{
                        required: true
                    }}
                />
                <DateInput
                    label="DateInput With Custom Localization"
                    locale="tr"
                    value={this.state.DateInputNormal}
                    onChange={this.__handleChange.bind(undefined, "DateInputNormal")}
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
