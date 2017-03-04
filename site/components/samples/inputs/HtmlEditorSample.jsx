import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import HtmlEditor from "robe-react-ui/lib/inputs/htmleditor/HtmlEditor";


export default class HtmlEditorSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            HtmlEditorNormal: "Some Text",
            HtmlEditorAutoReize: ""
        };
    }

    render(): Object {
        return (
            <div>
                <HtmlEditor
                    label="HtmlEditor"
                    name="HtmlEditorNormal"
                    value={this.state.HtmlEditorNormal}
                    onChange={this.__handleChange}
                />
                <HtmlEditor
                    label="HtmlEditor with AutoReize and Height"
                    name="HtmlEditorAutoReize"
                    value={this.state.HtmlEditorAutoReize}
                    autoResize
                    height={150}
                    onChange={this.__handleChange}
                />
                <HtmlEditor
                    label="With Validations"
                    name="HtmlEditorValidations"
                    value={this.state.HtmlEditorValidations}
                    onChange={this.__handleChange}
                    validations={{
                        htmlRequired: true
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
