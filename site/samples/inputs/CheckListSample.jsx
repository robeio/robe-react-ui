import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import CheckList from "inputs/CheckList";

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

export default class CheckListSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            CheckListSingle: true,
            CheckListGroup: ["en","tr"]
        };
    }

    render() {
        return (
            <div>
                <CheckList
                    label="CheckList Group"
                    item={langs[0]}
                    value={this.state.CheckListSingle}
                    textField="value"
                    valueField="key"
                    style={{ height: "150px" }}
                    onChange={this.__handleChange.bind(undefined, "CheckListSingle")}
                />
                <CheckList
                    label="CheckList Group"
                    items={langs}
                    value={this.state.CheckListGroup}
                    textField="value"
                    valueField="key"
                    style={{ width: "150px" }}
                    onChange={this.__handleChange.bind(undefined, "CheckListGroup")}
                />
                <CheckList
                    label="CheckList Group"
                    items={langs}
                    value={this.state.CheckListGroup}
                    textField="value"
                    valueField="key"
                    horizontal={true}
                    onChange={this.__handleChange.bind(undefined, "CheckListGroup")}
                />
            </div>
        );
    }
    __handleChange = (code: any, e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[code] = value;
        this.setState(state);
        return true;
    };
}