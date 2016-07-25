import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import HtmlEditor from "inputs/htmleditor/HtmlEditor";
import InputValidations from "validation/InputValidations";


export default class HtmlEditorSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <HtmlEditor
                    label="HtmlEditor"
                    value={this.state.HtmlEditorNormal}
                    handleChange={this.__handleChange.bind(undefined, "HtmlEditorNormal")}
                />
                <HtmlEditor
                    label="With Default Value"
                    value="Default Value"
                />
                <HtmlEditor
                    label="With Validations"
                    value={this.state.HtmlEditorValidations}
                    handleChange={this.__handleChange.bind(undefined, "HtmlEditorValidations")}
                    validations={{
                        required: InputValidations.htmlRequired,
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
