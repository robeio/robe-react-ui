import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import CheckBox from "inputs/CheckBox";
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
        key: "kurdish",
        value: "Kurdish"
    },
    {
        key: "af",
        value: "Afrikaans"
    },
    {
        key: "sq",
        value: "Albanian"
    },
    {
        key: "ar",
        value: "Arabic"
    },
    {
        key: "hy",
        value: "Armenian"
    },
    {
        key: "az",
        value: "Azerbaijani"
    },
    {
        key: "bn",
        value: "Bengali"
    }
];

export default class CheckBoxSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            CheckBoxSingle: "en",
            CheckBoxGroup: "en,tr"
        };
    }

    render() {
        return (
            <div>
                <CheckBox
                    label="CheckBox Single"
                    items={langs[0]}
                    value={this.state.CheckBoxSingle}
                    textField="value"
                    valueField="key"
                    style={{ height: "150px" }}
                    onChange={this.__handleChange.bind(undefined, "CheckBoxSingle")}
                />
                <CheckBox
                    label="CheckInput Group"
                    items={langs}
                    value={this.state.CheckBoxGroup}
                    textField="value"
                    valueField="key"
                    style={{ height: "150px" }}
                    onChange={this.__handleChange.bind(undefined, "CheckBoxGroup")}
                />
                <CheckBox
                    label="CheckInput Group"
                    items={langs}
                    value={this.state.CheckBoxGroup}
                    textField="value"
                    valueField="key"
                    direction={true}
                    onChange={this.__handleChange.bind(undefined, "CheckBoxGroup")}
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