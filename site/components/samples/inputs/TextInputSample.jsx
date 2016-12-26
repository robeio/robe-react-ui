import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import TextInput from "robe-react-ui/lib/inputs/TextInput";


export default class TextInputSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            TextInputNormal: "Some Text"
        };
    }

    render(): Object {
        return (
            <div>
                <TextInput
                    label="TextInput"
                    name="TextInputNormal"
                    value={this.state.TextInputNormal}
                    onChange={this.__handleChange}
                />
                <TextInput
                    label="With Validations"
                    name="TextInputValidations"
                    value={this.state.TextInputValidations}
                    onChange={this.__handleChange}
                    validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
                    }}
                />
                <TextInput
                    label="With Validations Overlay"
                    name="TextInputValidationsOverlay"
                    validationDisplay="overlay"
                    value={this.state.TextInputValidationsOverlay}
                    onChange={this.__handleChange}
                    validations={{
                        required: true,
                        minLength: {
                            args: [3]
                        }
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
