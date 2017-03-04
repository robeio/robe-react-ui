import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DateInput from "robe-react-ui/lib/inputs/DateInput";


export default class DateInputSample extends ShallowComponent {
    constructor(props:Object) {
        super(props);
        this.state = {
            DateInputNormal: new Date().getTime(),
            DateInputValidations: new Date()
        }
        ;
    }

    render():Object {
        return (
            <div>
                <DateInput
                    label="DateInput"
                    name="DateInputNormal"
                    value={this.state.DateInputNormal}
                    onChange={this.__handleChange}
                />
                <DateInput
                    label="With Validations"
                    name="DateInputValidations"
                    value={this.state.DateInputValidations}
                    onChange={this.__handleChange}
                    validations={{
                        required: true
                    }}
                />
                <DateInput
                    label="DateInput With Custom Localization"
                    name="DateInputNormal"
                    locale="tr"
                    format="YYYY MM DD"
                    value={this.state.DateInputNormal}
                    onChange={this.__handleChange}
                />
            </div>
        );
    }

    __handleChange(e:Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    }

}

