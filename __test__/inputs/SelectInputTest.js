import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TestUtils from "../TestUtils";
import SelectInput from "inputs/SelectInput";
import InputValidations from "validation/InputValidations";

const langs = [
    {
        key: "en",
        value: "English"
    },
    {
        key: "tr",
        value: "Turkish"
    },
    {
        key: "kr",
        value: "Kurdish"
    }
];

export default class SelectInputTest extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SelectInput
                {...this.props}
                label="Select Input Single"
                items={langs}
                textField="value"
                valueField="key"
                value={this.state.value}
                onChange={this.__handleChange}
            />
        );
    }

    __handleChange = (e: Object) => {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        this.setState({ value: value });
        return true;
    };

}
