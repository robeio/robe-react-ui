import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextArea from "robe-react-ui/lib/inputs/TextArea";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";


export default class TextAreaSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            TextAreaNormal: "Some Text",
            TextAreaAutoResize: ""
        };
    }

    render() {
        return (
            <div>
                <TextArea
                    label="TextArea"
                    value={this.state.TextAreaNormal}
                    onChange={this.__handleChange.bind(undefined, "TextAreaNormal")}
                />
                <TextArea
                    label="With Validations"
                    value={this.state.TextAreaValidations}
                    onChange={this.__handleChange.bind(undefined, "TextAreaValidations")}
                    validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
                    }}
                />
                <TextArea
                    label="TextArea With AutoResize And MinHeight"
                    autoResize
                    style={{ minHeight: 100 }}
                    value={this.state.TextAreaAutoResize}
                    onChange={this.__handleChange.bind(undefined, "TextAreaAutoResize")}
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
