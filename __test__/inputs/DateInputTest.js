import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DateInput from "inputs/DateInput";


export default class DateInputSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {

        };
    }

    render(): Object {
        return (
            <DateInput
                label="DateInput"
                format={this.props.format}
                value={this.state.value}
                onChange={this.__onChange}
            />
        );
    }
    
    __onChange = (e: Object) => {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        this.setState({ value: value });
    };
    
}
