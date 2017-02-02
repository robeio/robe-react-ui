import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TimeInput from "robe-react-ui/lib/inputs/TimeInput";

export default class TimeInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            TimeInputNormal: "08:04",
            TimeInputValidations: "",
            TimeInputWithOwnOptions: "09:00:05"
        };
    }


    render(): Object {
        return (
            <div>
                <TimeInput
                    label="TimeInput"
                    name="TimeInputNormal"
                    format="HH:mm"
                    disabledHours={[1,10,11]}
                    disabledMinutes={[2,5,11]}
                    placeholder="Please select time"
                    value={this.state.TimeInputNormal}
                    onChange={this.__handleChange}
                    />
                <TimeInput
                    label="With Validations"
                    name="TimeInputValidations"
                    value={this.state.TimeInputValidations}
                    onChange={this.__handleChange}
                    validations={{
                        required: true
                    }}
                />
                <TimeInput
                    label="With Own Options"
                    name="TimeInputWithOwnOptions"
                    value={this.state.TimeInputWithOwnOptions}
                    format="HH:mm:ss"
                    createOwnOptions={{hours: [0,3,6,9,12,15,18,21], minutes: [0, 30], seconds:[5,10,15,20,25,30]}}
                    onChange={this.__handleChange}
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

