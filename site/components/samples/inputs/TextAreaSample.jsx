import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextArea from "robe-react-ui/lib/inputs/TextArea";


export default class TextAreaSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            TextAreaNormal: "Some Text",
            TextAreaAutoResize: ""
        };
    }

    render(): Object {
        return (
            <div>
                <TextArea
                    label="TextArea"
                    name="TextAreaNormal"
                    value={this.state.TextAreaNormal}
                    onChange={this.__handleChange}
                />
                <TextArea
                    label="With Validations"
                    name="TextAreaValidations"
                    value={this.state.TextAreaValidations}
                    onChange={this.__handleChange}
                    validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
                    }}
                />
                <TextArea
                    label="TextArea With AutoResize And MinHeight"
                    name="TextAreaAutoResize"
                    autoResize
                    style={{ minHeight: 100 }}
                    value={this.state.TextAreaAutoResize}
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
